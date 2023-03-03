import { faker } from "@faker-js/faker";
import { seedStory } from "storybook-addon-faker";

export const Default = {
  args: {
    loading: false,
  },
};

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
