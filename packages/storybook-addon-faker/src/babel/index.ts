import type * as BabelCoreNamespace from "@babel/core";
import type * as BabelTypesNamespace from "@babel/types";
import type { PluginObj } from "@babel/core";

import pkg from "../../package.json";

const PackageName = pkg.name;
const PluginName = `${PackageName}/babel`;
const SeedStory = "seedStory";

export type Babel = typeof BabelCoreNamespace;
export type BabelTypes = typeof BabelTypesNamespace;

enum OptionKeys {
  Faker = "faker",
  Seed = "seed",
}

export interface Options {
  [OptionKeys.Faker]: string;
  [OptionKeys.Seed]: number;
}

export default function plugin({ types: t }: Babel): PluginObj {
  const seedStoryIdentifier = t.identifier(SeedStory);
  const seedStoryImportSpecifier = t.importSpecifier(
    seedStoryIdentifier,
    seedStoryIdentifier
  );

  const fakerIdentifier = t.identifier(OptionKeys.Faker);
  const fakerImportSpecifier = t.importSpecifier(
    fakerIdentifier,
    fakerIdentifier
  );

  const FakerImportSet = new Set();

  const SeedStoryImportSet = new Set();

  const options: Options = {
    [OptionKeys.Faker]: "@faker-js/faker",
    [OptionKeys.Seed]: 999,
  };

  return {
    name: PluginName,
    manipulateOptions(opts) {
      const pluginOptions = opts.plugins.find(
        (plugin: { key: string }) => plugin.key === PluginName
      ).options as any;

      const fakerOption = pluginOptions[OptionKeys.Faker];

      if (typeof fakerOption === "string") {
        options[OptionKeys.Faker] = fakerOption;
      }

      const seedOption = pluginOptions[OptionKeys.Seed];

      if (typeof seedOption === "number") {
        options[OptionKeys.Seed] = seedOption;
      }
    },
    visitor: {
      Program: {
        exit(path, state) {
          if (!state.filename) return;

          // file does not import faker, so add an import declaration with faker
          if (!FakerImportSet.has(state.filename)) {
            const fakerImportSpecifierDeclaration = t.importDeclaration(
              [fakerImportSpecifier],
              t.stringLiteral(options.faker)
            );
            path.unshiftContainer("body", fakerImportSpecifierDeclaration);
          }

          // file does not import our package, so add an import declaration with seed story
          if (!SeedStoryImportSet.has(state.filename)) {
            const importDeclaration = t.importDeclaration(
              [seedStoryImportSpecifier],
              t.stringLiteral(PackageName)
            );

            path.unshiftContainer("body", importDeclaration);
          }
        },
      },
      ExportNamedDeclaration(path, state) {
        const exportedDeclaration = path.node.declaration;

        if (
          exportedDeclaration &&
          exportedDeclaration.type === "VariableDeclaration"
        ) {
          if (exportedDeclaration.declarations.length !== 1) {
            return console.error(
              "cannot handle export with multiple declarations"
            );
          }
          const storyObjectExpression =
            exportedDeclaration.declarations[0].init;
          if (
            storyObjectExpression &&
            storyObjectExpression.type === "ObjectExpression"
          ) {
            // wrap exported story object in seedStory
            const seedStoryArgument = t.arrowFunctionExpression(
              [],
              storyObjectExpression
            );

            const seedStoryOptions = t.objectExpression([
              t.objectProperty(
                t.stringLiteral(OptionKeys.Faker),
                fakerIdentifier
              ),
              t.objectProperty(
                t.stringLiteral(OptionKeys.Seed),
                t.numericLiteral(options.seed)
              ),
            ]);

            const callExpression = t.callExpression(seedStoryIdentifier, [
              seedStoryArgument,
              seedStoryOptions,
            ]);
            exportedDeclaration.declarations[0].init = callExpression;
          }
        }
      },
      ImportDeclaration: {
        enter(path, state) {
          const importSource = path.node.source.value;
          const filename = state.filename || "";

          function isMemberImported(target: string) {
            return path.node.specifiers
              .map((spec) => spec.local.name)
              .includes(target);
          }

          // file imports from `storybook-addon-faker`
          if (importSource === PackageName) {
            SeedStoryImportSet.add(filename);
            // add seedStory if missing from declaration
            if (!isMemberImported(SeedStory)) {
              path.node.specifiers.push(seedStoryImportSpecifier);
            }
          }

          const isCurrentDeclarationPluginFaker =
            importSource === options.faker;
          const isFakerSpecifiedOnImport = isMemberImported(
            fakerIdentifier.name
          );

          // if faker is imported or there is an imort declaration for our plugin faker source, no new declaration is needed
          if (isCurrentDeclarationPluginFaker || isFakerSpecifiedOnImport) {
            FakerImportSet.add(filename);
          }

          // file imports from the faker source specified in options.faker
          if (isCurrentDeclarationPluginFaker) {
            // faker is not specified in the import declaration
            if (!isFakerSpecifiedOnImport) {
              path.node.specifiers.push(fakerImportSpecifier);
            }
          }
        },
      },
    },
  };
}
