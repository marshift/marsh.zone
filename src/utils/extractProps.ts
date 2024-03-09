export default <T extends Record<string, any>>(props: T) => new Proxy(props, { get: (target, prop: string) => target[prop] ?? target.frontmatter?.[prop] });
