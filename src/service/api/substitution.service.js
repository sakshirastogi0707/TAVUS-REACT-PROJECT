import { HTTP } from "../core/http.service";
import { urls } from "../../config/urlConfig";


export const getTranscript = async (campaignId) => {
  const url = `${urls.getTranscript}${campaignId}`;
  const res = await HTTP.get(url);
  return res.data;
};

export const getTemplate = async (campaignId) => {
  const url = `${urls.getTemplate}${campaignId}`;
  const res = await HTTP.get(url);
  return res.data;
};

export const getVars = async (campaignId) => {
  if(campaignId && campaignId!=undefined){
    const url = `${urls.getSubs}${campaignId}`;
    const res = await HTTP.get(url);
    return res.data;
  } else {
    return undefined
  }
  
};

export const postNewVars = async (campaignId, body) => {
  const url = `${urls.postNewVars}${campaignId}`
  const res = await HTTP.post(url, body)
  return res.data;
};

export const deleteVar = async (campaignId, subId) => {
  const url = `${urls.deleteVars}${campaignId}/${subId}`
  const res = await HTTP.delete(url)
  return res.data;
};

export const revertTemplate = async (campaignId) => {
  const url = `${urls.revertTemplate}${campaignId}`
  const res = await HTTP.post(url)
  return res.data;
};


export const submitTemplate = async (campaignId, isEdit) => {
  const url = `${urls.submitTemplate}${campaignId}`
  const res = await HTTP.post(url,isEdit ? {isEdit:true} : '')
  return res.data
};

export const updateSubstitutionConfig = async (campaignId, subId, substitutionConfig) => {
  const url = `${urls.updateSubstitutionConfig}${campaignId}/${subId}`
  const res = await HTTP.patch(url, substitutionConfig)
  return res.data
};

export const getAllSubVariableNames = async (campaignId) => {
  const url = `${urls.getAllSubVariableNames}${campaignId}`
  const res = await HTTP.get(url)
  return res.data
};
