import React, {useState} from 'react';
import Setting from "./setting";
import Sidebar from "./sidebar";
import LandingPreview from "./landing-preview";
import {useSelector} from "react-redux";
import HeaderLanding from "../../../app-frame/app-header-landing/app-header-landing";
import ButtonTooltip from "../components/button-tooltip/button-tooltip"
import './index.scss';

const Index = (props) => {
    const [state, setState] = useState({});
    const template_id = useSelector(s => s.landingState.template_id)
    const landingState = useSelector(s => s.landingState)
    const [show, setShow] = useState(true);
    return (
        <>
            <div className='landing-frame-main '>
                <HeaderLanding userData={props.userDetail}/>
                <div className='frame-box d-md-flex flex-md-column justify-content-md-center align-items-md-center'>
                    <div className="landing-frame-box">
                        <div className="Sidebar">
                            <Sidebar />
                        </div>
                        <div className="Setting">
                            <Setting campaignId={props.campaignId} userDetail={props.userDetail} />
                        </div>
                        <div className="landing-preview">
                            <LandingPreview />
                        </div>
                    </div>
                </div>
            </div>
        {(landingState?.selectedNavItemId=='buttons' || landingState?.selectedNavItemId=='text') && landingState.showSuperCharge && show &&
            <ButtonTooltip setShow={setShow} />
        }
        </>
    );
};

export default Index;
