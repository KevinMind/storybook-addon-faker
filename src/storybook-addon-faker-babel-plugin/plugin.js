module.exports = function storybookAddonFakerBabelPlugin({
  types: t
}) {
  const seedStoryIdentifier = t.identifier('seedStory');

  let isCalled = false;

  return {
    name: 'storybook-addon-faker-babel-plugin',
    visitor: {
      Program(path) {

        const importSeedStorybook = t.importSpecifier(seedStoryIdentifier, seedStoryIdentifier);
        const importDeclaration = t.importDeclaration([importSeedStorybook], t.stringLiteral('storybook-addon-faker'));

        path.unshiftContainer('body', importDeclaration);
      },
      ExportNamedDeclaration(path) {
        debugger;
        const exportedDeclaration = path.node.declaration;

        if (exportedDeclaration.type === 'VariableDeclaration') {
          if (exportedDeclaration.declarations.length !== 1) {
            return console.error('cannot handle export with multiple declarations');
          }
          const storyObjectExpression = exportedDeclaration.declarations[0].init;
          if (storyObjectExpression.type === 'ObjectExpression') {
            isCalled = true;

            // wrap exported story object in seedStory
            const seedStoryArgument = t.arrowFunctionExpression([], storyObjectExpression);
            const callExpression = t.callExpression(seedStoryIdentifier, [seedStoryArgument]);
            exportedDeclaration.declarations[0].init = callExpression;

          }
        }
      }
    }
  };
}
