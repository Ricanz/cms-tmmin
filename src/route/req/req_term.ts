import { ResponseApi, apiPutRequest, apiRequest, getRequestWithParam } from "./req_user";

export async function apiGetTerm(): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await getRequestWithParam('/cms/feature/get', accessToken, { "feature": "term" });
}

export async function apiUpdateTerm(id: string, content: string): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiPutRequest('/cms/feature/update', accessToken, { "feature": "term", termID: id, termContent: content });
}