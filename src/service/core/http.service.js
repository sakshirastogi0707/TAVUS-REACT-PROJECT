import axios from 'axios';
import {baseUrl} from "../../config/urlConfig";
import {StorageKeys, StorageService} from './storage.service'
import {toast} from 'react-toastify'
import firebase from "../../components/firebase/firebase";
import Strings from '../../constants/strings'

export const HTTP = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const HTTP2 = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImpZRDNtaTV3QWRjSHN2eHN1QUxHTSJ9.eyJpc3MiOiJodHRwczovL2Rldi15OHNtZnFzdC51cy5hdXRoMC5jb20vIiwic3ViIjoiRFMyeGFWSTg5ZkJmOGN0MFk1cXZERUNZZjBCMExHaW1AY2xpZW50cyIsImF1ZCI6Imh0dHA6Ly9ndnMtdC1QdWJsaS0xMkpUTlBTNTJGUEFGLTE4MzgyMTI3MTQudXMtZWFzdC0xLmVsYi5hbWF6b25hd3MuY29tIiwiaWF0IjoxNjUzMjA2NTUxLCJleHAiOjE2NTMyOTI5NTEsImF6cCI6IkRTMnhhVkk4OWZCZjhjdDBZNXF2REVDWWYwQjBMR2ltIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.eV2z8WVsiQzyiCYBALkyH10ij12RWIomj_TjJd0xBBFXZlc_vwv0EAR1LSg55ysWt-YuL8eqxmTF6Ipta5H9q4UlBs-l6V2E7DNEKUDTYXOKF10xel6YVUhdg8Jc_WYnhnlARrs0_FFhHWojC5blq_Esd_TaoNU_6ouw3C6cBSMHp2qBCTGTDogFOdDjbYR1OSGOIJmWA8W053ry0dGDXaPN-xc6E6axAOg35phHVGpTWbEB_QwfHPm84FxRD2Vn_LjGfbmInOSYEEK8E6E3t3uoQbM6pLblJH50uBP_28ibfEpcDI35POZL_EhEEbPiD39x75As1RmmSuY-BlYhEg"
    }
});

// HTTP.interceptors.response.use((response) => {
//     // console.log('response',response)
//     // if (response.config.parse) {
//     //     //perform the manipulation here and change the response object
//     // }
//     return response;
// }, (error) => {

//     if (error.message === 'Network Error' && !error.response) {
//         console.log('error.message', error.message);
//         // toast.error('Network Error');
//         return
//     }

//     const {status} = error.response;

//     if (status === 404) {
//         // return toast.error('404 | Not Found');
//     }

//     if (status === 500) {
//         // return toast.error('500 | Internal Server Error');
//     }
// });

HTTP.interceptors.request.use(async function (config) {

    //let token = UserService.getUserProfile('token')
   // const { token } = localStorage;
    const token  = await firebase.getToken();
    if (typeof token !== 'undefined' || token !== null) {
      config.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }, error => {
    if (error?.response?.status === 401) {

      //console.log(error,'eeeeeeeeeeeeeeee')
     //place your reentry code
    }else{
    }
    return error;
  });

  HTTP.interceptors.response.use( undefined, async (error) => {
      //console.log('error', error)
      if (error.message === 'Network Error' && !error.response) {
          return toast.error(Strings.NETWORK_ERROR);
      }
      if (!error.response) {
          return {}
      }
      const {status} = error?.response;

      if(status===401) {
        //return toast.error('401 | unothorize');
        await firebase.logout()
        localStorage.clear();
        // StorageService.deletePerm(StorageKeys.token);
        // StorageService.deletePerm(StorageKeys.reshedule);
        // StorageService.deletePerm(StorageKeys.user);
        // StorageService.deletePerm(StorageKeys.signup_data);
        // StorageService.deletePerm(StorageKeys.LANDING_STATE);
        window.location.href='/login';
      }
      if(status==400){
        return error?.response?.data
      }

      if (status === 404) {
          return toast.error(Strings.NOT_FOUND_404);
      }

      if (status === 500) {
          return toast.error(Strings.INTERNAL_SERVER_ERROR_500);
      }
    }
  );
