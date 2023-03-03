import { StorybookConfig } from "@storybook/react/types";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-essentials",
    {
      name: "storybook-addon-faker",
      options: {
        seed: 634,
        faker: "@faker-js/faker",
      },
    },
  ],
};

export default config;
