import { StoryObj } from "@storybook/react";
import isChromatic from "chromatic/isChromatic";
import { faker, Faker } from "@faker-js/faker";

// TODO: replace with environment variable or some configurable parameter
const STORYBOOK_FAKER_SEED = 12345;
interface SeedStoryOptions {
  isSeedActive: () => boolean;
  seed: number;
  faker: Faker;
}

const defaultSeedOptions: SeedStoryOptions = {
  isSeedActive: () => isChromatic(),
  seed: STORYBOOK_FAKER_SEED,
  faker,
};

function getOptions(input: Partial<SeedStoryOptions> = {}): SeedStoryOptions {
  return {
    isSeedActive: input?.isSeedActive ?? defaultSeedOptions.isSeedActive,
    seed: input?.seed ?? defaultSeedOptions.seed,
    faker: input?.faker ?? defaultSeedOptions.faker,
  };
}

export function seedStory<Args>(
  getStoryObj: (faker: Faker) => StoryObj<Args> = () => ({}),
  input: Partial<SeedStoryOptions> = {}
): StoryObj<Args> {
  const options = getOptions(input);

  const shouldSeed = options.isSeedActive();
  console.log({
    ...options,
    isSeedActive: shouldSeed,
  });

  if (shouldSeed) {
    options.faker.seed(STORYBOOK_FAKER_SEED);
  }

  return getStoryObj(options.faker);
}
