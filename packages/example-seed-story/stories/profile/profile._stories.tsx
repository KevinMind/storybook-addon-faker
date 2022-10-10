import { ComponentProps } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker/locale/en";

import { Profile } from "./Profile";

type Story = StoryObj<ComponentProps<typeof Profile>>;

const meta: Meta<typeof Profile> = {
  component: Profile,
};

export const Default: Story = {
  args: {
    title: faker.name.fullName(),
    image: faker.image.avatar(),
  },
};

export default meta;
