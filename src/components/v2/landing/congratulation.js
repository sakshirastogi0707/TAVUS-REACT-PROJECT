import React, {useEffect, useState, useCallback} from 'react';
import {useLocation, useParams, useHistory} from 'react-router-dom'
import { AppImage } from '../../$widgets/images/app-image';
import LinearProgress from '@mui/material/LinearProgress';
import AppFooter from "../../app-frame/app-footer/app-footer";
import Header from "../../app-frame/app-header/app-header";
import {StorageKeys, StorageService } from '../../../service/core/storage.service'; 
import { UserService } from '../../../service/api/user-service';

const Congratulation = (props) => {

    const [isLoading, setLoading] = useState(false)
    let params = useParams();
    let history = useHistory();

    const updateUsersSteps = async () => {
        try {
            setLoading(true)
            const userSteps = await UserService.getUserProfile()
            if(userSteps.steps){
                let steps = userSteps.steps
                steps.congratulation= true
                const result = await UserService.userSteps(steps)
                history.push(`/training/${params?.campaignId}`)
                return result
            }
            setLoading(false)
        } catch (e) {
            setLoading(false)
            console.log('campaign not saved', e)
            return false
        }
    }

    return (
        <div className={'signup-main almostDev'}>
            <div className={' container'}>  
                <div className={'align-self-center w-100'} >
                    <form>
                    <Header
                    title="Almost there!"
                    subtitle={["Let’s put a pin in this mic check until you get your ",<br/>,  "Tavus welcome kit." ]}/>
                    <div className="box congratulation DevRole d-flex flex-column align-items-center justify-content-center">
                        <div className="DevBox">
                            <div className="DevBoxSec">
                            <AppImage name={'congratulation.png'} />
                            <p className='congratulationText'>Come back and click “Get Started” when<br/> you've received your microphone!</p>
                            </div>
                        </div>
                    </div>
                    <AppFooter
                        onClick={updateUsersSteps}
                        title={'Get Started'}
                        isLoading={isLoading}
                    />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Congratulation;