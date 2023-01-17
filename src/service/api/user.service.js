import {urls} from "../../config/urlConfig";
import {HTTP} from "../core/http.service";
import axios from 'axios';


async function verifyOtp  (user) {
    const result = await HTTP.post(urls.login, user);
    if (result.data) {
        return result.data;
    }
    return undefined;
};
async function doLogin  (user) {
    const result = await HTTP.post(urls.login, user);
    if (result) {
        return result.data;
    }
    return undefined;
};
async function getUserRole  (email) {
    const result = await HTTP.post(`${urls.getUserRole}?Email=${email}`);
    if (result) {
        return result.data;
    }
    return undefined;
}

async function forgotPassword  (data) {
    const headers = { 
        'Content-Type': 'application/json'
    };
    const result = await axios.post(urls.forgotPassword, data, { headers })
    if (result) {
        return result.data;
    }
    return undefined;
}

async function resetPassword  (data) {
    const headers = { 
        'Content-Type': 'application/json'
    };
    const result = await axios.post(urls.resetPassword, data, { headers })
    if (result) {
        return result.data;
    }
    return undefined;
}

async function uploadBackgroundVideo(file, params) {
    const headers = { 
        "Content-Type": "multipart/form-data",
    };
    const url = urls.uploadBackgroundVideo
    let formData = new FormData();
    formData.append("video", file);
    const result = await HTTP.post(url, formData, { headers, params: {
        ...params
    }})
    return result
}

async function getPreviewLink(url) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                location: "https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-down-a-mountain-41576-large.mp4"
            })
        }, 1500)
    })
}
async function updateMediaTemplate(params) {
    const headers = { 
        'Content-Type': 'application/json'
    };
    const result = await axios.post(urls.mediaTemplate, {}, { headers, params })
    if (result) {
        return result.data;
    }
}
async function sendSampleRecordToWebhook(data) {
    const headers = { 
        'Content-Type': 'application/json'
    };
    const result = await axios.post(urls.zapierWebhookSample, data, { headers })
    if (result) {
        return result.data;
    }
}

export default {
    verifyOtp,
    doLogin,
    getUserRole,
    forgotPassword,
    uploadBackgroundVideo,
    sendSampleRecordToWebhook,
    updateMediaTemplate,
    getPreviewLink,
    resetPassword
  }
