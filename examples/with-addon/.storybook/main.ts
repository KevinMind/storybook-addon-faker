import { StorybookConfig } from "@storybook/react/types";

import createConfig from "../../.storybook/main";

const config: StorybookConfig = createConfig({
  addons: [
    {
      name: "@storybook-addon-faker/addon",
      options: {
        seed: 634,
        faker: "@faker-js/faker",
      },
    },
  ],
});

export default config;
