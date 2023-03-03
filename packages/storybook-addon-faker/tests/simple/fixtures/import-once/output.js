import { faker } from "@faker-js/faker";
import { seedStory } from "storybook-addon-faker";
export const Default = seedStory(
  () => ({
    args: {
      loading: false,
    },
  }),
  {
    faker: faker,
    seed: 999,
  }
);
export const Seeded = seedStory(
  () => ({
    args: {
      loading: faker.datatype.boolean(),
    },
  }),
  {
    faker,
    seed: 100,
  }
);
