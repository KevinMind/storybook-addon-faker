import React from 'react';
import { Meta } from '@storybook/react';
import { faker } from '@faker-js/faker';

import {seedStory} from './seedStory';

const filtered = [
  'faker',
  'lorempicsum',
  'lorempixel',
  'unsplash',
  'placeholder',
  'gen',
];

function defaultResolve(_key: string, func: Function) {
  return func();
}

function mapModule(name, resolver = defaultResolve) {
  const module = faker[name];

  if (typeof module === 'function') {
    return resolver(name, module);
  }

  return Object.keys(module).filter((key) => !filtered.includes(key)).reduce((acm, key) => {
    const func = module[key];

    if (typeof func === 'function') {
      acm[key] = resolver(key, func);
    } else {
      acm[key] = func;
    }
    return acm;
  }, {})
}

function Faker(props) {
  return (
    <pre>{JSON.stringify(props, (_key, value) => {
      if (typeof value === 'bigint') {
        return String(value);
      }
      return value;
    }, 2)}</pre>
  )
}

const meta: Meta<typeof Faker> = {
  component: Faker,
};

export const Address = seedStory(() => ({
  args: mapModule('address'),
}));

export const Animal = seedStory(() => ({
  args: mapModule('animal'),
}));

export const Color = seedStory(() => ({
  args: mapModule('color'),
}));

export const Commerce = seedStory(() => ({
  args: mapModule('commerce'),
}));

export const Company = seedStory(() => ({
  args: mapModule('company'),
}));

export const DataBase = seedStory(() => ({
  args: mapModule('database'),
}));

export const DataTypeField = seedStory(() => ({
  args: mapModule('datatype', (key ,func) => {
    return String(func());
  }),
}));

export const Date = seedStory(() => ({
  args: mapModule('date'),
}));

export const Fake = seedStory(() => ({
  args: {
    fake: mapModule('fake', (_key, func) => {
      return func('Hi, my name is {{name.firstName}} {{name.lastName}}!');
    }),
  },
}));

export const Finance = seedStory(() => ({
  args: mapModule('finance'),
}));

export const Git = seedStory(() => ({
  args: mapModule('git'),
}));

export const Hacker = seedStory(() => ({
  args: mapModule('hacker'),
}));

export const Hepers = seedStory(() => ({
  args: mapModule('helpers', (key, func) => {
    switch (key) {
      case 'arrayElement':
      case 'arrayElements':
      case 'shuffle':
        return func([1, 2, 3]);
      case 'fake':
        return func('Hi, my name is {{name.firstName}} {{name.lastName}}!');
      case 'maybe':
        return func(() => 'Hello World!', { probability: 0.1 });
      case 'mustache':
        return func('I found {{count}} instances of "{{word}}".', {
          count: () => `${faker.datatype.number()}`,
          word: "this word",
        });
      case 'objectKey':
      case 'objectValue':
      case 'uniqueArray':
        return func({ myProperty: 'myValue', myBool: true });
      case 'regexpStyleStringParse':
        return func('#{3}test[1-5]');
      case 'repeatString':
        return func('Hello world! ', 2);
      case 'replaceCreditCardSymbols':
        return func();
      case 'replaceSymbolWithNumber':
        return func('Your pin is: !####');
      case 'replaceSymbols':
        return func('Your pin is: #?*#?*');
      case 'slugify':
        return func('"Hello world!"');
      case 'unique':
        return func(faker.name.firstName);
      default:
        return `key:${key}`;
    }
  }),
}));

export const Image = seedStory(() => ({
  args: mapModule('image'),
}));

export const Internet = seedStory(() => ({
  args: mapModule('internet'),
}));

export const Lorem = seedStory(() => ({
  args: mapModule('lorem'),
}));

export const Mersenne = seedStory(() => ({
  args: mapModule('mersenne', (key, func) => {
    if (key === 'rand') {
      return func();
    }
    return key;
  }),
}));

export const Music = seedStory(() => ({
  args: mapModule('music'),
}));

export const Name = seedStory(() => ({
  args: mapModule('name'),
}));

export const Phone = seedStory(() => ({
  args: mapModule('phone'),
}));

export const Random = seedStory(() => ({
  args: mapModule('random'),
}));

export const Science = seedStory(() => ({
  args: mapModule('science'),
}));

export const System = seedStory(() => ({
  args: mapModule('system'),
}));

export const Unique = seedStory(() => ({
  args: mapModule('unique', (_, func) => func(faker.name.firstName)),
}));

export const Vehicle = seedStory(() => ({
  args: mapModule('vehicle'),
}));

export const Word = seedStory(() => ({
  args: mapModule('word'),
}));

export default meta;
