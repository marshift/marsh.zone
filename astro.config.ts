import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import uno from "@unocss/astro";

export default defineConfig({
    site: "https://marsh.zone",
    integrations: [mdx(), uno()],
});
