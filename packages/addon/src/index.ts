import { StoryObj } from "@storybook/react";
import isChromatic from "chromatic/isChromatic";
import type { Faker } from "@faker-js/faker";

import seeded from "./symbol";

interface Options {
  faker: Faker;
  seed: number;
}

export function seedStory<Args>(
  getStoryObj: (faker: Faker) => StoryObj<Args> = () => ({}),
  { faker, seed }: Options
): StoryObj<Args> {
  const isSeedActive = isChromatic();

  console.log({
    seeded,
    value: window[seeded as any],
  });

  if (isSeedActive) {
    faker.seed(seed);
  }

  return getStoryObj(faker);
}
