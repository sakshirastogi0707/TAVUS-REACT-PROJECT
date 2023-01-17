import React, {Component} from 'react';
import './forgot.scss';
import {html} from "./forgot.html";
import Validator from "../../service/core/validator";
import firebase from "../firebase/firebase";
import {toast} from "react-toastify";
import Strings from '../../constants/strings'
import { StorageKeys, StorageService, TempStorage } from '../../service/core/storage.service';
import  AdminService  from "../../service/api/admin.service";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            email:'',
            password:'',
            lsRememberMe:'',
            message:''
        }
        if(TempStorage.accessToken){ 
            this.props.history.replace('/dashboard');
        }
    }
    
    componentDidMount() {
     
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
            toast.warning(Strings.ENTER_EMAIL);
            error = true;
        }
        else if (!Validator.isEmail(email)) {
            toast.warning("Please enter a valid email");
            error = true;
        } 
        
        return !error;
    }

    enterPressed = (event) =>{
        var code = event.keyCode || event.which;
        if(code === 13) { //13 is the enter keycode
            this.submit()
        } 
    }

    submit = async () => { 
        const isFormValid = this.validateForm();
        if (!isFormValid) return;
        const {email} = this.state;
        this.setState({isLoading: true})
        
        try{
            await firebase.resetPassword(email)
            toast.success(Strings.RESET_PASSWORD_MESSAGE)
            this.props.history.push("/login");
        } catch (error) {
            console.log('error',error)
            if(error.code){
                toast.error(error.message)
            }
        } finally {
            this.setState({isLoading: false});
        }
    }

    render = () => html.apply(this);
}

export default (Login);
