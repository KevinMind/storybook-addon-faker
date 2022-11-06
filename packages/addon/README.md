# @storybook-addon-faker/addon

The storybook addon and node api. For the addon documentation, see [README](../../README.md)

## API

If you want, you can use the node api for seeding stories directly.

### seedStory

```tsx
import {StoryObj} from "@storybook/react";

type GetStory = () => StoryObj;

interface Options {
  faker: Faker;
  seed: number;
}

function seedStory(GetStory, Options);
```

`seedStory` accepts two argumentss, a function callback `GetStory` and a configuration object `Options`.

#### GetStory()

Seed story accepts a callback function to define your `StoryObj` and wrap calls to `faker` in a seed. This allows each
story to have a unique set of seeded values returned from all calls to faker when the seed is enabled.

If you have a story object defined:

```js
export const Default = {
  args: {
    loading: faker.datatype.boolean(),
  },
};

```

Then you would wrap this story with `seedStory` like:

```js
export const seedStory(() => ({
  args: {
    loading: faker.datatype.boolean(),
  },
}), {
  faker: myFaker,
  seed: 123,
});

```

Now, `seedStory` can delay defining your story object until after the seed has been set. This is the magic.

#### Options

`options.faker`

| Type  | Default value |
|-------|---------------|
| Faker | undefindd     |

The faker instance to set a seed on. This should be the same faker instance you are using to define the values for your story.

Example:

```tsx
import {faker} from '@faker-js/locales/de';
import {Card} from './Card';

export default {component: Card} as Meta<typeof Card>;

export const Default = seedStory(() => ({
  args: {
    loading: faker.datatype.boolean(),
  },
}), {
  faker,
  seed: 123
});

```

`options.seed`

| Type   | Default value | Description              |
|--------|---------------|--------------------------|
| number | 0             | The seed to set on faker |

This is the seed to set on faker before rendering your story.

Example:

```tsx

import {faker} from '@faker-js/locales/de';
import {Card} from './Card';

export default {component: Card} as Meta<typeof Card>;

export const Default = seedStory(() => ({
  args: {
    loading: faker.datatype.boolean(),
  },
}), {
  faker,
  // Set `faker.seed(123) before calling the internal callback to render `<Card />`
  seed: 123
});
```

