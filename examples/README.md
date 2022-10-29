## Create an example

from the root directory run:

```bash
yarn generate:example
```

follow the prompt to give the example a name. This will geneaate the basic scaffolding for an example project. Customize as needed

## Storybook config

Examples use a base set of stories to ensure that each example tests a unique feature of the addon's scope.

## Chromatic

Each example should be configured with chromatic to run regression tests against the addon. See .github/chromatic.yml for configuration.
