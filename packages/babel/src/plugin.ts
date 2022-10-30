import type * as BabelCoreNamespace from "@babel/core";
import type * as BabelTypesNamespace from "@babel/types";
import type { PluginObj } from "@babel/core";

export type Babel = typeof BabelCoreNamespace;
export type BabelTypes = typeof BabelTypesNamespace;

export enum OptionKeys {
  Faker = "faker",
  Seed = "seed",
}

interface Options {
  [OptionKeys.Faker]: string;
  [OptionKeys.Seed]: number;
}

export default function storybookAddonFakerBabelPlugin({
  types: t,
}: Babel): PluginObj {
  const seedStoryIdentifier = t.identifier("seedStory");
  const fakerSpecifier = t.identifier("faker");

  const FakerImportedSet = new Set();

  const options: Options = {
    [OptionKeys.Faker]: "@faker-js/faker",
    [OptionKeys.Seed]: 999,
  };

  return {
    name: "@storybook-addon-faker/babel",
    manipulateOptions(opts) {
      const pluginOptions = opts.plugins.find(
        (plugin: { key: string }) =>
          plugin.key === "@storybook-addon-faker/babel"
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
        enter(path) {
          const importSeedStorybook = t.importSpecifier(
            seedStoryIdentifier,
            seedStoryIdentifier
          );
          const importDeclaration = t.importDeclaration(
            [importSeedStorybook],
            t.stringLiteral("@storybook-addon-faker/addon")
          );

          path.unshiftContainer("body", importDeclaration);
        },
        exit(path, state) {
          const importFaker = t.importSpecifier(fakerSpecifier, fakerSpecifier);
          const importFakerDeclaration = t.importDeclaration(
            [importFaker],
            t.stringLiteral(options.faker)
          );
          if (!FakerImportedSet.has(state.filename)) {
            path.unshiftContainer("body", importFakerDeclaration);
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
                fakerSpecifier
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
          const isFakerImported = path.node.specifiers.some(
            (spec) => spec.local.name === OptionKeys.Faker
          );

          // we need to keep track of files that already imported faker (user import)
          // for these files we do not need to add an import statement
          if (isFakerImported) {
            FakerImportedSet.add(state.filename);
          }
        },
      },
    },
  };
}
