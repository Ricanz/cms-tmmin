import { ResponseApi, apiRequest } from "./req_user";

/**
 {
    "feature": "polisbook",
    "limit": 10,
    "page": 1,
    "sort": "DESC",
    "sort_by": "created_at",
    "filter": "" // search by polis_number ex "SOMPOTES2019"
}
*/
export async function apiGetPanduan(params: any): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiRequest('/cms/feature/get?lang=id', accessToken, { "feature": "polisbook", ...params });
}


/**
 {
    "feature": "polisbook",
    "polis_number": "SOMPOTES2019",
    "polis_filename" : "bukupolis-150719115542.pdf",
    "polis_file": "https://mobileassets.admedika.co.id/sompo/app/bukupolis-150719115542.pdf"
}
*/
export async function apiAddPanduan(params: any): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiRequest('/cms/feature/add?lang=id', accessToken, { "feature": "polisbook", ...params });
}

/**
{
    "feature": "polisbook",
    "polis_file": "https://mobileassets.admedika.co.id/sompo/app/bukupolis-150719115542.pdf",
    "polis_number": "SOMPOTES2019",
    "polis_filename": "bukupolis-ganti.pdf", // take from filename from upload or galery
    "id": "tnYXuwbhUeWd"
}
*/
export async function apiUpdatePanduan(params: any): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiRequest('/cms/feature/update?lang=id', accessToken, { "feature": "polisbook", ...params });
}

/**
{
    "feature": "polisbook",
    "id": "tnYXuwbhUeWd"
}
*/
export async function apiDeletePanduan(id: string): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiRequest('/cms/feature/delete?lang=id', accessToken, { "feature": "polisbook", id });
}