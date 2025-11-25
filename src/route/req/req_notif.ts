import { ResponseApi, apiRequestForm, apiRequestRaw } from "./req_user";

export async function sendNotif(sendby: String, params: any): Promise<ResponseApi> {
    const token = localStorage.getItem('accessToken') ?? "";
    return await apiRequestRaw(`cms/notification/sendpush?sendby=${sendby}&lang=id`, token, params);
}

export async function samplePostMan(sendby: String, params: any) {
    const token = localStorage.getItem('accessToken') ?? "";
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var formdata = new FormData();
    for (const key in params) {
        formdata.append(key, params[key]);
    }

    var requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`https://mobileapps.admedika.co.id/jasindo/cms/notification/sendpush?sendby=${sendby}&lang=id`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

