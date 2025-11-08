const createServerApiUrl = (
    path,
    params = {},
    apiUrl = process.env.NEXT_PUBLIC_API_URL,
) => {
    const url = new URL(path || '', apiUrl);

    Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null ) {
            url.searchParams.set(k, v)
        }
    });
    
    return url.toString();
}

export default createServerApiUrl;
