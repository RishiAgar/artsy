import createServerApiUrl from "./createServerApiUrl";

const serverGet = async ({
    path,
    params = {},
    options = {},
} = {}) => {
    const {
        headers = {},
        cache,
        next,
    } = options || {};

    const res = await fetch(
        createServerApiUrl(path, params),
        {
            method: "GET",
            headers: {
                ...headers,
            },
            cache: cache ?? "force-cache",
            next: next ?? { revalidate: 300 }
        }
    );

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Upstream ${res.status}: ${text || res.statusText}`);
    }

    return res.json();
}

export default serverGet;
