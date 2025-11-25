import { ResponseApi, apiPutRequest, getRequestWithParam } from "./req_user";

export async function apiGetPdp(): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await getRequestWithParam('/cms/feature/get', accessToken, { "feature": "pdp", "lang": "id" });
}

export async function apiUpdatePdp(pdpID: string, pdpContent: string): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiPutRequest('/cms/feature/update', accessToken, { "feature": "pdp", pdpID, pdpContent });
}
