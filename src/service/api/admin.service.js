import {urls} from "../../config/urlConfig";
import httpAdmin from '../core/http-admin';
import {HTTP} from "../core/http.service";
import { StorageKeys, StorageService, TempStorage } from '../core/storage.service';
import _ from 'lodash';

async function login() {
    try {
      let response = await httpAdmin.post(urls.login);
      return response.data;
    }
    catch (e) {
      console.log(e,'errorerrorerrorerror')
    }
}

async function checkUserExist(email) {
    try {
        let params = '?email='+email
        let response = await httpAdmin.get(urls.getUserStatus+params);
        return response.data;
    } catch (error) {
        console.log(error)
        return error;
    } 
}

async function register(params) {
    try {
        let response = await httpAdmin.post(urls.register,params);
        return response.data;
    } catch (error) {
        console.log(error)
        return error;
    } 
}

async function initialSignup(params) {
    try {
        let response = await httpAdmin.post(urls.initialSignup,params);
        return response.data;
    } catch (error) {
        console.log(error)
        return error;
    } 
}

async function newLogin(resultFirebase) {
    try {
      let response = await httpAdmin.post(urls.login);
      let url = process.env.REACT_APP_IMAGE_URL
      if(response.data.step){
        let step = response.data.step
        let data = response.data.data;
        data['uid'] = resultFirebase?.user?.uid
        if(step==2){
            window.location.replace(url+'/detail');
        }
      }
    }
    catch (e) {
      console.log(e,'errorerrorerrorerror')
    }
}

async function survey(params) {
    try {
        let response = await HTTP.put(urls.survey,params);
        return response.data;
    } catch (error) {
        console.log(error)
        return error;
    } 
}

async function userDetails() {
    try {
        let response = await HTTP.get(urls.profile);
        return response.data;
    } catch (error) {
        console.log(error)
        return error;
    } 
}




async function intercomDetail (data){
    if(data){
        // window.Intercom("boot", {
        //     name: data?.first_name+' '+data?.last_name,
        //     email: data.email
        // });
        // window.Intercom("update", {
        //     name: data?.first_name+' '+data?.last_name,
        //     email: data.email
        // });
    }
}

export default {
    login,
    register,
    initialSignup,
    survey,
    newLogin,
    userDetails,
    checkUserExist
}
  
