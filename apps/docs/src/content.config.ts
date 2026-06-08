import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const availability = z.object({
  android: z.boolean().default(false),
  ios: z.boolean().default(false),
  web: z.boolean().default(false),
});

const components = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/components" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    mode: z.enum(["brand", "product"]),
    status: z.enum(["draft", "ready"]).default("draft"),
    availability: availability.default({ web: true }),
  }),
});

const foundations = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/foundations" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
  }),
});

export const collections = { components, foundations };
