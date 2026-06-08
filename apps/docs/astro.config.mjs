import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [react(), mdx()],
  vite: {
    plugins: [tailwindcss()],
    // MUI's ESM build uses directory imports (e.g. "@mui/material/utils")
    // that Node's native ESM resolver rejects during SSR. Letting Vite bundle
    // these packages for SSR resolves the directory imports correctly.
    ssr: {
      noExternal: ["@mui/material", "@mui/icons-material", "@mui/system"],
    },
  },
});
