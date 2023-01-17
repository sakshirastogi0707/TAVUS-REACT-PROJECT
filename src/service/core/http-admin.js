import axios from 'axios';
import firebase from "../../components/firebase/firebase";
import {StorageService} from "./storage.service";


axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.request.use(async function (config) {
  if(!config.url.includes('dev-api.tavus.io/api/v1/users/email?email')){
      const token  = await firebase.getToken();
      if (typeof token !== 'undefined' || token !== null) {
        config.headers.common['Authorization'] = `Bearer ${token}`;
      }
  }
  
    return config;
  }, error => {
    console.log('error error', error)
  if (error.response.status === 401) {

    console.log('eeeeeeeeeeeeeeee')
   //place your reentry code
  }else{
  }
  return error;
});

axios.interceptors.response.use(async function (response) {
  // if(!response.data.response.status){
  //   await firebase.logout()
  //   StorageService.deletePerm('token');
  //   StorageService.deletePerm('user');
  //   window.location.href='/login';
  // }
  return response;
}, async error => {
  // if (error.response.status == 401) {
  //   await firebase.logout()
  //   StorageService.deletePerm('token');
  //   StorageService.deletePerm('user');
  //   window.location.href='/login';
  //  //place your reentry code
  // }else{
  // }
  return error?.response;
});



export default axios;