import React from 'react';
import { Meta } from '@storybook/react';
import {faker} from '@faker-js/faker';

import { User, mockUser } from '../user';
import { Header } from './Header';
import { seedStory } from '../seedStory';

console.log('buildingNumber', faker.address.buildingNumber());



const meta: Meta<typeof Header> = {
  component: Header,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

type Props = React.ComponentProps<typeof Header>;

export const LoggedIn = seedStory<Props>(() => ({
  args: {
    user: mockUser(),
  }
}));

console.log('buildingNumber', faker.address.buildingNumber());
export const LoggedOut = seedStory<Props>(() => ({
  args: {},
}));

export default meta;
