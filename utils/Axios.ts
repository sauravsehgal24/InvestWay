import axios, { AxiosRequestConfig, Method } from "axios";

export async function _apiCall<T>(
    method: Method,
    url: string,
    headers?,
    data?
): Promise<T> {
    const _config: AxiosRequestConfig = {
        method: method,
        url: url,
        headers: { ...headers },
        data: { ...data },
    };
    return axios(_config)
        .then((res) => {
            return (res as unknown) as T;
        })
        .catch((err) => {
            console.log(`\n\n----------ERROR IN AXIOS CALL----------\n\n`);
            console.log(err);
            return (err as unknown) as T;
        });
}

export async function _post<T>(url, headers?, body?): Promise<T> {
    return axios
        .post(url, body, {
            headers: {
                Accept: `*/*`,
                // "Content-Length": 0,
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            return (res.data as unknown) as T;
        })
        .catch((err) => {
            console.log(err);
            console.log("----------------------");
            return (err as unknown) as T;
        });
}

export async function _get<T>(url, headers?, body?): Promise<T> {
    return axios
        .get(url)
        .then((res) => {
            return (res.data as unknown) as T;
        })
        .catch((err) => {
            console.log("----------------------");
            return (err as unknown) as T;
        });
}
