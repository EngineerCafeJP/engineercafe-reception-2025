import { relative } from "path";

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => relative(process.cwd(), f))
    .join(" --file ")}`;

const lintStagedConfig = {
  "*.{js,jsx,ts,tsx,mjs}": [buildEslintCommand],
};

export default lintStagedConfig;
