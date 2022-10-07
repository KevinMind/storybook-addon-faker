import React from 'react';
import { Meta } from '@storybook/react';
import {faker} from '@faker-js/faker';
import { rest } from 'msw'
import { within, userEvent } from '@storybook/testing-library';

import {seedStory} from '../seedStory'
import { Page } from './Page';
import { User, mockUser } from '../user';

export default {
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
} as Meta<typeof Page>;

console.log('buildingNumber', faker.address.buildingNumber());

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const LoggedOut = seedStory();

export const LoggedIn = seedStory({
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = await canvas.getByRole('button', { name: /Log in/i });
    await userEvent.click(loginButton);
  },
});
