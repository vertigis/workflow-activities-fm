import { FMRequestError } from "./FMRequestError";
import { FMService } from "./FMService";

type QueryString = Record<string, string | number | boolean | null | undefined>;

export async function get<T = any>(
    service: FMService,
    path: string,
    query?: QueryString,
    headers?: Record<string, any>
): Promise<T> {
    return httpRequest<T>(service, "GET", path, query, undefined, headers);
}

export async function post<T = any>(
    service: FMService,
    path: string,
    query?: QueryString,
    body?: Record<string, any>,
    headers?: Record<string, any>
): Promise<T> {
    return httpRequest<T>(service, "POST", path, query, body, headers);
}

export function put<T = any>(
    service: FMService,
    path: string,
    query?: QueryString,
    body?: Record<string, any>,
    headers?: Record<string, any>
): Promise<T> {
    return httpRequest<T>(service, "PUT", path, query, body, headers);
}

export function patch<T = any>(
    service: FMService,
    path: string,
    query?: QueryString,
    body?: Record<string, any>,
    headers?: Record<string, any>
): Promise<T> {
    return httpRequest<T>(service, "PATCH", path, query, body, headers);
}

export async function httpDelete<T = any>(
    service: FMService,
    path: string,
    query?: QueryString,
    body?: Record<string, any>,
    headers?: Record<string, any>
): Promise<T> {
    return httpRequest<T>(service, "DELETE", path, query, body, headers);
}

export async function httpRequest<T = any>(
    service: FMService,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    path: string,
    query?: QueryString,
    body?: Record<string, any>,
    headers?: Record<string, any>
): Promise<T> {
    if (!service.url) {
        throw new Error("url is required");
    }

    const qs = objectToQueryString(query);
    const url = `${service.url}/${path}${qs ? "?" + qs : ""}`;
    const response = await fetch(url, {
        method,
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...headers,
        },
        body: JSON.stringify(body),
    });

    await checkResponse(response);

    if (response.status === 204) {
        // No content
        return {} as T;
    }

    return await response.json();
}

export async function checkResponse(
    response: Response,
    message?: string
): Promise<void> {
    if (!response.ok) {
        // Try to read the error body of the response
        let error: Record<string, any> | undefined;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            try {
                const responseJson = await response.json();
                error = responseJson?.error || responseJson;
            } catch {
                // Swallow errors reading the response so that we don't mask the original failure
            }
        }
        throw new FMRequestError(response.status, error, message);
    }
}

function objectToQueryString(
    data?: Record<string, string | number | boolean | null | undefined>
): string {
    if (!data) {
        return "";
    }
    return Object.keys(data)
        .map((k) => {
            const value = data[k];
            const valueToEncode =
                value === undefined || value === null ? "" : value;
            return `${encodeURIComponent(k)}=${encodeURIComponent(
                valueToEncode
            )}`;
        })
        .join("&");
}