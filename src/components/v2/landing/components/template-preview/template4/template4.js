import React, {useEffect, useState, useCallback} from 'react';
import './template4.scss';
import {Grid, Paper, Popper, Grow} from "@material-ui/core";
import {AppImage} from '../../../../../$widgets/images/app-image';
import BasicButtons from '../../../../../$widgets/buttons/basic-buttons';
import Utils from "../../../../../../service/core/utils";
import CalendlyModal from '../calendlyModal';
import rgbHex from 'rgb-hex';
import {useSelector} from "react-redux";
import {InputWithTagsHelper} from "../../input-with-tags/input-with-tags-helper";
import { InlineWidget } from "react-calendly";

const Template4 = (props) => {

    const landingState = useSelector(s => s.landingState)
    const template_id = landingState.template_id;
    const templatePreviewType = landingState.templatePreviewType;
    const [open, openModal] = useState(false);
    const [calendlyLink, setCalendlyLink] = useState(null);

    useEffect(() => {
        if(landingState?.CTA?.button1?.link){
            setCalendlyLink(landingState?.CTA?.button1?.link)
        }
    }, [landingState])

    return (
        <div className={templatePreviewType == 'web' ? 'landing-page-fore-desktop' : 'landing-page-fore-mobile'}
            style={{backgroundColor: landingState?.color1 && Utils.templateColors(landingState?.color1)}}
            >
            <div className='mainBox'>
                <Grid container spacing={2}>
                    <Grid item xs={12} className="devpaddin">
                        <div className='landing-logo'
                            style={{backgroundColor: landingState?.color2 && Utils.templateColors(landingState?.color2)}}
                            >
                            <div className='LogoImg'>
                                {landingState.logo && <AppImage src={landingState.logo}/>}
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} className="mainDevBox">
                        <div className='boxLeft'>
                            <div className='templateImg'>
                                <AppImage name={'1.png'}/>
                            </div>
                        </div>
                        <div className="boxRight">
                            {calendlyLink
                            ?  <InlineWidget url={calendlyLink} />
                            :  <AppImage name={'Calendly.jpg'}/>
                            }
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className='templateText'>
                            {landingState.heading1_visibility && <h2 className='templateTitle'
                                style={{color: landingState?.color5 && Utils.templateColors(landingState?.color5)}}
                                >
                                {InputWithTagsHelper.getTextWithoutTagInfo(landingState.heading1)}
                            </h2>}
                            <p className='templatePTitle'
                            style={{color: landingState?.color5 && Utils.templateColors(landingState?.color5)}}
                            >{InputWithTagsHelper.getTextWithoutTagInfo(landingState.body)}</p>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Template4;
