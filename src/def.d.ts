interface Route {
    name: string;
    path: string;
    image?: string;
}

interface Post {
    title: string;
    description: string;
    pubDate: string;
    tags?: string[];
}
