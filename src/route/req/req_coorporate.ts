import { ResponseApi, apiRequest } from "./req_user";


export async function apiGetCoorporateProfile(): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiRequest('/cms/feature/get?lang=id', accessToken, { "feature": "corporate_profile" });
}

export async function apiUpdateCoorporateProfile(params: any): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiRequest('/cms/feature/update?lang=id', accessToken, { "feature": "corporate_profile", ...params });
}