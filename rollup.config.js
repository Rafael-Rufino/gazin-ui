import del from "rollup-plugin-delete";
import pkg from "./package.json";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/bundle.js",
        format: "esm",
        banner: "/* eslint-disable */",
      },
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "esm" },
    ],
    plugins: [
      resolve(),
      commonjs(),
      del({ targets: ["dist/*", "lib"] }),
      typescript(),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
  },
];
