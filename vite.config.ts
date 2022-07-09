/// <reference types="vitest" />
/// <reference types="vite/client" />

import * as path from "path";
import { defineConfig } from "vite";
import libCss from "vite-plugin-libcss";
import dts from "vite-dts";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), dts(), libCss()],
  test: {
    globals: true,
    environment: "jsdom",
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "./src/index.ts"),
      name: "react-table-ny",
      fileName: (format) => `${format}.js`,
    },
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
    sourcemap: true,
    target: "esnext",
    minify: false,
  },
});
