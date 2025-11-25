import { ResponseApi, apiRequest } from "./req_user";

export async function apiGetDinMenu(): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiRequest('/cms/feature/get?lang=id', accessToken, { "feature": "dynamic_menu" });
}

/**
 * ADD
 {
    "feature": "dynamic_menu",
    "icon": "https://mobileassets.admedika.co.id/sompo/app/dynamic-menu-icon-250723001755.jpg",
    "name": "Alodokter",
    "image": "https://mobileassets.admedika.co.id/sompo/app/dynamic-menu-img-250723003522.jpg",
    "content": "Alodokter",
    "is_active": true
}
 */
export async function apiAddDinMenu(params: any): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiRequest('/cms/feature/add?lang=id', accessToken, { "feature": "dynamic_menu", ...params });
}


/**
 * Update
 {
    "feature": "dynamic_menu",
    "icon": "https://mobileassets.admedika.co.id/sompo/app/dynamic-menu-icon-250723001755.jpg",
    "name": "Telemedicine",
    "image": "https://mobileassets.admedika.co.id/sompo/app/dynamic-menu-img-250723003522.jpg",
    "content": "update content",
    "is_active": true,
    "id": "g6lbaYSt6GAgJx-vUbdeP"
}
 */
export async function apiUpdateDinMenu(params: any): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiRequest('/cms/feature/update?lang=id', accessToken, { "feature": "dynamic_menu", ...params });
}

export async function apiDeleteDinMenu(id: string): Promise<ResponseApi> {
    const accessToken = localStorage.getItem('accessToken') ?? "";
    return await apiRequest('/cms/feature/delete?lang=id', accessToken, { "feature": "dynamic_menu", id });
}