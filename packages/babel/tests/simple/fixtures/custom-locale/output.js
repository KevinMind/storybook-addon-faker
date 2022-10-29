import { seedStory } from "@storybook-addon-faker/addon";
import { faker } from "@faker-js/faker/locales/en";
export const Default = seedStory(
  () => ({
    args: {},
  }),
  {
    faker: faker,
    seed: 999,
  }
);
