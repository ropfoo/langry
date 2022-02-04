import { useEffect, useState } from 'react';

export enum Method {
    GET = 'GET',
    POST = 'POST',
}

export function useFetch(url: string, method: Method) {
    const [data, setData] = useState();

    useEffect(() => {
        (async () => {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-type': 'application/json',
                },
            });
            const json = await response.json();
            setData(json);
        })();
    }, [method, url]);

    return { data };
}
