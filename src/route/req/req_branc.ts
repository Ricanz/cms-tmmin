import { ResponseApi, apiRequest } from "./req_user";

export async function getBranch(): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiRequest('/cms/feature/get?lang=id', accessToken, { "feature": "branch_office" });
}

/**
 * 
{
    "feature": "branch_office",
    "fax": "(031) 99534823",
    "city": "BOGOR",
    "email": "email@mail.com",
    "phone": "(021) 2500890, (021) 123456",
    "address": "Mayapada Tower II, 19th Floor - Jl. Jendral Sudirman Kav. 27 - Jakarta 12920 Indonesia"
}
 */
export async function addBranch(params: any): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiRequest('/cms/feature/add?lang=id', accessToken, { "feature": "branch_office", ...params });
}

/**
 * 
{
    "feature" : "branch_office",
    "fax": "",
    "city": "BOGOR",
    "email": "",
    "phone": "(021) 2500890",
    "address": "Mayapada Tower II, 19th Floor - Jl. Jendral Sudirman Kav. 27 - Jakarta 12920 Indonesia",
    "id": "eIhxJkRLrCRr"
}
 */
export async function updateBranch(params: any): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiRequest('/cms/feature/update?lang=id', accessToken, { "feature": "branch_office", ...params });
}

export async function deleteBranch(id: String): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiRequest('/cms/feature/delete?lang=id', accessToken, { "feature": "branch_office", id });
}