import { seedStory } from "storybook-addon-faker";
function mockStuff() {
  return {
    loading: true,
  };
}
export const Default = seedStory(() => ({
  args: mockStuff(),
}));
