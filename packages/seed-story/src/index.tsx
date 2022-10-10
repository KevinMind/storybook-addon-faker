import { StoryObj } from "@storybook/react";
import isChromatic from "chromatic/isChromatic";
import { faker, Faker } from "@faker-js/faker";

// TODO: replace with environment variable or some configurable parameter
const STORYBOOK_FAKER_SEED = 12345;

export function seedStory<Args>(
  getStoryObj: (faker: Faker) => StoryObj<Args> = () => ({})
): StoryObj<Args> {
  if (isChromatic()) {
    faker.seed(STORYBOOK_FAKER_SEED);
  }

  return getStoryObj(faker);
}
