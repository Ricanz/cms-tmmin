import { ResponseApi, apiDeleteRequest, apiPutRequest, apiRequest, apiRequestRaw, getRequest, getRequestWithParam } from "./req_user";

export interface GetLogParams {
    limit: number,
    page: number,
    filter: string,
}

export async function apiGetLogs(token: string, params: GetLogParams): Promise<ResponseApi> {
    return await getRequestWithParam("/cms/log/get", token, params);
}