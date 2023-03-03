import { seedStory } from "storybook-addon-faker";
import { faker } from "@faker-js/faker/locales/en";
export const Default = seedStory(
  () => ({
    args: {},
  }),
  {
    faker: faker,
    seed: 123,
  }
);
