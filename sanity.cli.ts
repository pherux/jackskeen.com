import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId:
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "missing-project-id",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
  typegen: {
    path: "./sanity/queries/**/*.ts",
    schema: "./sanity/schema.json",
    generates: "./src/types/sanity.generated.ts",
    overloadClientMethods: true,
  },
});
