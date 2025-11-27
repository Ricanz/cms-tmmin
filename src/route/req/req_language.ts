import { ResponseApi, apiDeleteRequest, apiPutRequest, apiRequest, getRequestWithParam } from "./req_user";

interface UpdateFeatureParams {
    id: string;
    key: string;
    value: {
        en: string;
        id: string;
    };
}

interface AddFeatureParams {
    key: string;
    value: {
        en: string;
        id: string;
    };
}

interface DeleteFeatureParams {
    id: string;
}

export async function apiGetLanguage(token: string, params: any): Promise<ResponseApi> {
    return await getRequestWithParam('/cms/feature/get', token, {
        ...params,
        "feature": "language"
    });
}

export async function apiAddLanguage(token: string, params: any): Promise<ResponseApi> {
    console.log(params);
    
    return await apiRequest('/cms/feature/add', token, {
        ...params,
        "feature": "language"
    });
}

export async function apiUpdateLanguage(token: string, params: any): Promise<ResponseApi> {
    return await apiPutRequest('/cms/feature/update', token, {
        ...params,
        "feature": "language"
    });
}

export async function apiDeleteLanguage(token: string, params: any): Promise<ResponseApi> {
    return await apiDeleteRequest(`/cms/feature/${params.languageID}/delete`, token, {
        ...params,
        "feature": "language"
    });
}  