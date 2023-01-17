import { urls } from "../../config/urlConfig";
import { HTTP } from "../core/http.service";

export const generateSampleBackground = async (campaignId, url) => {
  console.log(campaignId, url, "campaignId, url");
  const sampleUrl = urls.generateBackgroundVideoSample;
  const body = {
    campaignId: `${campaignId}`,
    url,
  };
  const res = await HTTP.post(sampleUrl, body);
  return res.data;
};

export const getSampleBackground = async (campaignId) => {
  console.log(campaignId, "campaignIdcampaignId");
  const sample = `${urls.getBackgroundSample}${campaignId}`;
  const res = await HTTP.get(sample);
  console.log(res, "response");
  return res.data;
};
