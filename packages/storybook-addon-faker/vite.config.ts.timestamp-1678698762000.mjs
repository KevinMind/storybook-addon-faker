// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "file:///workspaces/storybook-addon-faker/packages/storybook-addon-faker/node_modules/vite/dist/node/index.js";
import dts from "file:///workspaces/storybook-addon-faker/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/workspaces/storybook-addon-faker/packages/storybook-addon-faker";
var vite_config_default = defineConfig({
  build: {
    lib: {
      entry: {
        addon: resolve(__vite_injected_original_dirname, "src/index.ts"),
        babel: resolve(__vite_injected_original_dirname, "src/babel/index.ts"),
        preset: resolve(__vite_injected_original_dirname, "src/preset/index.ts")
      },
      fileName(format, entryName) {
        const extension = format === "cjs" ? "cjs" : "js";
        const filename = `index.${extension}`;
        if (entryName === "addon") {
          return filename;
        }
        return `${entryName}/${filename}`;
      }
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["storybook-addon-faker/babel"]
    }
  },
  plugins: [dts()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvd29ya3NwYWNlcy9zdG9yeWJvb2stYWRkb24tZmFrZXIvcGFja2FnZXMvc3Rvcnlib29rLWFkZG9uLWZha2VyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvd29ya3NwYWNlcy9zdG9yeWJvb2stYWRkb24tZmFrZXIvcGFja2FnZXMvc3Rvcnlib29rLWFkZG9uLWZha2VyL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy93b3Jrc3BhY2VzL3N0b3J5Ym9vay1hZGRvbi1mYWtlci9wYWNrYWdlcy9zdG9yeWJvb2stYWRkb24tZmFrZXIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiB7XG4gICAgICAgIGFkZG9uOiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvaW5kZXgudHNcIiksXG4gICAgICAgIGJhYmVsOiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvYmFiZWwvaW5kZXgudHNcIiksXG4gICAgICAgIHByZXNldDogcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL3ByZXNldC9pbmRleC50c1wiKSxcbiAgICAgIH0sXG4gICAgICBmaWxlTmFtZShmb3JtYXQsIGVudHJ5TmFtZSkge1xuICAgICAgICBjb25zdCBleHRlbnNpb24gPSBmb3JtYXQgPT09ICdjanMnID8gJ2NqcycgOiAnanMnO1xuICAgICAgICBjb25zdCBmaWxlbmFtZSA9IGBpbmRleC4ke2V4dGVuc2lvbn1gO1xuICAgICAgICBpZiAoZW50cnlOYW1lID09PSAnYWRkb24nKSB7XG4gICAgICAgICAgcmV0dXJuIGZpbGVuYW1lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgJHtlbnRyeU5hbWV9LyR7ZmlsZW5hbWV9YDtcbiAgICAgIH0sXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAvLyBtYWtlIHN1cmUgdG8gZXh0ZXJuYWxpemUgZGVwcyB0aGF0IHNob3VsZG4ndCBiZSBidW5kbGVkXG4gICAgICAvLyBpbnRvIHlvdXIgbGlicmFyeVxuICAgICAgZXh0ZXJuYWw6IFtcInN0b3J5Ym9vay1hZGRvbi1mYWtlci9iYWJlbFwiXSxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbZHRzKCldLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtYLFNBQVMsZUFBZTtBQUMxWSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFGaEIsSUFBTSxtQ0FBbUM7QUFJekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsT0FBTztBQUFBLFFBQ0wsT0FBTyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxRQUN4QyxPQUFPLFFBQVEsa0NBQVcsb0JBQW9CO0FBQUEsUUFDOUMsUUFBUSxRQUFRLGtDQUFXLHFCQUFxQjtBQUFBLE1BQ2xEO0FBQUEsTUFDQSxTQUFTLFFBQVEsV0FBVztBQUMxQixjQUFNLFlBQVksV0FBVyxRQUFRLFFBQVE7QUFDN0MsY0FBTSxXQUFXLFNBQVM7QUFDMUIsWUFBSSxjQUFjLFNBQVM7QUFDekIsaUJBQU87QUFBQSxRQUNUO0FBQ0EsZUFBTyxHQUFHLGFBQWE7QUFBQSxNQUN6QjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGVBQWU7QUFBQTtBQUFBO0FBQUEsTUFHYixVQUFVLENBQUMsNkJBQTZCO0FBQUEsSUFDMUM7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTLENBQUMsSUFBSSxDQUFDO0FBQ2pCLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
