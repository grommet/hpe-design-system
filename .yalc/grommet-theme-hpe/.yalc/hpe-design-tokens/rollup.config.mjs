import json from "@rollup/plugin-json";
import dts from "rollup-plugin-dts";

const config = [
  {
    input: ["index.mjs"],
    output: {
      dir: "dist",
      format: "cjs",
    },
    plugins: [json()],
  },
  {
    input: "index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
];
export default config;
