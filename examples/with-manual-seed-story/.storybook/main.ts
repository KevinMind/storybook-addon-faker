import { StorybookConfig } from "@storybook/react/types";

import createConfig from "../../.storybook/main";

const config: StorybookConfig = createConfig(
  {
    stories: [
      "../stories/**/*.stories.@(js|jsx|ts|tsx)",
      "../stories/**/*.stories.mdx",
    ],
  },
  { arrayMerge: (_, source) => source }
);

export default config;
