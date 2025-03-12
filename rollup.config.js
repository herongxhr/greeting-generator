import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: false,
    },
    {
      file: "dist/index.mjs",
      format: "es",
      sourcemap: false,
    },
  ],
  plugins: [typescript()],
};
