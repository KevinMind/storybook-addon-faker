import path from "path";
import { StorybookConfig } from "@storybook/react/types";

const storybookAddonFaker = path.resolve(__dirname, '../../seed-story/src');

console.log({storybookAddonFaker});

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: ["../preset.js", "@storybook/addon-essentials"],
  webpackFinal: async (config) => {
    config.module = {
      ...config.module,
      rules: [...config.module?.rules ?? []],
    };

    config.module.rules.unshift({
      test: /.stories.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      options: {
        plugins: [
          require.resolve(
            path.join(__dirname, "../../storybook-addon-faker-babel-plugin")
          )
        ]
      }
    });

    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    })

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        'seed-story': storybookAddonFaker,
      },
      extensions: [...config.resolve?.extensions ?? [], '*', '.mjs', '.js', '.json']
    };

    return config;
  }
};

export default config;
