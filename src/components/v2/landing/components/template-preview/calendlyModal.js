import React, {useEffect, useState, useCallback} from 'react';
import AppDialogCalendly from "../../../../$widgets/AppDialogCalendly/AppDialogCalendly";
import Grid from '@mui/material/Grid';
import { InlineWidget } from "react-calendly";
import _ from 'lodash';
import './calendlymodal.scss';
import LoadingButtons from "../../../../$widgets/buttons/loading-button"

const CalendlyModal = (props) => {
    useEffect(() => {
    },[props.open])
    
    return (
        <div>
            <AppDialogCalendly open={props.open}
                maxWidth={'lg'}
                className="video-modal"
                customClassMain="calendly-modal"
                modelTitle={props.title}
                onClose={()=>props.openModal(false)}
                content={
                    <div className='contentModal'>
                        <div className='tips-tricks-main'>
                            <Grid container>
                                <InlineWidget url={props.calendlyLink} />
                            </Grid>
                        </div>
                    </div>
                        }
                    />
            
        </div>
    );
}

export default CalendlyModal;