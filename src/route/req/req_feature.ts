import { FeatureParams, ResponseApi, apiRequest } from "./req_user";

interface UpdateFeatureParams extends FeatureParams {
  id: string;
  ios: {
    url: string;
    version_code: string;
    version_name: string;
  };
  android: {
    url: string;
    version_code: string;
    version_name: string;
  };
  force_update: boolean;
}

interface AddFeatureParams extends FeatureParams {
  ios: string;
  android: string;
  force_update: string;
}

interface DeleteFeatureParams extends FeatureParams {
  id: string;
}

export async function apiGetVersion(token: string): Promise<ResponseApi> {
  return await apiRequest('/cms/feature/get?lang=id', token, {
    "feature": "version"
  });
}

export async function apiUpdateVersion(token: string): Promise<ResponseApi> {
  return await apiRequest('/cms/feature/update?lang=id', token, {
    "feature": "version"
  });
}

export async function apiAddVersion(token: string): Promise<ResponseApi> {
  return await apiRequest('/cms/feature/add?lang=id', token, {
    "feature": "version"
  });
}

export async function apiDeleteVersion(token: string): Promise<ResponseApi> {
  return await apiRequest('/cms/feature/delete?lang=id', token, {
    "feature": "version"
  });
}