import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  base: "/avatar-generator/",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
