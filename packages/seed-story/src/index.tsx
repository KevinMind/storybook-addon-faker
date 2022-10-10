import { StoryObj } from "@storybook/react";
import isChromatic from "chromatic/isChromatic";
import { Faker } from "@faker-js/faker";

// TODO: replace with environment variable or some configurable parameter
const STORYBOOK_FAKER_SEED = 12345;
interface SeedStoryOptions {
  seed: number;
  faker: string;
}

const defaultSeedOptions: SeedStoryOptions = {
  seed: STORYBOOK_FAKER_SEED,
  faker: "@faker-js/faker",
};

function getOptions(input: Partial<SeedStoryOptions> = {}): SeedStoryOptions {
  return {
    seed: input?.seed ?? defaultSeedOptions.seed,
    faker: input?.faker ?? defaultSeedOptions.faker,
  };
}

export function seedStory<Args>(
  getStoryObj: (faker: Faker) => StoryObj<Args> = () => ({}),
  input: Partial<SeedStoryOptions> = {}
): StoryObj<Args> {
  const options = getOptions(input);

  const isSeedActive = isChromatic();
  const faker = require(options.faker) as Faker;

  if (isSeedActive) {
    faker.seed(options.seed);
  }

  return getStoryObj(faker);
}
