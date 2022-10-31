import { Configuration } from "webpack";
import { Options as BabelPluginOptions } from "@storybook-addon-faker/babel";

const defaultOptions: BabelPluginOptions = {
  seed: 12345,
  faker: "@faker-js/faker",
};

export async function webpack(
  baseConfig: Configuration,
  {
    seed = defaultOptions.seed,
    faker = defaultOptions.faker,
  }: BabelPluginOptions = defaultOptions
): Promise<Configuration> {
  const { module = {} } = baseConfig;

  return {
    ...baseConfig,
    module: {
      ...module,
      rules: [
        {
          test: /.stories.(js|jsx|ts|tsx)$/,
          loader: "babel-loader",
          options: {
            plugins: [
              [
                require.resolve("@storybook-addon-faker/babel"),
                { seed, faker },
              ],
            ],
          },
        },
        ...(baseConfig.module?.rules || []),
      ],
    },
  };
}
