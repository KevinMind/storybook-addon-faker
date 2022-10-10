import React from "react";
import { faker } from "@faker-js/faker/locale/en";
import { seedStory } from "seed-story";

import { Button } from "./Button";

type ButtonProps = React.ComponentProps<typeof Button>;

function mockButtonProps(input: Partial<ButtonProps>): ButtonProps {
  return {
    label: faker.word.verb(),
    size: faker.helpers.arrayElement<ButtonProps["size"]>([
      "small",
      "medium",
      "large",
    ]),
    ...input,
  };
}

export default {
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

export const Secondary = seedStory(() => ({
  args: mockButtonProps({ primary: false }),
}));

export const Primary = seedStory(() => ({
  args: mockButtonProps({ primary: true }),
}));

export const Large = seedStory(() => ({
  args: mockButtonProps({
    size: "large",
  }),
}));

export const Small = seedStory(() => ({
  args: mockButtonProps({
    size: "small",
  }),
}));
