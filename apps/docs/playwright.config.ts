import { defineConfig } from "@playwright/test";

const BREAKPOINTS = [320, 768, 1024, 1440];

export default defineConfig({
  testDir: "./tests",
  webServer: {
    command: "pnpm --filter @ucm/docs preview --port 4321",
    url: "http://localhost:4321",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  use: { baseURL: "http://localhost:4321" },
  projects: BREAKPOINTS.map((width) => ({
    name: `w${width}`,
    use: { viewport: { width, height: 900 } },
  })),
});
