import React, {Component} from 'react';
import './signup.scss';
import {html} from "./signup.html";
import _ from 'lodash';
import { toast } from "react-toastify";
import firebase from "../../components/firebase/firebase";
import  AdminService  from "../../service/api/admin.service";

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            step: 1,
            allRoles:[
                {label:'Account Executive',value:'Account Executive'},
                {label:'SDR',value:'SDR'},
                {label:'Sales Manager',value:'Sales Manager'},
                {label:'Marketer',value:'Marketer'},
                {label:'Product Manager',value:'Product Manager'},
                {label:'Other',value:'Other'},
            ],
            selectedRole:{},
            errors: {},
            email:'', password:'', first_name:'', last_name:'', company:'', website:'', detail:'', shipping:'',marketing_communication:true,terms:false
        }
    }

    componentDidMount() {

    }

    handleOnChange=(event)=>{
        if(event.target.name=='marketing_communication' || event.target.name=='terms'){
            this.setState({[event.target.name]: event.target.checked})
        } else {
            this.setState({[event.target.name]: event.target.value})
        }
    }

    changeScreen=(choice)=>{
        let {step} = this.state
        if(choice=='next'){
            if(step<8){
                this.submitRegister()
                this.setState({step: step+1})
            }
        } else {
            if(step!=1){
                this.setState({step: step-1})
            }
        }
    }

    checkValidation=()=>{
        let {step, selectedRole, email, password, first_name, last_name, company, website, detail, shipping,marketing_communication,terms} = this.state

        const errors = {};
        let error = false;

        if (email === "") {
            toast.warning("Please enter email");
            error = true;
        }
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email).toLowerCase())) {
            errors.email = "Please enter a valid email address."
        }
        
        this.setState({ errors })
        return _.isEmpty(errors);
    }

    submitRegister = async () => {
        const {email, password} = this.state
        let params = {
            email
        }
        this.setState({isLoading: true})
        let resultFirebase = await firebase.register(email, password);
        if(resultFirebase?.status==false){
            toast.error(resultFirebase.message)
            this.setState({isLoading: false})
        } else {
            AdminService.initialSignup(params).then(async (response) =>{
                if(response.status){
                    toast.success(response.message)
                    console.log(response,)
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

    changeRoles=(selectedRole)=>{
        this.setState({selectedRole})
    }

    googleSignIn=async()=>{
        try{
            let userInfo = await firebase.googleSignInPopup2();
        } catch (error) {
            console.log(error,'google login error')
        }
    }
    render = () => html.apply(this);
}
export default (Signup);
