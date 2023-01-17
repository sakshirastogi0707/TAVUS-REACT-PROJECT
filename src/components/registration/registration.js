import React, {Component} from 'react';
import './registration.scss';
import {html} from "./registration.html";
import _ from 'lodash';
import { toast } from "react-toastify";
import {StorageService} from "../../service/core/storage.service";
import  AdminService  from "../../service/api/admin.service";
import AuthService from "../../service/core/auth.service";
import firebase from '../firebase/firebase'
import Strings from './../../constants/strings'

class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            first_name:'',
            last_name:'',
            email:'',
            password:'',
            confirm_password:'',
            errors: {},
            code:'',
            isLoading: false
        }
    }

    componentDidMount() {
        let isAdmin = AuthService.isAdmin()
        if(isAdmin){
            let redirectPath  = isAdmin ? '/users' : '/dashboard';
            if(redirectPath){
                this.props.history.push(redirectPath);
            }
        }
        const url = new URL(window.location.href);
        var email = url.searchParams.get('email');
        const code = url.searchParams.get('code');
        const search = window.location.search;
        if(search){
            var splitSearch = search.split('?')
            if(splitSearch && splitSearch.length>0){
                var splitSearch2 = splitSearch[1].split('&')
                if(splitSearch2 && splitSearch2.length>0){
                    var splitSearch3 = splitSearch2[0].split('=')
                    if(splitSearch3 && splitSearch3.length>0){
                        email = splitSearch3[1]
                    }
                }
            }
        }
        
        if(email && code ){
            this.setState({
                email: email,
                code: code
            })
        } else {
            this.props.history.push("/login");
        }
    }

    handlerInput = (e) => {
        let state = { [e.target.name]: e.target.value };
        this.setState(state);
    }

    submit = async () => {
        let isValid = this.validateForm()
        if(isValid){
            this.setState({isLoading: true})
            const {first_name, last_name, email, password, code} = this.state;
            let params = {
                first_name,
                last_name,
                email,
                code
            };
            let resultFirebase = await firebase.register(email, password);
            let firebaseToken = await firebase.getToken();
            if(resultFirebase?.status==false){
                toast.error(resultFirebase.message)
                this.setState({isLoading: false})
            } else {
                AdminService.register(params).then(async (response) =>{
                    if(response.status){
                        toast.success(response.message)
                        console.log(response,"responseeefex")
                        return this.props.history.push("/login");
                    }else{
                        toast.error(response.message)
                        await firebase.deleteUserFromAuthentication(resultFirebase?.user?.uid);
                    }
                }).catch((error) => {
                    console.log('error', error)
                }).finally(()=>{
                    this.setState({isLoading: false})
                })
            }
        }
    }

    validateForm = () => {
        const {first_name, last_name, email, password, confirm_password} = this.state;
        const errors = {};
        if (!first_name) {
            errors.first_name = Strings.ENTER_FIRST_NAME;
        }
        if (!last_name) {
            errors.last_name = Strings.ENTER_LAST_NAME;
        }
        if (!email) {
            errors.email = Strings.ENTER_EMAIL;
        }
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email).toLowerCase())) {
            errors.email = Strings.ENTER_VALID_EMAIL2
        }
        if (!password) {
            errors.password = Strings.ENTER_PASSWORD;
        }
        if (password.length<6) {
            errors.password = Strings.PASSWORD_TOO_SHORT;
        }
        if(password !== confirm_password ){
            errors.confirm_password = Strings.PASSWORDS_DONT_MATCH;
        }
        this.setState({errors})
        return _.isEmpty(errors);
    }

    render = () => html.apply(this);
}

export default (Registration);
