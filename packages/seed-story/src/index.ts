import { StoryObj } from "@storybook/react";
import isChromatic from "chromatic/isChromatic";
import type { Faker } from "@faker-js/faker";

interface Options {
  faker: Faker;
  seed: number;
}

export function seedStory<Args>(
  getStoryObj: (faker: Faker) => StoryObj<Args> = () => ({}),
  options: Options
): StoryObj<Args> {
  const isSeedActive = isChromatic();

  if (isSeedActive) {
    options.faker.seed(options.seed);
  }

  return getStoryObj(options.faker);
}
