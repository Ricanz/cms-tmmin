import { ResponseApi, apiDeleteRequest, apiPutRequest, apiRequest, getRequestWithParam } from "./req_user";

export async function apiFaqGet(token: string, params: any): Promise<ResponseApi> {
    return await getRequestWithParam('/cms/feature/get', token, {
        ...params,
        "feature": "faq",
        "lang": "id"
    });
}

export interface FAQItemUpdate {
    answer: string;
    category: string;
    question: string;
    id: string;
}

export async function apiFaqUpdate(params: any): Promise<ResponseApi> {
    const token = localStorage.getItem('accessToken') ?? "";
    return await apiPutRequest('/cms/feature/update?lang=id', token, {
        ...params,
        "feature": "faq"
    });
}

export interface FAQItemAdd {
    answer: string;
    category: string;
    question: string;
    id: string;
}

export async function apiFaqAdd(params: any): Promise<ResponseApi> {
    const token = localStorage.getItem('accessToken') ?? "";
    return await apiRequest('/cms/feature/add?lang=id', token, {
        ...params,
        "feature": "faq"
    });
}

export async function apiFaqDelete(id: string): Promise<ResponseApi> {
    const token = localStorage.getItem('accessToken') ?? "";
    return await apiDeleteRequest(`/cms/feature/${id}/delete?lang=id`, token, {
        id,
        "feature": "faq"
    });
}  