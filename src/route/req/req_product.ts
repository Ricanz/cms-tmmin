import { ResponseApi, apiRequest } from "./req_user";


export async function apiGetProduct(): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiRequest('/cms/feature/get?lang=id', accessToken, { "feature": "product_info" });
}

/**
{
    "feature": "product_info",
    "products": [],
    "product_desc": "desc id",
    "product_name": "Properti",
    "product_image": "https://mobileassets.admedika.co.id/sompo/app/productcat-210922180633.png",
    "product_desc_en": "desc en",
    "product_name_en": "Property"
}
*/
export async function apiAddProduct(params: any): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiRequest('/cms/feature/add?lang=id', accessToken, { "feature": "product_info", ...params });
}

/**
 {
    "feature": "product_info",
    "products": [],
    "product_desc": "desc id",
    "product_name": "Properti",
    "product_image": "https://mobileassets.admedika.co.id/sompo/app/productcat-210922180633.png",
    "product_desc_en": "desc en",
    "product_name_en": "Property",
    "id": "IL0bUpRk7nZ-Ad7_w4JwA"
}
*/
export async function apiUpdateProduct(params: any): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiRequest('/cms/feature/update?lang=id', accessToken, { "feature": "product_info", ...params });
}
export async function apiDeleteProduct(id: string): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiRequest('/cms/feature/delete?lang=id', accessToken, { "feature": "product_info", id });
}