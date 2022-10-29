import { faker } from "@faker-js/faker/locales/en";
import { seedStory } from "seed-story";
export const Default = seedStory(
  () => ({
    args: {},
  }),
  {
    faker: faker,
    seed: 123,
  }
);
