import React from "react";
import { Meta } from "@storybook/react";
import { faker } from "@faker-js/faker/locale/en";

const filtered = [
  "faker",
  "lorempicsum",
  "lorempixel",
  "unsplash",
  "placeholder",
  "gen",
];

function defaultResolve(_key: string, func: Function) {
  return func();
}

function mapModule(name: string, resolver = defaultResolve) {
  const module = faker[name];

  if (typeof module === "function") {
    return resolver(name, module);
  }

  return Object.keys(module)
    .filter((key) => !filtered.includes(key))
    .reduce((acm, key) => {
      const func = module[key];

      if (typeof func === "function") {
        acm[key] = resolver(key, func);
      } else {
        acm[key] = func;
      }
      return acm;
    }, {});
}

function Faker(props) {
  return (
    <pre>
      {JSON.stringify(
        props,
        (_key, value) => {
          if (typeof value === "bigint") {
            return String(value);
          }
          return value;
        },
        2
      )}
    </pre>
  );
}

const meta: Meta<typeof Faker> = {
  component: Faker,
};

export const Address = {
  args: mapModule("address"),
};

export const Animal = {
  args: mapModule("animal"),
};

export const Color = {
  args: mapModule("color"),
};

export const Commerce = {
  args: mapModule("commerce"),
};

export const Company = {
  args: mapModule("company"),
};

export const DataBase = {
  args: mapModule("database"),
};

export const DataTypeField = {
  args: mapModule("datatype", (key, func) => {
    return String(func());
  }),
};

export const Date = {
  args: mapModule("date"),
};

export const Fake = {
  args: {
    fake: mapModule("fake", (_key, func) => {
      return func("Hi, my name is {{name.firstName}} {{name.lastName}}!");
    }),
  },
};

export const Finance = {
  args: mapModule("finance"),
};

export const Git = {
  args: mapModule("git"),
};

export const Hacker = {
  args: mapModule("hacker"),
};

export const Hepers = {
  args: mapModule("helpers", (key, func) => {
    switch (key) {
      case "arrayElement":
      case "arrayElements":
      case "shuffle":
        return func([1, 2, 3]);
      case "fake":
        return func("Hi, my name is {{name.firstName}} {{name.lastName}}!");
      case "maybe":
        return func(() => "Hello World!", { probability: 0.1 });
      case "mustache":
        return func('I found {{count}} instances of "{{word}}".', {
          count: () => `${faker.datatype.number()}`,
          word: "this word",
        });
      case "objectKey":
      case "objectValue":
      case "uniqueArray":
        return func({ myProperty: "myValue", myBool: true });
      case "regexpStyleStringParse":
        return func("#{3}test[1-5]");
      case "repeatString":
        return func("Hello world! ", 2);
      case "replaceCreditCardSymbols":
        return func();
      case "replaceSymbolWithNumber":
        return func("Your pin is: !####");
      case "replaceSymbols":
        return func("Your pin is: #?*#?*");
      case "slugify":
        return func('"Hello world!"');
      case "unique":
        return func(faker.name.firstName);
      default:
        return `key:${key}`;
    }
  }),
};

export const Image = {
  args: mapModule("image"),
};

export const Internet = {
  args: mapModule("internet"),
};

export const Lorem = {
  args: mapModule("lorem"),
};

export const Mersenne = {
  args: mapModule("mersenne", (key, func) => {
    if (key === "rand") {
      return func();
    }
    return key;
  }),
};

export const Music = {
  args: mapModule("music"),
};

export const Name = {
  args: mapModule("name"),
};

export const Phone = {
  args: mapModule("phone"),
};

export const Random = {
  args: mapModule("random"),
};

export const Science = {
  args: mapModule("science"),
};

export const System = {
  args: mapModule("system"),
};

export const Unique = {
  args: mapModule("unique", (_, func) => func(faker.name.firstName)),
};

export const Vehicle = {
  args: mapModule("vehicle"),
};

export const Word = {
  args: mapModule("word"),
};

export default meta;
