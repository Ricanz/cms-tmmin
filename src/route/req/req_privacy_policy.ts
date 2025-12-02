import { ResponseApi, apiPutRequest, getRequestWithParam } from "./req_user";

export async function apiGetPrivacyPolicy(): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await getRequestWithParam('/cms/feature/get', accessToken, { "feature": "privacyPolicy", "lang": "id" });
}

export async function apiUpdatePrivacyPolicy(ppID: string, ppContent: string): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiPutRequest('/cms/feature/update', accessToken, { "feature": "privacyPolicy", ppID, ppContent });
}
