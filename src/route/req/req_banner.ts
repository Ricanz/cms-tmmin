import { ResponseApi, apiDeleteRequest, apiPutRequest, apiRequest, getRequestWithParam } from "./req_user";

export async function apiGetBanner(params: any): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await getRequestWithParam('/cms/feature/get', accessToken, { "feature": "banner", ...params });
}

export async function apiAddBanner(params: any): Promise<ResponseApi> {
    const token = localStorage.getItem('accessToken') ?? "";
    return await apiRequest('/cms/feature/add', token, {
        ...params,
        "feature": "banner"
    });
}

export async function apiUpdateBanner(params: any): Promise<ResponseApi> {
    const token = localStorage.getItem('accessToken') ?? "";
    const body = {
        ...params,
        "feature": "banner"
    }
    return await apiPutRequest('/cms/feature/update', token, body);
}

export async function apiDeleteBanner(id: string): Promise<ResponseApi> {
    const token = localStorage.getItem('accessToken') ?? "";
    return await apiDeleteRequest(`/cms/feature/${id}/delete`, token, {
        "feature": "banner"
    });
} 