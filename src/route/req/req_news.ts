import { ResponseApi, apiDeleteRequest, apiPutRequest, apiRequest, getRequestWithParam } from "./req_user";

export async function apiGetNews(token: string, params: any): Promise<ResponseApi> {
    return await getRequestWithParam('/cms/feature/get', token, { "feature": "news", ...params });
}

export async function apiGetNewsById(id: string): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await getRequestWithParam(`/cms/feature/${id}/detail`, accessToken, { "feature": "news", id });
}

export async function apiDeleteNewsById(id: string): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiDeleteRequest(`/cms/feature/${id}/delete`, accessToken, { "feature": "news", id });
}

export async function apiAddNews(token: string, params: any): Promise<ResponseApi> {
    return await apiRequest('/cms/feature/add?feature=news', token, { "feature": "news", ...params });
}

export async function apiUpdateNews(params: any): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiPutRequest('/cms/feature/update', accessToken, { "feature": "news", ...params });
}