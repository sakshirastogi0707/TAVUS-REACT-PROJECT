import React, {useEffect, useState, useCallback,} from 'react';
import { AppImage } from "../../$widgets/images/app-image";
import PasswordField from "../../$widgets/input-fields/password-field";
import AuthService from "../../../service/core/auth.service";
import  AdminService  from "../../../service/api/admin.service";
import firebase from "../../../components/firebase/firebase";
import Button from '@mui/material/Button';
import _ from 'lodash';
import { toast } from "react-toastify";
import Utils from "../../../service/core/utils";
import Header from "../../app-frame/app-header/app-header";
import {Config} from "../../../config/config";
import Alert from '@mui/material/Alert';
import { Link } from "react-router-dom";
import { StorageKeys, StorageService, TempStorage } from '../../../service/core/storage.service';
import "./login.scss";
import OutlinedInputCustom from "../../$widgets/input-fields/outlined-input"
import IconLabelButtons from "../../$widgets/buttons/icon-label-buttons"
import { SegmentService } from '../../../service/api/segment.service';
const ariaLabel = { 'aria-label': 'description' };

const signupGmailStyle = {
    paddingBottom: '200px'
}
function Email(props) {
    useEffect(() => {
        (async () => {
            let isAdmin = await AuthService.isAdmin()
            let isLogin = await AuthService.isLogin()
            if(isLogin || isAdmin){
                let redirectPath  = isAdmin ? '/users' : '/dashboard';
                if(redirectPath){
                    props.history.push(redirectPath);
                }
            }
        })();
    }, []);
    const [isLoading, setLoading] = useState(false)
    const [serverError, setServerError] = useState('')
    const [formstate, setFromState] = useState({
        email: '',
        password: '',
        errors: {}
    })
    async function login (){
        const isFormValid = validateForm();
        if (!isFormValid) return;
        const {email , password} = formstate;
        setLoading(true)
        try{
            let resultFirebase = await firebase.login(email, password);
            let token = await firebase.getToken();
            try {
                AdminService.login().then((response) =>{
                    if(!response.status){
                        setServerError(response.message)
                        this.setState({isLoading: false})
                        return
                    }
                    let data = response.data;
                    data['uid'] = resultFirebase?.user?.uid
                    StorageService.setPerm('Role', data?.role)
                    window.analytics.user().id(data?.uuid)
                    if (data.campaign && data.campaign.id > 0) {
                        if (data.campaign.landing_json) {
                            StorageService.setPerm(StorageKeys.LANDING_STATE, data.campaign.landing_json);
                        }
                    }
                    switch(response.step) {
                        case 2:
                            return props.history.push("/signup/detail");
                        case 3:
                            return props.history.push("/signup/company");
                        case 4:
                            return props.history.push("/signup/website");
                        case 5:
                            return props.history.push("/signup/role");
                        case 6:
                            return props.history.push("/signup/plan");
                        case 7:
                            return props.history.push("/signup/tshirt");
                        case 8:
                            return props.history.push("/signup/address");
                        case 9:
                            return props.history.push("/signup/price");
                        default:
                            intercomDetail(data)
                    }
                }).catch((error) => {
                    console.log(error,'error')
                    setLoading(false)
                })
            } catch (e) {
                console.log(e,'eeee')
                setLoading(false)
            }
        }  catch (error) {
            console.log(error,'error')
            if(error.code=='auth/user-not-found') {
                toast.error('Oops! Looks like you have entered an invalid email.')
            } else if(error.code=='auth/wrong-password') {
                setServerError(error.message)
            } else {
                toast.error(error.message)
            }
            setLoading(false)
        }
    }
    async function intercomDetail  (data){
        if(data){
            let campaignId = data?.campaign?.id
            if(data?.steps){
                if(!data?.steps?.invite){
                    return props.history.push("/invite");
                } else if(!data?.steps?.microphone){
                    return props.history.push("/microphone");
                } 
                if(data?.is_mic_available){
                    switch(true) {
                        case !data?.steps?.script:
                          return  props.history.push("script");
                        case !data?.steps?.training:
                            return props.history.push(`training/${campaignId}`);
                        case !data?.steps?.script_recording:
                            return  props.history.push(`script-recording/${campaignId}`);
                        case !data?.steps?.template:
                            return props.history.push(`template/${campaignId}`);
                        case !data?.steps?.background_video:
                            return props.history.push(`background-video-setup/${campaignId}`);
                        case !data?.steps?.landing:
                            return  props.history.push(`landing/${campaignId}`);
                        case !data?.steps?.training_complete:
                            return  props.history.push(`training-complete/${campaignId}`);
                        case !data?.steps?.set_variable:
                            return props.history.push(`set-variable/${campaignId}`);
                        case !data?.steps?.first_video:
                            return  props.history.push(`first-video/${campaignId}`);
                    }
                } else {
                    switch(true) {
                        // switch(data?.steps) {
                        case !data?.steps?.script:
                          return  props.history.push("script");
                        case !data?.steps?.landing:
                            return  props.history.push(`landing/${campaignId}`)
                        case !data?.steps?.congratulation:
                            return  props.history.push(`congratulation/${campaignId}`)
                        case !data?.steps?.training:
                            return props.history.push(`training/${campaignId}`)
                        case !data?.steps?.script_recording:
                            return  props.history.push(`script-recording/${campaignId}`)
                        case !data?.steps?.template:
                            return  props.history.push(`template/${campaignId}`)
                        case !data?.steps?.background_video:
                            return  props.history.push(`background-video-setup/${campaignId}`)
                        case !data?.steps?.training_complete:
                            return  props.history.push(`training-complete/${campaignId}`)
                        case !data?.steps?.set_variable:
                            return props.history.push(`set-variable/${campaignId}`)
                        case !data?.steps?.first_video:
                            return  props.history.push(`first-video/${campaignId}`)
                    }
                }
            }
            if(data.role === 'admin'){
                return props.history.push("/users");
            } else {
                return props.history.push("/dashboard");
            }
        } else {
            this.setState({isLoading: false})
        }
    }
    function validateForm () {
        const {email , password} = formstate;
        const errors = {};
        if (!password) {
            errors.password = "Please enter password.";
        }
        if (!email) {
            errors.email = "Please enter valid email.";
        }
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email).toLowerCase())) {
            errors.email = "Please enter a valid email address."
        }
        const newObj = {...formstate};
        newObj.errors = errors;
        setFromState(newObj);
        return _.isEmpty(errors);
    }
    function handleChange(event) {
        const {name, value, checked} = event.target;
        const newObj = {...formstate};
        if(name=='marketing_communication' || name=='terms'){
            newObj[name] = checked;
        } else {
            newObj[name] = value
        }
        setFromState(newObj)
    }
    async function googleSignIn () {
        try{
            let userInfo = await firebase.googleSignInPopup();
            AdminService.login().then((response) => {
                let data = response.data;
                StorageService.setPerm('Role', response?.data?.role)
                if (response.status) {
                     window.analytics.user().id(response?.data?.uuid);
                    data['uid'] = userInfo?.uid
                    switch (response.step) {
                        case 2:
                            return props.history.push('/signup/privacy-policy')
                        case 3:
                            return props.history.push("/signup/company");
                        case 4:
                            return props.history.push("/signup/website");
                        case 5:
                            return props.history.push("/signup/role");
                        case 6:
                            return props.history.push("/signup/plan");
                        case 7:
                            return props.history.push("/signup/address");
                        case 8:
                            return props.history.push("/signup/price");
                        case 9:
                            return props.history.push("/signup/book-demo");
                        default:
                            intercomDetail(data)
                    }
                } else if (!response.status && response?.data) {
                    setServerError(response.message)
                } else {
                    let params = {
                        email: userInfo.email,
                        signup_type: 'google'
                    }
                    addUserByEmail(params, userInfo.uid, userInfo.email)
                }
            }).catch((error) => {
                console.log(error, 'error')
                this.setState({ isLoading: false })
            })
        } catch (error) {
            console.log(error, 'google login error')
        }
    }
    async function addUserByEmail (params, uid, email_id) {
        AdminService.initialSignup(params).then(async (response) =>{
            if(response.status){
                if(response?.data?.id){
                    SegmentService.analyticsTrack('Registration Started', {
                        email : email_id,
                    });
                }
                props.history.push('/signup/detail')
            } else {
                toast.error(response.message)
                await firebase.deleteUserFromAuthentication(uid);
            }
        }).catch((error) => {
            console.log('error', error)
        })
    }
    const handleEnter = (event) => {
        if (event.key.toLowerCase() === "enter") {
          const form = event.target.form;
          const index = [...form].indexOf(event.target);
          console.log(index,'index')
          if(index==1){
            login()
          } else {
            form.elements[index + 1].focus();
          }
          event.preventDefault();
        }
    };
    const {email, password,  errors} = formstate;
    return (
        <div className={'signin-main'}>
            <div className={'container  '}>
                <Header/>
                <div className='box-email text-center m-auto d-flex flex-column justify-content-center align-items-center'>
                    <div className='login-main-box'>
                        <div className='header'>
                            <h1>Login</h1>
                            <h3>Don’t have an account? <Link to='/signup/email'>Sign up</Link> </h3>
                        </div>
                        <form>
                            <div className="DevBox">
                                <OutlinedInputCustom  onKeyDown={handleEnter} placeholder="Your email"   value={email} name="email" onChange={(e) => handleChange(e)} required autoFocus={true} inputProps={ariaLabel}  className='pb-4'/>
                                    {errors['email'] && <span className='error'>{errors.email}</span>}
                                <div className="passcode" >
                                    <PasswordField onKeyDown={handleEnter}  value={password} name="password" onChange={(e) => handleChange(e)} required autoFocus={false} label="Password" className="Password"/>
                                    {errors['password'] && <span className='error'>{errors.password}</span>}
                                </div>
                                    {errors['terms'] && <span className='error'>{errors.terms}</span>}
                                <div className="text-left terms">
                                    <span><Link to='/forgot'>Forgot password?</Link></span>
                                </div>
                                <div className='login-btn'>
                                    <IconLabelButtons
                                        disabled={((!email )|| !password || isLoading) ? true : false}
                                        className="invitebtn"
                                        onClick={login}
                                        title="Login"
                                    />
                                </div>
                                <div className='hrDiv'>
                                    <hr/>
                                </div>
                                <div className="signup_gmail">
                                    <Button onClick={googleSignIn} className="signup_btn_google">  <AppImage  name={'google-icon.svg'}/> Continue with Google </Button>
                                </div>

                                
                            </div>
                        </form>
                        {serverError &&
                            <div className='alertMs'>
                                <Alert severity="error" onClose={() => setServerError('')}>{serverError} </Alert>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Email;
