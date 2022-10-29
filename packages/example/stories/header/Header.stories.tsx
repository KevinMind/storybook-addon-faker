import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { mockUser } from "../user";
import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  component: Header,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
};

type Story = StoryObj<React.ComponentProps<typeof Header>>;

export const LoggedIn: Story = {
  args: {
    user: mockUser(),
  },
};

export const LoggedOut: Story = {
  args: {},
};

export default meta;
