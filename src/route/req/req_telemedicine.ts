import { ResponseApi, apiRequest, getRequestWithParam } from "./req_user";

export async function apiGetTelemedicine(token: string, params: any): Promise<ResponseApi> {
    return await getRequestWithParam('/cms/feature/get', token, {
        ...params,
        "feature": "telemedicine",
        "lang": "id"
    });
}

export async function apiAddTelemedicine(params: any): Promise<ResponseApi> {
    const token = localStorage.getItem('accessToken') ?? "";
    return await apiRequest('/cms/feature/add?lang=id', token, {
        ...params,
        "feature": "telemedicine"
    });
}

export async function apiUpdateTelemedicine(params: any): Promise<ResponseApi> {
    const token = localStorage.getItem('accessToken') ?? "";
    return await apiRequest('/cms/feature/update?lang=id', token, {
        ...params,
        "feature": "telemedicine"
    });
}

export async function apiDeleteTelemedicine(id: string): Promise<ResponseApi> {
    const token = localStorage.getItem('accessToken') ?? "";
    return await apiRequest('/cms/feature/delete?lang=id', token, {
        id,
        "feature": "telemedicine"
    });
} 