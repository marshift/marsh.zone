import type { APIRoute } from "astro";
import rss, { pagesGlobToRssItems } from "@astrojs/rss";

export const GET: APIRoute = async (context) => rss({
    title: "the swamp",
    description: "marsh's blog - excerpts of my mind, to be read at your leisure.",
    site: context.site + "blog",
    stylesheet: "/rss/styles.xsl",
    // @ts-expect-error oh god
    items: await pagesGlobToRssItems(import.meta.glob("./**/*.{md,mdx}")),
});
