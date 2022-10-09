import { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw'
import { within, userEvent } from '@storybook/testing-library';

import { Page } from './Page';
import { User, mockUser } from '../user';
import { ComponentProps } from 'react';

const meta: Meta<typeof Page> = {
  component: Page,
  parameters: {
    layout: 'fullscreen',
    msw: {
      handlers: [
        rest.get<User>('/user/:id', (_req, res, ctx) => {
          return res(
            ctx.delay(1000),
            ctx.json(mockUser())
          )
        }),
      ]
    },
  },
};

type Story = StoryObj<ComponentProps<typeof Page>>;

export const LoggedOut: Story = {};

export const LoggedIn: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = await canvas.getByRole('button', { name: /Log in/i });
    await userEvent.click(loginButton);
  },
};

export default meta;
