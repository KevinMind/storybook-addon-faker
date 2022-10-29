import { seedStory } from "seed-story";
import { faker } from "@faker-js/faker";
export const Default = seedStory(
  () => ({
    args: {
      loading: faker.datatype.boolean(),
    },
  }),
  {
    faker: faker,
    seed: 123,
  }
);
