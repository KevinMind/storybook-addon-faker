import { useParameter, useGlobals } from "@storybook/api";
import { useCallback } from "react";
import { PARAM_KEY } from "./constants";

export function useFakerSeed() {
  const [{ addonFaker }, updateGlobals] = useGlobals();
  const paramData = useParameter<string>(PARAM_KEY, "");

  const toggleCustomFakerSeed = useCallback(
    () =>
      updateGlobals({
        addonFaker: addonFaker ? undefined : true,
      }),
    [addonFaker]
  );

  console.log({paramData, addonFaker});

  return {
    toggleCustomFakerSeed,
    paramData,
  };
}
