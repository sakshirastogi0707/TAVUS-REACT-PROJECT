import  AdminService  from "../api/admin.service";
export const StorageKeys = {
    token: 'token',
    user: 'user',
    isCookieAccepted: 'isCookieAccepted',
    LANDING_STATE: 'LANDING_STATE',
    CAMPAIGN_ID: 'CAMPAIGN_ID',
    audioGenId: 'audioGenId',
    userSetVideoDevice: 'userSetVideoDevice',
    userSetAudioDevice: 'userSetAudioDevice'
};

export class StorageService {

    static get(key) {
        return sessionStorage.getItem(key);
    }
    static set(key, value) {
        sessionStorage.setItem(key, value);
    }
    static getObj(key) {
        return JSON.parse(sessionStorage.getItem(key));
    }
    static setObj(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    static getPerm  (key) {
        let item = localStorage.getItem(key);
        try {
           return JSON.parse(item);
        } catch (e) {
            return item;
        }
    }

    static getLocalData  (key) {
        let item = localStorage.getItem(key);
        try {
           return JSON.parse(item);
        } catch (e) {
            return item;
        }
    }

    static deletePerm(key) {
        localStorage.removeItem(key);
    }
    static setPerm(key, value) {
        if (typeof value === 'string') {
            localStorage.setItem(key, value);
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }
    static delete(key) {
        sessionStorage.removeItem(key);
    }
    static clearAll() {
        sessionStorage.clear();
    }
}

export class TempStorage {
    static loggedInUser = {};
    static authToken = '';
    static landingState = {};
    static templatesCached = null;
    static templateCached = {};
    static templateId = null;
}
