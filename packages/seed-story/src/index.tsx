import { StoryObj } from "@storybook/react";
import isChromatic from "chromatic/isChromatic";
import { faker } from "@faker-js/faker";

type FunctionOrObj<T> = T | ((seed: number) => T);

// TODO: replace with environment variable or some configurable parameter
const STORYBOOK_FAKER_SEED = 12345;

export function seedStory<Args>(
  getStoryObj: FunctionOrObj<StoryObj<Args>> = () => ({})
): StoryObj<Args> {
  if (isChromatic()) {
    faker.seed(STORYBOOK_FAKER_SEED);
  }

  const story =
    typeof getStoryObj === "function"
      ? getStoryObj(STORYBOOK_FAKER_SEED)
      : getStoryObj;

  return story;
}
