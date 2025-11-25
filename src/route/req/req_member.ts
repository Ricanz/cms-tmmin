import { ResponseApi, apiDeleteRequest, apiPutRequest, apiRequest, apiRequestRaw, getRequest, getRequestWithParam } from "./req_user";

export interface GetMembersParams {
    limit: number,
    page: number,
    sort: string,
    sort_by: string,
    filter: string,
    // filter_by: string,
    type: string
}

export interface DeleteMemberParams {
    id: string
}

export interface UpdateMemberParams {
    id: string,
    name: string,
    email: string,
    phone: string,
    cardno: string,
    dateofbirth: string,
    firebase_token: string,
    activation_code: string,
    profile_image: string,
    is_active: boolean,
    deleted_at: null | string,
    deleted_reason: null | string,
    data_member: any, // Consider replacing 'any' with a more specific type
    created_at: string,
    updated_at: string,
    status: string
}

/**
 * 
{
    "limit": 10,
    "page": 1,
    "sort": "DESC",
    "sort_by" : "created_at",
    "filter_by" : "name", // "" | "name" | "cardno" | "email" | "created_at" | "dateofbirth"
    "filter": "Iryanto", // search by name,email,cardno,"2016-01-25 - 2020-05-29" = created_at, 1990-01-25 = dateofbirth
    "type": "all" // active | inactive | all
}
 */
export async function apiGetMembers(token: string, params: GetMembersParams): Promise<ResponseApi> {
    return await getRequestWithParam("/cms/member", token, params);
}

export async function apiDeleteMember(token: string, id: String): Promise<ResponseApi> {
    return await apiDeleteRequest(`/cms/member/${id}/delete`, token, { id });
}

export async function apiUpdateMember(params: UpdateMemberParams): Promise<ResponseApi> {
    const accessToken = localStorage.getItem("accessToken") ?? "";
    return await apiPutRequest("/cms/member/update", accessToken, params);
}

export async function exportMember(): Promise<ResponseApi> {
    const accessToken = localStorage.getItem("accessToken") ?? "";
    return await apiRequestRaw("/cms/member/export", accessToken, {});
}