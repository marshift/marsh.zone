import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
    site: "https://marsh.zone/",
    integrations: [solid(), mdx()],
    markdown: {
        shikiConfig: {
            theme: "catppuccin-macchiato",
        },
    },
    devToolbar: {
        enabled: false,
    },
});
