import path from "path";
import { StorybookConfig } from "@storybook/react/types";
import webpack from "webpack";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: ["@storybook/addon-essentials"],
};

export default config;
