import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import replace from "@rollup/plugin-replace";
import postcssUrl from "postcss-url";
import url from "@rollup/plugin-url";
import alias from "@rollup/plugin-alias";
import path from "path";

const packageJson = require("./package.json");

export default {
  input: "src/index.ts",
  external: ["@emotion/react", "@emotion/styled"],
  output: [
    {
      file: packageJson.module,
      format: "esm",
    },
  ],
  plugins: [
    peerDepsExternal(),
    alias({
      entries: [
        {
          find: "~",
          replacement: path.resolve(__dirname, "src"),
        },
      ],
    }),
    postcss({
      plugins: [postcssUrl({ url: "inline" })],
      extensions: [".scss", ".css"],
      minimize: true,
    }),
    url({ emitFiles: false }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
      preventAssignment: true,
    }),
    resolve({
      skip: ["react", "react-dom", "react-router-dom"],
    }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      exclude: ["**/*.stories.tsx", "**/*.test.tsx", "src/helpers"],
    }),
  ],
};
