// This interface MUST be like this for RSS to work with ease
interface IBlogPost {
    title: string;
    description: string;
    pubDate: string;
    tags?: string[];
}

interface IContact {
    service: string;
    username: string;
    href?: string;
}
