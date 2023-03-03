import { seedStory } from "storybook-addon-faker";
import { faker } from "@faker-js/faker";
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
