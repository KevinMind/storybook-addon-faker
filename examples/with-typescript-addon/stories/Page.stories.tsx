import { ComponentProps } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { rest } from "msw";
import { within, userEvent } from "@storybook/testing-library";

import { Page } from "../../_components/page/Page";
import { User, mockUser } from "./user";

const meta: Meta<typeof Page> = {
  component: Page,
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers: [
        rest.get<User>("/user/:id", (_req, res, ctx) => {
          return res(ctx.delay(1000), ctx.json(mockUser()));
        }),
      ],
    },
  },
};

type Story = StoryObj<ComponentProps<typeof Page>>;

export const LoggedOut: Story = {};

export const LoggedIn: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = await canvas.getByRole("button", { name: /Log in/i });
    await userEvent.click(loginButton);
  },
};

export default meta;
