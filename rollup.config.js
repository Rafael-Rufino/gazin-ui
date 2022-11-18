import typescript from "rollup-plugin-typescript2";
/* eslint-disable import/no-anonymous-default-export */
import del from "rollup-plugin-delete";
import pkg from "./package.json";

import { babel } from "@rollup/plugin-babel";

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: "src/components/index.ts",
    output: [
      {
        file: "dist/bundle.js",
        format: "esm",
        banner: "/* eslint-disable */",
        sourcemap: true,
      },
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "esm" },
    ],
    plugins: [
      resolve(),
      commonjs(),

      del({ targets: ["dist/*", "lib"] }),
      typescript(),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
      }),
      production && terser({ format: { comments: false } }),
    ],
  },
];
