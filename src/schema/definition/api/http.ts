/**
 * @author WMXPY
 * @namespace Schema_Definition_API
 * @description HTTP
 */

export enum IMBRICATE_API_HTTP_METHOD {

    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",

    PATCH = "PATCH",
    OPTIONS = "OPTIONS",
    HEAD = "HEAD",
}

export type ImbricateAPIHttp = {

    readonly method: IMBRICATE_API_HTTP_METHOD;
}
