import httpAdmin from '../../../../service/core/http-admin';
import { urls } from "../../../../config/urlConfig";


export async function getIframeSrc(solution_id, solution_name, user, campaignId) {
    let params = `?solution_id=${solution_id}&solution_name=${solution_name}&user_id=${user['id']}&first_name=${user['first_name']}&last_name=${user['last_name']}&campaign_id=${campaignId}`
    let response = await httpAdmin.get(urls.getIframeSrc + params).catch((err) => console.log(err))
    if(response.status == 200) {
            let solution_instance_id = response["data"]["solution_instance_id"]
            let tray_iframe_url = response["data"]["tray_iframe_url"]
            let user_token = response["data"]["user_token"]
            return {"solution_instance_id": solution_instance_id,
                            "tray_iframe_url": tray_iframe_url,
                            "user_token": user_token}
    }
    
    return null
}

export async function getAvailableConnectors() {
    let params = '?integration_tag=prod'
    let response = await httpAdmin.get(urls.getAvailableConnectors+params).catch((err) => console.log(err))
    if(response.status == 200) {
        return response["data"]["solutions"]
    }
    
    return null
}

export async function enableSolutionInstance(user_token, solution_instance_id) {
    let response = await httpAdmin.post(urls.enableSolutionInstance, {
        "user_token": user_token,
        "solution_instance_id": solution_instance_id
    })
    if(response.status == 200) {
        return true
    }
    else {
        return false
    }
}