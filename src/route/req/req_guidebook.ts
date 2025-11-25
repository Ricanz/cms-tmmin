import { ResponseApi, apiPutRequest, apiRequest, getRequestWithParam } from "./req_user";

export async function apiGetGuideBook(): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await getRequestWithParam('/cms/feature/get', accessToken, { "feature": "guidebook" });
}
export async function apiUpdateGuideBook(params: any): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiPutRequest('/cms/feature/update', accessToken, { "feature": "guidebook", ...params });
}
