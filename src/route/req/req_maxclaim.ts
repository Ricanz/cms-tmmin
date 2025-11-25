import { ResponseApi, apiRequest } from "./req_user";

export async function apiGetMaxClaim(): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiRequest('/cms/feature/get?lang=id', accessToken, { "feature": "max_claim" });
}

export async function apiUpdateMaxClaim(id: string, max_claim: string): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiRequest('/cms/feature/update?lang=id', accessToken, { "feature": "max_claim", id, max_claim });
}