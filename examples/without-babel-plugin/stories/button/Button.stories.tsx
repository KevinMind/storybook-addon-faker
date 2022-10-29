import { seedStory } from "seed-story";
import { faker } from "@faker-js/faker";

import { Button } from "../../../.storybook/stories/button/Button";
import * as Stories from "../../../.storybook/stories/button/Button.stories";

export default {
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const options = {
  faker,
  seed: 123,
};

export const Secondary = seedStory(() => Stories.Secondary, options);

export const Primary = seedStory(() => Stories.Primary, options);

export const Large = seedStory(() => Stories.Large, options);

export const Small = seedStory(() => Stories.Small, options);
