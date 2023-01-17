import React, {useEffect, useState, useCallback} from 'react';
import './template2.scss';
import { Grid, Paper, Popper, Grow } from "@material-ui/core";
import { AppImage } from '../../../../../$widgets/images/app-image';
import BasicButtons from '../../../../../$widgets/buttons/basic-buttons';
import Utils from "../../../../../../service/core/utils";
import rgbHex from 'rgb-hex';
import CalendlyModal from '../calendlyModal';
import {useSelector} from "react-redux";
import {InputWithTagsHelper} from "../../input-with-tags/input-with-tags-helper";

const Template2 = (props) => {

    const landingState = useSelector(s => s.landingState)
    const template_id = landingState.template_id;
    const templatePreviewType = landingState.templatePreviewType;
    const [open, openModal] = useState(false);
    const [calendlyLink, setCalendlyLink] = useState(null);

    // console.log("landingState : ",landingState);
    // console.log("template_id : ",template_id);
    // console.log("templatePreviewType : ",templatePreviewType);
    const openLink = (button) => {
        if(button.type=='calendly_link'){
            openModal(true)
            setCalendlyLink(button.link)
        } else {
            window.open(button.link,'_blank');
        }
    }


    return (
        <div className={templatePreviewType=='web'?'landing-pageTwoDesktop':'landing-pageTwoMobile'}
        style={{backgroundColor: landingState?.color1 && Utils.templateColors(landingState?.color1)}} >
            <div className='mainBox'>
                <div className='boxTop'  >
                    <div className='templateImg'>
                        <AppImage name={'2.jpg'} />
                    </div>
                </div>
                <footer className='footerDev'  style={{backgroundColor:landingState?.color2 && Utils.templateColors(landingState?.color2)}}>
                    <div className="boxBottom">
                                <div className="logoBox align-self">
                                    {landingState.logo && <AppImage src={landingState.logo} /> }
                                </div>
                                <div className="footerText align-self">
                                    <div className='templateText'>
                                    {landingState.heading1_visibility &&<h2 className='templateTitle' style={{color: landingState?.color5 &&  Utils.templateColors(landingState?.color5)}} >{InputWithTagsHelper.getTextWithoutTagInfo(landingState.heading1)}</h2>}
                                            <p className='templatePTitle' style={{color:   landingState?.color5 &&   Utils.templateColors(landingState?.color5)}}>{InputWithTagsHelper.getTextWithoutTagInfo(landingState.body)}
                                            </p>
                                    </div>
                                </div>
                                <div className="footerButton " >
                                    <div className='templateText'>
                                        <h4 className='templateSubTitle' style={{color:   landingState?.color5 &&  Utils.templateColors(landingState?.color5)}}>{InputWithTagsHelper.getTextWithoutTagInfo(landingState.heading2)}</h4>
                                    </div>
                                    <div className='templateBtn'>
                                        {landingState && landingState.CTA && landingState.CTA.button1?
                                            < BasicButtons
                                                    color= {Utils.determineTextColor(landingState?.color3)}
                                                    backgroundColor={  landingState?.color3 &&  Utils.templateColors(landingState?.color3)}
                                                    title={InputWithTagsHelper.getTextWithoutTagInfo(landingState.CTA.button1.text)}
                                                    //link={landingState.CTA.button1.link}
                                                    onClick={()=>openLink(landingState.CTA.button1)}
                                                />
                                            :""}
                                                {landingState && landingState.CTA && landingState.CTA.button2?
                                                < BasicButtons
                                                    color= {Utils.determineTextColor(landingState?.color4)}
                                                    backgroundColor={  landingState?.color4 &&  Utils.templateColors(landingState?.color4)}
                                                    title={InputWithTagsHelper.getTextWithoutTagInfo(landingState.CTA.button2.text)}
                                                    //link={landingState.CTA.button2.link}
                                                    onClick={()=>openLink(landingState.CTA.button2)}
                                                />
                                        :""}
                                    </div>
                                </div>
                    </div>
                </footer>
            </div>
            <CalendlyModal
                open={open}
                openModal={openModal}
                calendlyLink={calendlyLink}
            />
        </div>
    );
}

export default Template2;
