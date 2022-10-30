import { faker } from "@faker-js/faker/locales/en";
import { seedStory } from "@storybook-addon-faker/addon";
export const Default = seedStory(
  () => ({
    args: {},
  }),
  {
    faker: faker,
    seed: 123,
  }
);
