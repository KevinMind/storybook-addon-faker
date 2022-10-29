const fs = require("fs");
const path = require("path");

function getPort() {
  const numExistingExamples =
    fs.readdirSync(path.join(__dirname, "../../examples")).length - 1;

  const port = 6000 + numExistingExamples * 2;

  console.log({ numExistingExamples, port });

  return port;
}

module.exports = function (plop) {
  // controller generator
  plop.setGenerator("Example", {
    description: "create new example storybook project",
    prompts: [
      {
        type: "input",
        name: "name",
        message:
          "what is the name of the example project. Prepend `with-<name-of-example>` to the name",
      },
    ],
    actions: [
      {
        type: "addMany",
        base: "../templates/example",
        destination: "../../examples/{{name}}",
        data: {
          port: getPort(),
        },
        transform: (data) => {
          return data;
        },
        templateFiles: "../templates/example/**",
        stripExtensions: ["hbs"],
        globOptions: {
          dot: true,
        },
      },
    ],
  });
};
