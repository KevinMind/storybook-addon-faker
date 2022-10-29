import path from 'path';
import { StorybookConfig } from "@storybook/react/types";


import merge from 'deepmerge';

const config: StorybookConfig = {
  stories: [
    path.join(__dirname, 'stories/**/*.stories.mdx'),
    path.join(__dirname, 'stories/**/*.stories.@(js|jsx|ts|tsx)'),
  ],
  addons: ["@storybook/addon-essentials"],
};

export default function createConfig(input: Partial<StorybookConfig> = {}) {
  return merge(config, input);
}
