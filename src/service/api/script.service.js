import {urls} from "../../config/urlConfig";
import {HTTP} from "../core/http.service";

class ScriptService {
    static async createCampaign(data) {
        const url = urls.createCampaign
        const result = await HTTP.post(url, data);
        if (result.data) {
            return result.data.data;
        }
        return undefined;
    }

    static async createScripts(data) {
        const url = urls.scripts
        const result = await HTTP.post(url, data);
        if (result.data) {
            return result.data.data;
        }
        return undefined;
    }

    static async getScript(data) {
        const url = "scripts"
        const { campaignId } = data
        const result = await HTTP.get(url, {
            params: {
                campaignId
            }
        });
        if (result.data) {
            return result.data.data;
        }
        return undefined;
    }
}

export {ScriptService}
