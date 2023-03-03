[![npm version](https://badge.fury.io/js/angular2-expandable-list.svg)](https://badge.fury.io/js/angular2-expandable-list)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Storybook addon faker

A storybook addon enabling faker usage in story (CSF) objects with *magic* seeding powers.

Use faker methods to define randomized and realistic mock data for your stories. Each time you load a story while
developing, faker will use a new unique value. This is wonderful for developing robust UI components as static mock
data tends to fall short of the dynamic world of real data your components will receive in the wild.

But why do I need an addon? I can just use faker methods directly.

Exactly, and using this addon doesn't change the way you use faker. Just call faker methods as usual when defining stories.
But, when you render your stories in a visual testing context (e.g. chromatic) calls to faker will be automatically seeded,
per story, ensuring that the data used to render your story is consistent across builds.
This ensures the only pixel diffs are due to your code and not varying test data. You get the best of both worlds.

Dynamic while developing, static while testing!

## Prerequisites

This project assumes you are using storybook already. It also assumes you are defining stories with CSF v3 story object
format. Finally it assumes you have `@faker-js/faker` installed.

This project supports node versions 16-19 and aims to support LTS versions.

## Table of contents

- [Storybook addon faker](#storybook-addon-faker)
  - [Prerequisites](#prerequisites)
  - [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Using via the addon](#using-via-the-addon)
    - [Using via the API](#using-via-the-api)
      - [seedStory](#seedstory)
        - [GetStory()](#getstory)
        - [Options](#options)
      - [Examples](#examples)
  - [Contributing](#contributing)
  - [Credits](#credits)
  - [Versioning](#versioning)
  - [Authors](#authors)
  - [License](#license)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

To install and set up the addon, run:

```sh
$ npm install storybook-addon-faker -D
```

Or if you prefer using Yarn:

```sh
$ yarn add storybook-addon-faker -D
```

## Usage

This package is shipped with storybook addon and companion babel plugin. You can use the addon for batteries included
setup, or import the library yourself and add per story.

### Using via the addon

Add `storybook-addon-faker` to you storybook addons in `.storybook/main.(js|ts)

```js
module.exports = {
  ... // storybook config
  addons: ["storybook-addon-faker"],
};

```

That's it. This will automatically include the babel plugin to your storybook webpack configuration,
wrapping all story objects in the `seedStory` wrapper giving you all the benefits of this addon with zero config.

You can add options to the addon to pass into the babel plugin.
See [example](../../examples/with-typescript-addon/.storybook/main.ts).

Define some stories using faker anywhere in the story object definition.

```tsx
export const Default = {
  args: {
    loading: faker.datatype.boolean(),
  },
};
```

When you run this story locally, the value of `Default.args.loading` will randomly switch between `true` and `false`
each time the story module is loaded. If you refresh the page you will see it switch back and forth. But, if you add

`?chromatic=true` to the URL of the storybook browser window, the value will lock into either `true` or `false` and will
always return the same value.

### Using via the API

You can also import `seeStory` directly from the addon package if you don't want to use the babel plugin.
This can also be useful if you want to customize a single story

#### seedStory

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

##### GetStory()

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

##### Options

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

#### Examples

See the [examples](./examples/) folder for specific example implementations

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit -am 'Add some feature'`
5.  Push to the branch: `git push origin my-new-feature`
6.  Submit a pull request :sunglasses:

## Credits

TBD

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/kevinmind/storybook-addon-faker/tags).

## Authors

* **Kevin Mind** - *Initial work* - [KevinMind](https://github.com/kevinmind)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

[MIT License](https://andreasonny.mit-license.org/2019) © Andrea SonnY
