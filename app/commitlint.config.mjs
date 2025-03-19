const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [2, "always", ["app", "migration", "supabase", "shared"]],
  },
};

export default config;
