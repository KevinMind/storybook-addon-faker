import type * as BabelCoreNamespace from "@babel/core";
import type * as BabelTypesNamespace from "@babel/types";
import type { PluginObj } from "@babel/core";

export type Babel = typeof BabelCoreNamespace;
export type BabelTypes = typeof BabelTypesNamespace;

export default function storybookAddonFakerBabelPlugin({
  types: t,
}: Babel): PluginObj {
  const seedStoryIdentifier = t.identifier("seedStory");

  return {
    name: "storybook-addon-faker-babel-plugin",
    visitor: {
      Program(path) {
        const importSeedStorybook = t.importSpecifier(
          seedStoryIdentifier,
          seedStoryIdentifier
        );
        const importDeclaration = t.importDeclaration(
          [importSeedStorybook],
          t.stringLiteral("seed-story")
        );

        path.unshiftContainer("body", importDeclaration);
      },
      ExportNamedDeclaration(path, { opts }) {
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
            if ("seed" in opts && "faker" in opts) {
              const { seed, faker } = opts as {
                seed: number;
                faker: string;
              };
              // wrap exported story object in seedStory
              const seedStoryArgument = t.arrowFunctionExpression(
                [],
                storyObjectExpression
              );
              const seedStoryOptions = t.objectExpression([
                t.objectProperty(t.identifier("seed"), t.numericLiteral(seed)),
                t.objectProperty(t.identifier("faker"), t.stringLiteral(faker)),
              ]);
              const callExpression = t.callExpression(seedStoryIdentifier, [
                seedStoryArgument,
                seedStoryOptions,
              ]);
              exportedDeclaration.declarations[0].init = callExpression;
            } else {
              throw new Error("invalid options passed");
            }
          }
        }
      },
    },
  };
}
