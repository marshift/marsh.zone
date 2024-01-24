import getRSS, { pagesGlobToRssItems } from "@astrojs/rss";

export const GET = async () => await getRSS({
    title: "the swamp",
    description: "excerpts of marsh's mind, free for you to read!",
    site: new URL("blog/", import.meta.env.SITE).href,
    // TODO This breaks in the type definitions... but works?
    // @ts-expect-error
    items: await pagesGlobToRssItems(import.meta.glob("./blog/**/*.{md,mdx}")),
});
