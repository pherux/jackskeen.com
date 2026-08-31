"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { dataset, previewOrigin, projectId } from "./lib/env";
import { resolve } from "./presentation/resolve";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

const singletonTypes = new Set(["siteSettings"]);

export default defineConfig({
  name: "default",
  title: "JackSkeen.com",
  projectId,
  dataset,
  basePath: "/studio",
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (actions, context) =>
      singletonTypes.has(context.schemaType)
        ? actions.filter(({ action }) => action !== "duplicate")
        : actions,
  },
  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve,
      previewUrl: {
        origin: previewOrigin,
        previewMode: { enable: "/api/draft-mode/enable" },
      },
    }),
    visionTool({ defaultApiVersion: "2026-08-31" }),
  ],
});
