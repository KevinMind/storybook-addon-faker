module.exports = function (plop) {
  // controller generator
  plop.setGenerator('Package', {
    description: 'create new package',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'what is the name of the package',
      },
      {
        type: 'list',
        name: 'tsconfigPreset',
        message: 'which tsconfig preset to use',
        choices: [
          "base",
          "react-library"
        ]
      },
    ],
    actions: [
      {
        type: 'addMany',
        base: '../templates/package',
        destination: '../../packages/{{name}}',
        transform: (data) => {
          return data;
        },
        templateFiles: '../templates/package/**',
        stripExtensions: ['hbs'],
        globOptions: {
          dot: true,
        },
      },
    ],
  });
};
