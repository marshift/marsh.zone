// https://docs.astro.build/en/core-concepts/layouts/#markdownmdx-layouts

export default (props: Record<string, any>) => new Proxy(props, { get: (target, prop: string) => target[prop] ?? target.frontmatter?.[prop] });
