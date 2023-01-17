import React, {useEffect, useState, useCallback} from 'react';
import Button from '@mui/material/Button';
import Loader from "../$widgets/loader/loader"
import Utils from "../../service/core/utils";
import { Grid } from "@material-ui/core";
import { AppImage } from '../$widgets/images/app-image';
import LinearProgress from '@mui/material/LinearProgress';
import AppFooter from "../app-frame/app-footer/app-footer";
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import  AdminService  from "../../service/api/admin.service";
import { StorageKeys, StorageService, TempStorage } from '../../service/core/storage.service';
import {SegmentService} from '../../service/api/segment.service'
const ThankYou = (props) => {

    const [serverError, setServerError] = useState('')
    const [userData, setUserData] = useState({});

    async function next (){
        AdminService.userDetails().then(async (response) =>{
            if(response.status){
                props.history.push('/invite')
            } else {
                setServerError(response?.message)
            }
        }).catch((error) => {
            console.log('error', error)
        }).finally(()=>{
            setLoading(false)
        })
    }

    async function reschedule (){
        await StorageService.setPerm('reshedule', true)
        props.history.push('/signup/book-demo')
    }

    const [isLoading, setLoading] = useState(false)

    return (
        <div className={'signup-main'}>
        <div className={' container '}>  
        <div className={'align-self-center w-100'} >
            
             {isLoading ? <Loader /> :
             <>
               <div className="header-main mb-4">
            <div className="text-center">
                <div className={'logo'}>
                    <AppImage name={'logo.svg'} width={'128'} />
                </div>
                <div className={'headerDiv'}>
                <h2>Great, let's get your onboarding started!</h2>
               
                </div>
            </div>
            {serverError && 
                <div className='alertMs'> 
                    <Alert severity="error" onClose={() => setServerError('')}>{serverError}  </Alert>
                </div>
            }
        </div>
            <div className="box Devthanku mobile-box d-flex flex-column align-items-center justify-content-center mt-5">
            <Grid container className="d-flex justify-content-center text-center" >
                {/* <div className={'thankuDiv'}>
                    <h2> Great! Everything is lorem<br /> ipsum dolor sit amet <br />consecutor.</h2>
                    <p>You will recieve a confirmation email soon with aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </div> */}
                <div className="DevBox">
                    <div className="DevBoxSec">
                    <AppImage name={'thank-you.gif'} />
                    </div>
                </div>

            </Grid>
                {/* <Footer /> */}
            </div>
            <AppFooter
                    userData={userData}
                    onClick={next} 
                    disabled={false}
                    title={'Continue'}
                    isLoading={isLoading}
                    progress={100}
                    invite={true}
                    step={'registration'}
                />
            </>
        }
        </div>
        </div>
        </div>
    );
}

export default ThankYou;