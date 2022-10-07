import {ComponentProps} from 'react';
import { Meta } from '@storybook/react';
import {faker} from '@faker-js/faker';
import {seedStory} from '../seedStory';

import {Profile} from  './Profile';

type Args = ComponentProps<typeof Profile>;

const meta: Meta<typeof Profile> = {
  component: Profile,
};

export const Default = seedStory<Args>(() => ({
  args: {
    title: faker.name.fullName(),
    image: faker.image.avatar(),
  }
}))

export default meta;

