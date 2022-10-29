import { faker } from "@faker-js/faker/locales/en";
import { seedStory } from "seed-story";
function mockStuff() {
  return {
    loading: true,
  };
}·
export const Default = seedStory(
  () => ({
    args: mockStuff(),
  }),
  {
    faker: faker,
    seed: 123,
  }
);
