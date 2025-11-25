import { ResponseApi, apiPutRequest, apiRequest, getRequestWithParam } from "./req_user";

export async function apiGetAbout(): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await getRequestWithParam('/cms/feature/get', accessToken, { "feature": "about", "lang": "id" });
}

export async function apiUpdateAbout(aboutID: string, aboutContent: string): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiPutRequest('/cms/feature/update', accessToken, { "feature": "about", aboutID, aboutContent });
}
