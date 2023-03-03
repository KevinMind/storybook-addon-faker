import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: {
        addon: resolve(__dirname, "src/index.ts"),
        babel: resolve(__dirname, "src/babel/index.ts"),
        preset: resolve(__dirname, "src/preset/index.ts"),
      },
      fileName(format, entryName) {
        const extension = format === 'cjs' ? 'cjs' : 'js';
        const filename = `index.${extension}`;
        if (entryName === 'addon') {
          return filename;
        }
        return `${entryName}/${filename}`;
      },
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["storybook-addon-faker/babel"],
    },
  },
  plugins: [dts()],
});
