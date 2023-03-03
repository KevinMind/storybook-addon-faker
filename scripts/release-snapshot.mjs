#!/usr/bin/env zx

import "zx/globals";

const tagName = await question("What tag do you want to publish under?");

if (!tagName) {
  throw new Error("Invalid tag provided");
}

await $`yarn changeset version --snapshot ${tagName}`;
await $`git add .`;
await $`git commit -m 'tmp: snapshot release:${tagName}'`;
await $`yarn changeset publish --tag ${tagName}`;

const DiscardOptions = {
  Yes: "yes",
  No: "no",
};

const discardOption = await question(
  "Do you want to discard the snapshot changeset commit?",
  {
    choices: Object.values(DiscardOptions),
  }
);

const resetArg = discardOption === DiscardOptions.Yes ? "hard" : "soft";

console.log(`git reset --${resetArg} HEAD~1`);

await $`git reset --${resetArg} HEAD~1`;
