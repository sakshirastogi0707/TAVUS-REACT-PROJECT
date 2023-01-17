import React, {useEffect, useState, useRef, useCallback} from 'react';
import { Link } from "react-router-dom";
import Inputs from '../../$widgets/input-fields/input-field';
import Validator from "../../../service/core/validator";
import firebase from "../../firebase/firebase";
import Header from "../../app-frame/app-header/app-header";
import AppFooter from "../../app-frame/app-footer/app-footer";
import { StorageService } from '../../../service/core/storage.service';
import Alert from '@mui/material/Alert';
const ariaLabel = { 'aria-label': 'description' };


const mapAccess = {mapboxApiAccessToken: process.env.REACT_APP_MAPBOX};
const queryParams = {
    country: "au",
    types: "address"
};

const Address = (props) => {
    const wrapperRef = useRef(null);
    const [isLoading, setLoading] = useState(false)
    const [email, setEmail] = useState(null)
    const [serverError, setServerError] = useState('')
    const [serverSuccess, setServerSuccess] = useState('')
    const [errors, setErrors] = useState(false)


    const handleEnter = (event) =>{
        var code = event.keyCode || event.which;
        if(code == 13) {
            submit()
        } 
    }

    const validateForm = () => {
        let error = false;
        if (email === "") {
            //toast.warning("Please enter email");
            setServerError("Please enter email.")
            error = true;
        }
        else if (!Validator.isEmail(email)) {
            //toast.warning("Please enter a valid email");
            setServerError("Please enter a valid email.")
            error = true;
        } 
        
        return !error;
    }

    const submit = async () => { 
        setServerError('')
        setServerSuccess('')
        const isFormValid = validateForm();
        if (!isFormValid) return;
        //const {email} = this.state;
        setLoading(true)
        try {
            await firebase.resetPassword(email)
            //toast.success()
            setServerSuccess("Reset password link has been sent to your email.")
            //props.history.push("/login");
        } catch (error) {
            console.log('error',error)
            if(error.code){
                //toast.error(error.message)
                setServerError(error.messag)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={'signup-main'}>
        <div className={'container'}>  
        <div className={'align-self-center w-100'} >
            {/* {isLoading ? <Loader /> : */}
            <>
               <Header
            title="Recover Password"
            subtitle="Enter your email to continue." />
            <div className="box box-address boxDev d-flex flex-column align-items-center justify-content-center">
                <div className="DevBox m-auto w7">
                    {/* <form> */}
                    <div className="DevBoxSec">
                        <Inputs 
                            onKeyDown={handleEnter} 
                            autoFocus={true} 
                            className={'customInput'} 
                            variant="outlined" 
                            placeholder="Email Address" name="email" value={email} 
                            onChange={(event)=>setEmail(event.target.value)} 
                            autocomplete="false" 
                            inputProps={ariaLabel} 
                        />
                        {/* {errors && <span className='error'>Please enter company name .</span>}
                        {lenghtErrors && <span className='error'>Company name must be less than 100 characters.</span>} */}
                    <div className='login-here'>
                        {/* <p>Know your password? <a href="/login">Login here</a></p> */}
                        <p>Know your password? <Link to='/login'>Login here</Link></p>
                    </div>
                    </div>
                    {/* </form> */}
                </div>
                {serverError && 
                    <div className='alertMs'> 
                        <Alert severity="error" onClose={() => setServerError('')}>{serverError} </Alert>
                    </div>
                }
                 {serverSuccess && 
                    <div className='alertMs'> 
                        {/* <Alert severity="success" onClose={() => setServerSuccess('')}>{serverSuccess} <a href="/login">LOGIN</a> </Alert> */}
                        <Alert severity="success" onClose={() => setServerSuccess('')}>{serverSuccess} <Link to='/login'>LOGIN</Link> </Alert>
                    </div>
                }
            </div>
            <AppFooter 
                isLoading={isLoading}
                disabled={(email && !serverSuccess)? false: true} 
                isBack={false}
                title={'Continue'}
                onClick={submit} 
            />
            </>
        </div>
        </div>
        </div>
    );
}

export default Address;