import { HTTP } from "../core/http.service";
import { urls } from "../../config/urlConfig";

export const generateAudioRequest = async (variableMapping, campaignId) => {
    const url = `${urls.generateAudioRequest}/${campaignId}`
    const res =  await HTTP.post(url, {variableMapping})
    return res.data;
}

export const getStatusAndUrlOfAudioRequest = async (audioRequestId) => {
    const url = `${urls.getAudioRequestUrl}/${audioRequestId}`;
    const res = await HTTP.get(url)
    return res.data;
}