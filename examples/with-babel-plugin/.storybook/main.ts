import { StorybookConfig } from "@storybook/react/types";

import createConfig from "../../.storybook/main";

const config: StorybookConfig = createConfig({
  addons: ["storybook-addon-faker"],
  webpackFinal: async (config) => {
    config.module = {
      ...config.module,
      rules: [...(config.module?.rules ?? [])],
    };

    config.module.rules.unshift({
      test: /.stories.(js|jsx|ts|tsx)$/,
      loader: "babel-loader",
      options: {
        plugins: [
          [
            require.resolve("storybook-addon-faker-babel-plugin"),
            { seed: 634 },
          ],
        ],
      },
    });

    return config;
  },
});

export default config;
