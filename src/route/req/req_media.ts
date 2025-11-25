import { BASE_API, ResponseApi, apiDeleteRequest, apiRequest, getRequestWithParam } from "./req_user";

export async function apiRequestUpload(file: any): Promise<ResponseApi> {
    const accessToken = localStorage.getItem("accessToken") ?? "";
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    var formdata = new FormData();
    formdata.append("file", file);

    try {
        const response = await fetch(`${BASE_API}/cms/feature/upload`, {
            method: 'POST',
            headers: myHeaders,
            body: formdata
        });
        const result: ResponseApi = await response.json();
        return result;
    } catch (error) {
        // console.log("ERROR", error);
        throw { code: 0, message: error, status: "Failed", data: [] };
    }
}

export async function apiGetMedia(params: any): Promise<ResponseApi> {
    const accessToken = localStorage.getItem("accessToken") ?? "";
    return await getRequestWithParam("/cms/feature/get", accessToken, params);
}

export async function apiDeleteMedia(id: String): Promise<ResponseApi> {
    const accessToken = localStorage.getItem("accessToken") ?? "";
    return await apiDeleteRequest(`/cms/feature/${id}/delete`, accessToken, {
        "feature": "media",
        id,
    });
}