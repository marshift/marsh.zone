import type { JSX } from "solid-js";
import { createResource, Show, For } from "solid-js";
import { formatDistanceToNow } from "date-fns";
import SimpleFMClient from "@solely/simple-fm";

const API_KEY = "64346b97f7b9f6b97f29b37e3e1c521c";
const getRecentTracks = (username: string) => new SimpleFMClient(API_KEY).user.getRecentTracks({ username, limit: 4 }).then((i) => i.tracks);

export default (): JSX.Element => {
    const [tracks] = createResource("marshift", getRecentTracks);

    return (
        <ul>
            <Show when={!tracks.loading} fallback={<li>loading last.fm data...</li>}>
                <For each={tracks()}>
                    {({ url, name, dateAdded }) => {
                        const timestamp = !dateAdded ? "now!" : formatDistanceToNow(dateAdded, { addSuffix: true });
                        return <li><a href={url}>{name}</a> - {timestamp}</li>
                    }}
                </For>
            </Show>
        </ul>
    )
};
