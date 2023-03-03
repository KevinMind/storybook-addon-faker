import { seedStory } from "storybook-addon-faker";
import { faker } from "@faker-js/faker/locales/de";
export const Default = seedStory(
  () => ({
    args: {},
  }),
  {
    faker: faker,
    seed: 123,
  }
);
