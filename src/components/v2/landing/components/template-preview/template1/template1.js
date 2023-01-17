import React, {useEffect, useState, useCallback} from 'react';
import './template1.scss';
import {Grid, Paper, Popper, Grow} from "@material-ui/core";
import {AppImage} from '../../../../../$widgets/images/app-image';
import BasicButtons from '../../../../../$widgets/buttons/basic-buttons';
import Utils from "../../../../../../service/core/utils";
import CalendlyModal from '../calendlyModal';
import rgbHex from 'rgb-hex';
import {useSelector} from "react-redux";
import {InputWithTagsHelper} from "../../input-with-tags/input-with-tags-helper";

const Template1 = (props) => {

    const landingState = useSelector(s => s.landingState)
    const template_id = landingState.template_id;
    const templatePreviewType = landingState.templatePreviewType;
    const [open, openModal] = useState(false);
    const [calendlyLink, setCalendlyLink] = useState(null);

    const openLink = (button) => {
        if(button.type=='calendly_link'){
            openModal(true)
            setCalendlyLink(button.link)
        } else {
            window.open(button.link,'_blank');
        }
    }

    return (
        <div className={templatePreviewType == 'web' ? 'landing-page' : 'landing-page-1'}
            // style={{backgroundColor: landingState?.color1 && '#' + rgbHex(landingState.color1.r, landingState.color1?.g, landingState.color1?.b, landingState.color1?.a)}}
            style={{backgroundColor: landingState?.color1 && Utils.templateColors(landingState?.color1)}}
            >
            <div className='mainBox'>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div className='landing-logo'
                            //style={{backgroundColor: landingState?.color1 && '#' + rgbHex(landingState?.color2.r, landingState.color2?.g, landingState.color2?.b, landingState.color2?.a)}}
                            style={{backgroundColor: landingState?.color2 && Utils.templateColors(landingState?.color2)}}
                            >
                            <div className='LogoImg'>
                                {landingState.logo && <AppImage src={landingState.logo}/>}
                            </div>

                        </div>
                    </Grid>
                    <div className='boxLeft'>
                        <div className='templateImg'>
                            <AppImage name={'1.png'}/>
                        </div>
                    </div>
                    <div className="boxRight">
                        <div className='templateText'>
                            {landingState.heading1_visibility && <h2 className='templateTitle'
                                                                     //style={{color: landingState?.color1 && '#' + rgbHex(landingState.color5.r, landingState.color5?.g, landingState.color5?.b, landingState.color5?.a)}}
                                                                     style={{color: landingState?.color5 && Utils.templateColors(landingState?.color5)}}
                                                                     >
                                {InputWithTagsHelper.getTextWithoutTagInfo(landingState.heading1)}
                            </h2>}
                            <p className='templatePTitle'
                               //style={{color: landingState?.color1 && '#' + rgbHex(landingState.color5.r, landingState.color5?.g, landingState.color5?.b, landingState.color5?.a)}}
                               style={{color: landingState?.color5 && Utils.templateColors(landingState?.color5)}}
                              >{InputWithTagsHelper.getTextWithoutTagInfo(landingState.body)}</p>
                            <h4 className='templateSubTitle'
                                //style={{color: landingState?.color1 && '#' + rgbHex(landingState.color5?.r, landingState.color5?.g, landingState.color5?.b, landingState.color5?.a)}}
                                style={{color: landingState?.color5 && Utils.templateColors(landingState?.color5)}}
                                >{InputWithTagsHelper.getTextWithoutTagInfo(landingState.heading2)}</h4>
                        </div>
                        <div className='templateBtn'>
                            {landingState && landingState.CTA && landingState.CTA.button1 ?
                                < BasicButtons
                                    color={Utils.determineTextColor(landingState?.color3)}
                                    backgroundColor={landingState?.color3 && Utils.templateColors(landingState?.color3)}
                                    //backgroundColor={landingState?.color1 && '#' + rgbHex(landingState.color3.r, landingState.color3?.g, landingState.color3?.b, landingState.color3?.a)}
                                    title={InputWithTagsHelper.getTextWithoutTagInfo(landingState.CTA.button1.text)}
                                    //link={landingState.CTA.button1.link}
                                    onClick={()=>openLink(landingState.CTA.button1)}
                                />
                                : ""}
                            {landingState && landingState.CTA && landingState.CTA.button2 ?
                                <BasicButtons
                                    color={Utils.determineTextColor(landingState?.color4)}
                                    backgroundColor={landingState?.color4 && Utils.templateColors(landingState?.color4)}
                                    //backgroundColor={landingState?.color1 && '#' + rgbHex(landingState.color4.r, landingState.color4?.g, landingState.color4?.b, landingState.color4?.a)}
                                    title={InputWithTagsHelper.getTextWithoutTagInfo(landingState.CTA.button2.text)}
                                    //link={landingState.CTA.button2.link}
                                    onClick={()=>openLink(landingState.CTA.button2)}
                                />
                                : ""}
                        </div>
                    </div>
                </Grid>
            </div>
            <CalendlyModal
                open={open}
                openModal={openModal}
                calendlyLink={calendlyLink}
            />
        </div>
    );
}

export default Template1;
