import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
    site: "https://marsh.zone",
    integrations: [mdx()],
    markdown: {
        shikiConfig: {
            theme: "catppuccin-macchiato"
        }
    },
    devToolbar: {
        enabled: false,
    },
});
