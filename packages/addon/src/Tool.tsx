import React, { useCallback } from "react";
import { useGlobals } from "@storybook/api";
import { Icons, IconButton } from "@storybook/components";
import { TOOL_ID } from "./constants";

import seeded from "./symbol";

export const Tool = () => {
  const [{ myAddon }, updateGlobals] = useGlobals();

  const toggleMyTool = useCallback(() => {
    const newValue = myAddon ? undefined : true;
    updateGlobals({
      myAddon: newValue,
    });

    (window as any)[seeded] = newValue;
  }, [myAddon, updateGlobals]);

  return (
    <IconButton
      key={TOOL_ID}
      active={myAddon}
      title="Enable my addon"
      onClick={toggleMyTool}
    >
      {/*
        Checkout https://next--storybookjs.netlify.app/official-storybook/?path=/story/basics-icon--labels
        for the full list of icons
      */}
      <Icons icon="lightning" />
    </IconButton>
  );
};
