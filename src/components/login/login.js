import React, {Component} from 'react';
import './login.scss';
import {html} from "./login.html";
import {Config} from "../../config/config";
import Validator from "../../service/core/validator";
import firebase from "../../components/firebase/firebase";
import {toast} from "react-toastify";
import { StorageKeys, StorageService, TempStorage } from '../../service/core/storage.service';
import  AdminService  from "../../service/api/admin.service";
import AuthService from "../../service/core/auth.service";
import Strings from '../../constants/strings'
import Cookies from 'universal-cookie';
import axios from 'axios';
import { SegmentService } from '../../service/api/segment.service';


const cookies = new Cookies();
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            email:'',
            password:'',
            lsRememberMe:'',
            message:'',
        }
        if(TempStorage.accessToken){ 
            this.props.history.replace('/dashboard');
        }
    }
    
    componentDidMount() {
        let isAdmin = AuthService.isAdmin()
        let isLogin = AuthService.isLogin()
        if(isLogin){
            let redirectPath  = isAdmin ? '/users' : '/dashboard';
            if(redirectPath){
                this.props.history.push(redirectPath);
            }
        }
    }

    handlerInputAction = (e) => { 
        let state = { [e.target.name]: e.target.value };
        this.setState(state);
    }
    
    handlerInput = (e) => {
        this.handlerInputAction(e)
    }

    validateForm = () => {
        const {email,password} = this.state;
        let error = false;
        if (email === "") {
            toast.error(Strings.ENTER_EMAIL);
            error = true;
        }
        else if (!Validator.isEmail(email)) {
            toast.error(Strings.ENTER_VALID_EMAIL);
            error = true;
        } 
        else if (password === "") {
            toast.error(Strings.ENTER_PASSWORD);
            error = true;
        } 
        return !error;
    }

    enterPressed = (event) =>{
        var code = event.keyCode || event.which;
        if(code === 13) { //13 is the enter keycode
            this.isTruLogin()
        } 
    }

    intercomDetail = async (data)=>{
        if(data){
            if(!data.updated_at){
                return this.props.history.push("/invite");
            }
            if(data.role === 'admin'){
                return this.props.history.push("/users");
            } else {
                return this.props.history.push("/dashboard");
            }
        } else {
            this.setState({isLoading: false})
        }
    }


    isTruLogin = async () => {
        
        const isFormValid = this.validateForm();
        if (!isFormValid) return;
        const {email, password} = this.state;
        this.setState({isLoading: true})
        try{
            let resultFirebase = await firebase.login(email, password);
            this.setState({isLoggedIn: true})
            let token = await firebase.getToken();
            try {
                AdminService.login().then((response) =>{
                    let data = response.data;
                    data['uid'] = resultFirebase?.user?.uid
                    let routeName = ''
                    switch(response.step) {
                        case 2:
                            routeName="/signup/detail";
                            break;
                        case 3:
                            routeName="/signup/company";
                            break;
                        case 4:
                            routeName="/signup/website";
                            break;
                        case 5:
                            routeName="/signup/role";
                            break;
                        case 6:
                            routeName="/signup/plan";
                            break;
                        case 7:
                            routeName="/signup/address";
                            break;
                        case 8:
                            routeName="/signup/price";
                            break;
                        case 9:
                            routeName="/signup/book-demo";
                            break;
                        default:
                            this.intercomDetail(data)
                    }
                    routeName = this.props.history.push(routeName);
                }).catch((error) => {
                    console.log(error,'error')
                    this.setState({isLoading: false})
                })
            } catch (e) {
                console.log(e,'eeee')
                this.setState({isLoading: false})
            } 
        }  catch (error) {
            if(error.code=='auth/user-not-found') {
                toast.error(Strings.ENTER_VALID_EMAIL2)
            } else if(error.code=='auth/wrong-password') {
                let userStatus = await AdminService.checkUserExist(email)
                if(userStatus.status) {
                    toast.error(Strings.SIGNUP_VIA_GOOGLE)
                }
            } else {
                toast.error(error.message)
            }
            this.setState({isLoading: false})
        }
    }

    googleSignIn = async () => {
        try{
            let userInfo = await firebase.googleSignInPopup();
            AdminService.login().then((response) =>{
                let data = response.data;
                if(response.status) {
                    data['uid'] = userInfo?.uid
                    window.analytics.user().id(response?.data.uuid)

                    let routeName = ''
                    switch(response.step) {
                        case 2:
                            routeName = "/signup/detail";
                            break;
                        case 3:
                            routeName = "/signup/company";
                            break;
                        case 4:
                            routeName = "/signup/website";
                            break;
                        case 5:
                            routeName = "/signup/role";
                            break;
                        case 6:
                            routeName = "/signup/plan";
                            break;
                        case 7:
                            routeName = "/signup/address";
                            break;
                        case 8:
                            routeName = "/signup/price";
                            break;
                        case 9:
                            routeName = "/signup/book-demo";
                            break;
                        default:
                            this.intercomDetail(data)
                    }
                    routeName = this.props.history.push(routeName);
                } else {
                    let params = {
                        email : userInfo.email,
                        signup_type: 'google'
                    }
                    this.addUserByEmail(params, userInfo.uid, userInfo.email)
                }
            }).catch((error) => {
                console.log(error,'error')
                this.setState({isLoading: false})
            })
        } catch (error) {
            console.log(error,'google login error')
        }
    }

    addUserByEmail = async (params, uid, email_id) => {
        AdminService.initialSignup(params).then(async (response) =>{
            if(response.status){
                if(response?.data?.id){
                   await SegmentService.analyticsTrack('Registration Started', {
                        email : email_id,
                    });
                }
                this.props.history.push('/signup/detail')
            } else {
                toast.error(response.message)
                await firebase.deleteUserFromAuthentication(uid);
            }
        }).catch((error) => {
            console.log('error', error)
        })
    }

    render = () => html.apply(this);
}

export default (Login);
