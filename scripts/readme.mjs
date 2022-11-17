#!/usr/bin/env zx

import "zx/globals";

const packagesPath = path.join(__dirname, "../packages");
const rootReadme = path.join(__dirname, "..", "README.md");

function copyReadme(name) {
  const packageDir = path.join(packagesPath, name);
  const pkgJSON = require(path.join(packageDir, 'package.json'));

  if (pkgJSON.private) {
    return console.log(`skipping:${name}`);
  }

  const readmePath = path.join(packageDir, "README.md");

  const rootContent = fs.readFileSync(rootReadme, "utf-8");

  const finalContent = `
  # @storybook-addon-faker/${name}

  ${rootContent}
  `;

  fs.writeFileSync(readmePath, finalContent, "utf-8");

  $`git add ${readmePath}`;
}

for (let packageName of fs.readdirSync(packagesPath)) {
  copyReadme(packageName);
}
