import path from "path";
import { StorybookConfig } from "@storybook/react/types";
import webpack from "webpack";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: ["storybook-addon-faker", "@storybook/addon-essentials"],
  webpackFinal: async (config) => {
    config.module = {
      ...config.module,
      rules: [...(config.module?.rules ?? [])],
    };

    config.module.rules.unshift({
      test: /.stories.(js|jsx|ts|tsx)$/,
      loader: "babel-loader",
      options: {
        plugins: [require.resolve("storybook-addon-faker-babel-plugin")],
      },
    });

    return config;
  },
};

export default config;
