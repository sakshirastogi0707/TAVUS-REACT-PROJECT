import { baseUrl, urls } from "../../config/urlConfig";
import { HTTP, HTTP2 } from "../core/http.service";
import {
  StorageKeys,
  StorageService,
  TempStorage,
} from "../core/storage.service";
import { InputWithTagsHelper } from "../../components/v2/landing/components/input-with-tags/input-with-tags-helper";

class CampaignService {
  static async getCampaigns(page) {
    if (TempStorage.templatesCached) {
      return TempStorage.templatesCached;
    }
    const url = urls.getCampaigns;
    const result = await HTTP.get(url);
    if (result.data) {
      TempStorage.templatesCached = result.data.data;
      return result.data.data;
    }
    return undefined;
  }

  static async getCampaignsV2(page,is_active=0) {
    if (TempStorage.templatesCached) {
      return TempStorage.templatesCached;
    }
    var url = urls.getCampaignListV2;
    if(is_active == 1){
      url += '?is_active=1'
    }
    const result = await HTTP.get(url);
    if (result.data) {
      return result.data.data || [];
    }
    return undefined;
  }

  static async getCampaignById(campaignId, templateId) {
    const index = `${campaignId}-${templateId}`;
    if (TempStorage.templateCached[index]) {
      return TempStorage.templateCached[index];
    }
    const url = urls.getCampaignById2
      .replace("{1}", campaignId)
      .replace("{2}", templateId);
    const result = await HTTP.get(url);
    if (result.data) {
      TempStorage.templateCached[index] = result.data.data;
      return result.data.data;
    }
    return undefined;
  }

  static async saveCampaign(data,campaignId) {
    const url = urls.saveCampaign;
    data.id = campaignId;
    const index = `${data.id}-${data.template_id}`;
    const result = await HTTP.post(url, data);
    if (result.data) {
      TempStorage.templateCached[index] = null;
      return result.data.data.landing_json;
    }
    return undefined;
  }

  static async uploadImage(data) {
    const url = urls.uploadLogo;
    const result = await HTTP.post(url, data);
    if (result.data) {
      return result.data.data;
    }
    return undefined;
  }

  static async micAvail(data) {
    const url = urls.micAvail;
    const result = await HTTP.put(url, data);
    if (result.data) {
      return result.data;
    }
    return undefined;
  }

  static getFormattedVariables(variables) {
    if (variables && variables.length > 0) {
      return variables.map((v, index) => {
        const { color, colorIndex } = InputWithTagsHelper.colors(index);
        return {
          value: `@${v}`,
          name: v,
          color,
          colorIndex,
        };
      });
    }

    return [];
  }

  static async getVariables(campaignId) {
    // console.log('++++++++ getVariables api called +++++++')
    const url = urls.getVariables + campaignId;
    try {
      const result = await HTTP.get(url);
      if (result.data) {
        const vars = Object.keys(result.data.data.variables);
        return CampaignService.getFormattedVariables(vars);
      }
      return undefined;
    } catch (e) {
      return ["xxxxxxxxxx"];
    }
  }

  static async getVariablesWithIds(campaignId) {
    const url = urls.getVariables + campaignId;
    try {
      const result = await HTTP.get(url);
      if (result.data) {
        return result.data.data.variables;
      }
      return undefined;
    } catch (e) {
      return undefined;
    }
  }

  static async addVariableReturnIds(campaignId, body) {
    const url = urls.getVariables + campaignId;
    try {
      const result = await HTTP.post(url, body);
      if (result.data) {
        return result.data.data.variables;
      }
      return undefined;
    } catch (e) {
      return ["temp_var"];
    }
  }

  static async addVariable(campaignId, body) {
    const url = urls.getVariables + campaignId;
    try {
      const result = await HTTP.post(url, body);
      if (result.data) {
        const vars = Object.keys(result.data.data.variables);
        return CampaignService.getFormattedVariables(vars);
      }
      return undefined;
    } catch (e) {
      return ["temp_var"];
    }
  }

  static async removeVariable(campaignId, body) {
    return new Promise(async (resolve, reject) => {
      const url = urls.removeVariable.replace("{1}", campaignId);
      try {
        const result = await HTTP.post(url, body);
        if (result.data && result.data.status) {
          return resolve(Object.keys(result.data.data.variables));
        }
        return resolve(undefined);
      } catch (e) {
        return resolve(null);
      }
    });
  }

  static async removeVariableWithIds(campaignId, body) {
    return new Promise(async (resolve, reject) => {
      const url = urls.removeVariable.replace("{1}", campaignId);
      try {
        const result = await HTTP.post(url, body);
        if (result.data && result.data.status) {
          return resolve(result.data.data.variables);
        }
        return resolve(undefined);
      } catch (e) {
        return resolve(null);
      }
    });
  }

  static async getScriptRecording(campaignId) {
    const url = `${urls.getScriptVideo}${campaignId}`;
    try {
      const result = await HTTP.get(url);
      if (result.data) {
        return result.data;
      }
      return undefined;
    } catch (e) {
      return;
    }
  }

  static async getSingleCampaign(campaignId) {
    const url = urls.getCampaignById + "get/" + campaignId;
    try {
      const result = await HTTP.get(url);
      if (result.data) {
        return result.data.data;
      }
      return undefined;
    } catch (e) {
      return;
    }
  }

  static async getMediaTemplate(campaignId) {
    const url = baseUrl + `campaigns/${campaignId}/mediaTemplate`;
    try {
      const result = await HTTP.get(url);
      if (result.data) {
        return result.data.data;
      }
      return undefined;
    } catch (e) {
      return;
    }
  }

  static async getAvatarVideoDetails(campaignId) {
    const url = baseUrl + `campaigns/${campaignId}/avatarVideo`;
    try {
      const result = await HTTP.get(url);
      if (result.data) {
        return result.data.data;
      }
      return undefined;
    } catch (e) {
      return;
    }
  }

  static async deleteBackgroundVideoData(campaignId) {
    const url = baseUrl + `campaigns/${campaignId}/backgroundVideo`;
    try {
      const result = await HTTP.delete(url);
      if (result.data) {
        return result.data.data;
      }
      return undefined;
    } catch (e) {
      console.log(e);
      return;
    }
  }

  static async myVoices() {
    const url = urls.myVoice;
    try {
      const result = await HTTP.get(url);
      if (result.data) {
        return result.data.data;
      }
      return undefined;
    } catch (e) {
      return;
    }
  }
  static async listUsersCampaign(
    campaign_id = false,
    search = false,
    assign = 1
  ) {
    var url = baseUrl + `users/campaigns`;
    try {
      if (campaign_id) {
        url += `?campaign_id=${campaign_id}&isAssign=${assign}`;
      }

      if (search) {
        
        url += `&search=${encodeURIComponent(search)}`;
      }
      const result = await HTTP.get(url);
      if (result.data) {
        return result.data.data;
      }
      return undefined;
    } catch (e) {
      console.log(e);
      return;
    }
  }

  static async assignUsersCampaign(body) {
    const url = baseUrl + `campaigns/share`;
    try {
      const result = await HTTP.post(url, body);

      if (result.data) {
        return result.data;
      }
      return undefined;
    } catch (e) {
      console.log(e);
      return;
    }
  }
  static async myVoices() {
    const url = urls.myVoice
    try {
        const result = await HTTP.get(url);
        if (result.data) {
            return result.data.data
        }
        return undefined;
    } catch (e) {
        return
    }
}
static async listUsersCampaign(campaign_id=false,search=false, assign=1) {
    var url = baseUrl + `users/campaigns`;
    try {
        if(campaign_id){
            url += `?campaign_id=${campaign_id}&isAssign=${assign}`
        }
        if(assign==0){
            url += `&search=${encodeURIComponent(search)}`
        }  
      const result = await HTTP.get(url);
      if (result.data) {
        return result.data.data;
      }
      return undefined;
    } catch (e) {
      console.log(e);
      return;
    }
  }
  static async unassignUsersCampaign(campaignId, userId) {
    const url = baseUrl + `campaigns/unassign/${campaignId}/${userId}`;
    try {
      const result = await HTTP.delete(url);
      if (result.data) {
        return result.data;
      }
      return undefined;
    } catch (e) {
      console.log(e);
      return;
    }
  }

  static async setPrimaryVariable(campaignId, body) {
    // console.log('++++++++ getVariables api called +++++++')
    const url = baseUrl + `variables/${campaignId}/set-primary-identifier`;
    try {
      const result = await HTTP.post(url, body);
      if (result.data) {
        const vars = Object.keys(result.data.data.variables);
        return CampaignService.getFormattedVariables(vars);
      }
      return undefined;
    } catch (e) {
      return ["xxxxxxxxxx"];
    }
  }

  static async getCampaignList(is_active=0,search='',page=1) {
    var url = `${urls.getCampaignById}list-v2?`;
    if(is_active == 1){
      url += 'is_active=1&'
    }
    if(search){
      url+=`search=${search}&`
    }
    if(page && !is_active){
      url+=`page=${page}&`
    } 
    if(!is_active){
      url+=`limit=${11}`
    }
    const result = await HTTP.get(url);
    if (result.data) {
      return result.data.data || [];
      
    }
    return undefined;
  }
  static async getCampaignListWithIdAndName() {
    var url = `${urls.getCampaignById}list`;
    const result = await HTTP.get(url);
    if (result.data) {
      return result.data.data || [];
      
    }
    return undefined;
  }

  static async validateUserCampaignAccess(campaignId) {
    var url = `${urls.getCampaignById}${campaignId}/access`;
    const result = await HTTP.get(url);
    return result.status
  }

  static async disableIntegrations(campaignId) {
    let result = await HTTP.delete(urls.disableIntegrations, {
      campaign_id: campaignId
    })
    return result.status
}

}

export { CampaignService };
