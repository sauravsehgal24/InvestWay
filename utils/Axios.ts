import axios from "axios";

export async function _post<T>(url, headers?, body?): Promise<T> {
    // const config: AxiosRequestConfig = {
    //     method: "post",
    //     url: url,
    //     headers: {
    //         Accept: `*/*`,
    //         "Content-Length": 0,
    //         "Content-Type": "application/json",
    //         Connection: "keep-alive",
    //         "User-Agent": "PostmanRuntime/7.26.8",
    //     },
    // };
    return axios
        .post(url, null, {
            headers: {
                Accept: `*/*`,
                "Content-Length": 0,
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            return (res.data as unknown) as T;
        })
        .catch((err) => {
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
