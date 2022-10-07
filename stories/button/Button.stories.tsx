import React from 'react';
import {faker} from '@faker-js/faker';

import { Button } from './Button';
import { seedStory } from '../seedStory';

type ButtonProps = React.ComponentProps<typeof Button>;

function mockButtonProps(input: Partial<ButtonProps>): ButtonProps {
  return {
    label: faker.word.verb(),
    size: faker.helpers.arrayElement<ButtonProps['size']>(['small', 'medium', 'large']),
    ...input,
  };
}

export default {
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export const Secondary = seedStory(() => ({
  args: mockButtonProps({primary: false}),
}));

console.log('call', faker.address.cardinalDirection());

export const Primary = seedStory(() => ({
  args: mockButtonProps({primary: true}),
}));

console.log('call', faker.address.cardinalDirection());

export const Large = seedStory(() => ({
  args: mockButtonProps({
    size: 'large',
  }),
}));

export const Small = seedStory(() => ({
  args: mockButtonProps({
    size: 'small',
  }),
}));
