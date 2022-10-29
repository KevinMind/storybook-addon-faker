import { seedStory } from "@storybook-addon-faker/addon";
import { faker } from "@faker-js/faker";
export const Default = seedStory(
  () => ({
    args: {
      loading: faker.datatype.boolean(),
    },
  }),
  {
    faker: faker,
    seed: 999,
  }
);
