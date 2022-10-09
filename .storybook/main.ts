import path from 'path';
import { StorybookConfig } from '@storybook/react/types';

const storybookAddonFakerBabel = require.resolve(path.join(__dirname, '..', 'src', 'storybook-addon-faker-babel-plugin'));

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: ["../preset.js", "@storybook/addon-essentials"],
  webpackFinal: async (config) => {

    config.module?.rules.push({
      test: /.stories.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        plugins: [
          storybookAddonFakerBabel,
        ],
      }
    });

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        'storybook-addon-faker': path.resolve(__dirname, '..', 'src/'),
      }
    };

    return config;
  },
};

export default config;
