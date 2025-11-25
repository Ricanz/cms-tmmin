import { ResponseApi, apiRequest } from "./req_user";

export async function apiGetTelemedicine(params: any): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiRequest('/cms/feature/get?lang=id', accessToken, { "feature": "telemedicine", ...params });
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