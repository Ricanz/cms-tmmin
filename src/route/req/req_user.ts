export const BASE_API = "https://insurance-api-dev-336781009919.asia-southeast2.run.app/api/v1";
// export const BASE_API = "https://insurance-api-prod-336781009919.asia-southeast2.run.app/api/v1";
// export const BASE_API = "http://localhost:3001/api/v1";


export interface FeatureParams {
    feature: string;
}

export interface ResponseApi {
    code: number,
    message: string,
    status: boolean,
    data: any
}

export interface GetUserQueryParams {
    limit: number,
    page: number,
    sort: string,
    sort_by: string,
    filter: string,
    type: string
}

export interface UpdateUserParams {
    name: string,
    username: string,
    password: string,
    role: string,
    is_active: boolean,
    id: string,
    profile_image: string
}

export interface ChangePasswordParams {
    old_password: string,
    new_password: string,
    confirm_password: string
}

export interface LoginParams {
    username: string;
    password: string;
}

export interface AddUserParams {
    username: string;
    password: string;
    role: string;
    name: string;
    is_active: boolean;
}

interface DeleteUserParams {
    id: string;
}

export async function getRequestWithParam(endpoint: string, token: string, params: any): Promise<ResponseApi> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify(params);
    const requestOptions: RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    // custom url
    endpoint = `${BASE_API}${endpoint}?`;
    const parameter: string[] = [];
    Object.keys(params).forEach((key: string) => {
        parameter.push(`${key}=${params[key]}`);
    });
    endpoint += parameter.join("&");

    try {
        const response = await fetch(endpoint, requestOptions);
        const result: ResponseApi = await response.json();
        return result;
    } catch (error) {
        throw { code: 0, message: error, status: "Failed", data: error };
    }
}

export async function getRequest(endpoint: string, token: string, params: any): Promise<ResponseApi> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify(params);
    const requestOptions: RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${BASE_API}${endpoint}`, requestOptions);
        const result: ResponseApi = await response.json();
        return result;
    } catch (error) {
        throw { code: 0, message: error, status: "Failed", data: error };
    }
}

export async function apiPutRequest(endpoint: string, token: string, params: any): Promise<ResponseApi> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(params);

    const requestOptions: RequestInit = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${BASE_API}${endpoint}`, requestOptions);
        const result: ResponseApi = await response.json();
        return result;
    } catch (error) {
        throw { code: 0, message: error, status: "Failed", data: error };
    }
}

export async function apiDeleteRequest(endpoint: string, token: string, params: any): Promise<ResponseApi> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(params);

    const requestOptions: RequestInit = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    // custom url
    endpoint = `${BASE_API}${endpoint}?`;
    const parameter: string[] = [];
    Object.keys(params).forEach((key: string) => {
        parameter.push(`${key}=${params[key]}`);
    });
    endpoint += parameter.join("&");

    try {
        const response = await fetch(endpoint, requestOptions);
        const result: ResponseApi = await response.json();
        return result;
    } catch (error) {
        throw { code: 0, message: error, status: "Failed", data: error };
    }
}

export async function apiRequest(endpoint: string, token: string, params: any): Promise<ResponseApi> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(params);
    console.log('raw: ', raw);

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${BASE_API}${endpoint}`, requestOptions);
        const result: ResponseApi = await response.json();
        console.log('result', result);

        return result;
    } catch (error) {
        throw { code: 0, message: error, status: "Failed", data: error };
    }
}

export async function apiRequestWithErroHandling(endpoint: string, token: string, params: any): Promise<ResponseApi> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(params);

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${BASE_API}${endpoint}`, requestOptions);
        const result: ResponseApi = await response.json();
        return result;
    } catch (error) {
        return { code: 0, message: error as string, status: false, data: [] };
    }
}

export async function apiRequestRaw(endpoint: string, token: string, params: any): Promise<any> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(params);

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const response = await fetch(`${BASE_API}${endpoint}`, requestOptions);

    // Jika respons tidak OK, kita akan menampilkan error.
    if (!response.ok) {
        throw new Error(`Fetch error: ${response.statusText}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv'; // Anda bisa mengganti 'data.csv' dengan nama file yang Anda inginkan.
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}


export async function apiRequestForm(endpoint: string, token: string, params: any): Promise<ResponseApi> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    // Create a new instance of FormData
    const formData = new FormData();

    // Append each key-value pair from params to the FormData instance
    for (const key in params) {
        formData.append(key, params[key]);
    }

    console.log('formData', formData);

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: formData, // Use FormData as the body
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${BASE_API}${endpoint}`, requestOptions);
        const result: ResponseApi = await response.json();
        return result;
    } catch (error) {
        // console.log("ERROR", error);
        throw { code: 0, message: error, status: "Failed", data: [] };
    }
}


export async function apiLogin(params: any): Promise<ResponseApi> {
    return apiRequest("/cms/user/login", "", params);
}

export async function apiGetAccountInfo(token: string): Promise<ResponseApi> {
    return await getRequest("/cms/user/account", token, {});
}

export async function apiAddUser(token: string, params: AddUserParams): Promise<ResponseApi> {
    return apiRequest("/cms/user/add", token, params);
}

export async function apiGetUsers(token: string, params: GetUserQueryParams): Promise<ResponseApi> {
    return apiRequest("/cms/user/get", token, params);
}

export async function apiGetVersion(token: string, params: FeatureParams): Promise<ResponseApi> {
    return apiRequest("/cms/feature/get?lang=id", token, params);
}

export async function apiDeleteUser(token: string, params: DeleteUserParams): Promise<ResponseApi> {
    return await apiRequest("/cms/user/delete", token, params);
}

export async function apiUpdateUser(token: string, params: UpdateUserParams): Promise<ResponseApi> {
    return await apiRequest("/cms/user/update", token, params);
}

// Your apiChangePassword is also already defined with ChangePasswordParams
export async function apiChangePassword(token: string, params: ChangePasswordParams): Promise<ResponseApi> {
    return await apiRequest("/cms/user/change_password", token, params);
}