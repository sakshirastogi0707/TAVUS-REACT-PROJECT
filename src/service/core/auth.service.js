import { UserService } from '../api/user-service';
import { StorageService } from "../../service/core/storage.service";
import Cookies from 'universal-cookie';
import firebase from '../../components/firebase/firebase'
import { CompressOutlined } from '@mui/icons-material';

const cookies = new Cookies();

export default class AuthService {
    static async isUserLoggedIn() {
        let user = await UserService.getUserProfile()
        return user && user != undefined && user?.role != 'admin' ? true : false;
    }

    static async isAdminLoggedIn() {
        let role = StorageService.getPerm("Role");
        if(role){
            return true
        }
        this.logout()
    }

    static async isValidUser() {
        let user = await UserService.getUserProfile()
        return user && user != undefined ? true : false;
    }

    static async isInvitie() {
        let user = await UserService.getUserProfile() 
        if(user?.role=='user'&& !user?.invited_by){
            return true
        }
        return false;
    }


    static async isLogin() {
        let userDetail = await UserService.getUserProfile()
        return userDetail && userDetail?.role==='user' ? true : false
    }

    static async userData() {
        let user = await UserService.getUserProfile()
        return user;
    }

    static async isAdmin() {
        let userDetail = await UserService.getUserProfile()
        return userDetail && userDetail?.role==='admin' ? true: false
    }

    static async isAdminUser() {
        let user = await UserService.getUserProfile() 
        return user && user != undefined ? true : false;
    }

    static isUserLogin(){
        let user = StorageService.getPerm("Role");
        if(user){
            return true;
        }
        this.logout()
    }

    static async getUserCurrentRoute(data) {
        let campaignId = data?.campaign?.id
        let result = true
        if(data.role=='user' && !data?.steps?.first_video){          
            if(!data?.steps?.invite && !data.invited_by){
                return  "invite"
            } else if(!data?.steps?.microphone){
                return  "microphone"
            } 
            if(data?.is_mic_available){
                switch(true) {
                    case !data?.steps?.script:
                        return  campaignId ? `script/${campaignId}` : "script";
                    case !data?.steps?.training:
                        return `training/${campaignId}`;
                    case !data?.steps?.script_recording:
                        return  `script-recording/${campaignId}`;
                    case !data?.steps?.template:
                        return `template/${campaignId}`;
                    case !data?.steps?.background_video:
                        return `background-video-setup/${campaignId}`;
                    case !data?.steps?.landing:
                        return  `landing/${campaignId}`;
                    case !data?.steps?.training_complete:
                        return  `training-complete/${campaignId}`;
                    case !data?.steps?.set_variable:
                        return `set-variable/${campaignId}`;
                    case !data?.steps?.first_video:
                        return  `first-video/${campaignId}`;
                }
            } else {
                switch(true) {
                    case !data?.steps?.scrip:
                      return  campaignId ? `script/${campaignId}` : "script";
                    case !data?.steps?.landing:
                        return  `landing/${campaignId}`
                    case !data?.steps?.congratulation:
                        return  `congratulation/${campaignId}`
                    case !data?.steps?.training:
                        return `training/${campaignId}`
                    case !data?.steps?.script_recording:
                        return  `script-recording/${campaignId}`
                    case !data?.steps?.template:
                        return  `template/${campaignId}`
                    case !data?.steps?.background_video:
                        return  `background-video-setup/${campaignId}`
                    case !data?.steps?.training_complete:
                        return  `training-complete/${campaignId}`
                    case !data?.steps?.set_variable:
                        return `set-variable/${campaignId}`
                    case !data?.steps?.first_video:
                        return  `first-video/${campaignId}`
                }
            }
        }
        return result;
    }

    static async getUser() {
        return await UserService.getUserProfile()
    }

    static async logout() {
        await firebase.logout()
    }
}
