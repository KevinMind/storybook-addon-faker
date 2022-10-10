import { StoryObj } from "@storybook/react";
import isChromatic from "chromatic/isChromatic";
import type { Faker } from "@faker-js/faker";
import { faker } from "@faker-js/faker/locale/en";

// TODO: replace with environment variable or some configurable parameter
const STORYBOOK_FAKER_SEED = 12345;

export function seedStory<Args>(
  getStoryObj: (faker: Faker) => StoryObj<Args> = () => ({})
): StoryObj<Args> {
  const isSeedActive = isChromatic();

  if (isSeedActive) {
    faker.seed(STORYBOOK_FAKER_SEED);
  }

  return getStoryObj(faker);
}
