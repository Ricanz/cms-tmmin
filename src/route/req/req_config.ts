import { apiDeleteRequest, apiPutRequest, apiRequest, getRequestWithParam } from "./req_user";

export interface ParametersData {
    tagparamKeyName: string;
    tagparamKeyConfig: string;
}

export async function getParameters(params: any): Promise<any> {
    const token = localStorage.getItem('accessToken') ?? "";
    const data = await getRequestWithParam('/cms/config/get', token, {
        ...params,
        "config": "tagParam",
        "lang": "id"
    });
    return data;
}

export async function addParameter(data: any): Promise<boolean> {
    const token = localStorage.getItem('accessToken') ?? "";
    const result = await apiRequest('/cms/config/add', token, data);
    return result.status;
}

export async function updateParameter(data: any): Promise<boolean> {
    const token = localStorage.getItem('accessToken') ?? "";
    const result = await apiPutRequest('/cms/config/update', token, {
        ...data,
        "config": "tagParam",
    });
    return result.status;
}

export async function deleteParameter(id: any): Promise<boolean> {
    const token = localStorage.getItem('accessToken') ?? "";
    const result = await apiDeleteRequest(`/cms/config/${id}/delete`, token, {
        "config": "tagParam",
    });
    return result.status;
}


export interface SetupKeyData {
    tagtargetID: number;
    tagtargetName: string;
    tagtargetConfig: string;
    tagtargetCreatedAt: string;
}

export async function getSetupKeys(params: any): Promise<any> {
    const token = localStorage.getItem('accessToken') ?? "";
    const data = await getRequestWithParam('/cms/config/get', token, {
        ...params,
        "config": "tagTarget",
        "lang": "id"
    });
    return data;
}

export async function addSetupKey(data: any): Promise<boolean> {
    const token = localStorage.getItem('accessToken') ?? "";
    const result = await apiRequest('/cms/config/add', token, data);
    return result.status;
}

export async function updateSetupKey(data: any): Promise<boolean> {
    const token = localStorage.getItem('accessToken') ?? "";
    const result = await apiPutRequest('/cms/config/update', token, {
        ...data,
        "config": "tagTarget",
    });
    return result.status;
}

export async function deleteSetupKey(id: any): Promise<boolean> {
    const token = localStorage.getItem('accessToken') ?? "";
    const result = await apiDeleteRequest(`/cms/config/${id}/delete`, token, {
        "config": "tagTarget",
    });
    return result.status;
}


export interface ActionRuleData {
    tagActionID: number;
    tagActionName: string;
    tagActionData: string;
    tagActionDescription: string;
    tagActionValue: string;
    tagActionCreatedAt: string;
    tagActionEnable: boolean;
    tagActionVerbose: boolean;
    tagActionVerboseMessage: string;
}

export async function getActionRules(params: any): Promise<any> {
    const token = localStorage.getItem('accessToken') ?? "";
    const data = await getRequestWithParam('/cms/config/get', token, {
        ...params,
        "config": "tagAction",
        "lang": "id"
    });
    return data;
}

export async function addActionRule(data: any): Promise<boolean> {
    const token = localStorage.getItem('accessToken') ?? "";
    const result = await apiRequest('/cms/config/add', token, data);
    return result.status;
}

export async function updateActionRule(data: any): Promise<boolean> {
    const token = localStorage.getItem('accessToken') ?? "";
    const result = await apiPutRequest('/cms/config/update', token, {
        ...data,
        "config": "tagAction",
    });
    return result.status;
}

export async function deleteActionRule(id: any): Promise<boolean> {
    const token = localStorage.getItem('accessToken') ?? "";
    const result = await apiDeleteRequest(`/cms/config/${id}/delete`, token, {
        "config": "tagAction",
    });
    return result.status;
}

export interface RuleData {
    tagruleID: number;
    tagruleName: string;
    tagruleDescription: string;
}

export async function getRules(params: any): Promise<any> {
    const token = localStorage.getItem('accessToken') ?? "";
    const data = await getRequestWithParam('/cms/config/get', token, {
        ...params,
        "config": "tagRule",
        "lang": "id"
    });
    return data;
}

export async function addRule(data: any): Promise<boolean> {
    console.log(data);
    
    const token = localStorage.getItem('accessToken') ?? "";
    const result = await apiRequest('/cms/config/add', token, data);
    return result.status;
}

export async function updateRule(data: any): Promise<boolean> {
    const token = localStorage.getItem('accessToken') ?? "";
    const result = await apiPutRequest('/cms/config/update', token, {
        ...data,
        "config": "tagRule",
    });
    return result.status;
}

export async function deleteRule(id: any): Promise<boolean> {
    const token = localStorage.getItem('accessToken') ?? "";
    const result = await apiDeleteRequest(`/cms/config/${id}/delete`, token, {
        "config": "tagRule",
    });
    return result.status;
}


export interface ConditionRules {
    parameterName: string;
    type: string;
    value: string;
}
export interface ConditionData {
    name: string;
    description: string;
    config: ConditionRules[];
}

export async function addCondition(params: any): Promise<boolean> {
    const token = localStorage.getItem('accessToken') ?? "";
    const result = await apiRequest(`/cms/config/add`, token, params);
    return result.status;
}

export async function updateCondition(params: any): Promise<boolean> {
    const token = localStorage.getItem('accessToken') ?? "";
    const result = await apiPutRequest(`/cms/config/update`, token, params);
    return result.status;
}

export interface KeyInterfaceData {
    name: string;
    description: string;
}

export async function addAction(params: any): Promise<boolean> {
    const token = localStorage.getItem('accessToken') ?? "";
    const result = await apiRequest(`/cms/config/add`, token, params);
    return result.status;
}

export async function updateAction(params: any): Promise<boolean> {
    const token = localStorage.getItem('accessToken') ?? "";
    const result = await apiPutRequest(`/cms/config/update`, token, params);
    return result.status;
}