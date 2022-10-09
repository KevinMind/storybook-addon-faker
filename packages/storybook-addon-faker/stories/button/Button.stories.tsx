import React from "react";
import { faker } from "@faker-js/faker";

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

export const Secondary = {
  args: mockButtonProps({ primary: false }),
};

export const Primary = {
  args: mockButtonProps({ primary: true }),
};

export const Large = {
  args: mockButtonProps({
    size: "large",
  }),
};

export const Small = {
  args: mockButtonProps({
    size: "small",
  }),
};
