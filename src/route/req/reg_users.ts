import { ResponseApi, apiDeleteRequest, apiRequest, getRequestWithParam } from "./req_user";

export async function apiGetUsers(params: any): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await getRequestWithParam('/cms/user', accessToken, params);
}

export async function apiAddUsers(params: any): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiRequest('/cms/user/add/', accessToken, {
        ...params,
        userProfileImage: "-",
        userInsuranceId: 1,
    });
}

export async function apiUpdateUsers(params: any): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiRequest('/cms/user/update', accessToken, params);
}

export async function apiDeleteUsers(id: string): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiDeleteRequest('/cms/user/delete/' + id, accessToken, { id });
}

