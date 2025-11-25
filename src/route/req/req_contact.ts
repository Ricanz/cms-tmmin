import { ResponseApi, apiRequest } from "./req_user";

export async function apiGetContact(): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiRequest('/cms/feature/get?lang=id', accessToken, { "feature": "contact" });
}


/**
 * 
{
    "feature": "contact",
    "id": "6E-4lRIZxnSQ1ByYlnG1G",
    "email": "customer@sompo.co.id",
    "phone": "(021) 2500890",
    "address": "Mayapada Tower II, 19th Floor - Jl. Jendral Sudirman Kav. 27 - Jakarta 12920 Indonesia",
    "website": "http://www.sompo.co.id",
    "contact_name": "PT Sompo Insurance Indonesia"
}
*/
export async function apiUpdateContact(params: any): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiRequest('/cms/feature/update?lang=id', accessToken, { "feature": "contact", ...params });
}