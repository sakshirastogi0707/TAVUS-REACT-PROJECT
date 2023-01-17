import React, {useEffect, useState, useCallback} from 'react';
import Button from '@mui/material/Button';
import IconLabelButtons from '../../$widgets/buttons/icon-label-buttons'
import './microphone.scss';
import AppDialogInvite from '../../$widgets/AppDialogInvite/AppDialogInvite';

const MicriohoneModal = (props) => {
    const {modelTitle,modelSubTitle } = props;
    useEffect(() => {
        
    },[])

    return (
        <div className='microphoneBox'>
            <AppDialogInvite open={props?.openMicModal}
                maxWidth={'md'}
                className="video-modal"
                customClassMain="microphoneDev"
                onClose={() => props?.setModal(false)}
                content={
                <div className='contentModal'>
                    <div className="DevSection">
                        <h2>{props?.title}</h2>
                        <h6>{props?.subTitle}</h6>
                    </div>
                    
                    <div className='NiceBtnone'>
                        <IconLabelButtons disabled={props?.isLoading} title="Get Started" onClick={props?.onClick} />
                    </div>
                </div>
                }
            />
            
        </div>
    );
}

export default MicriohoneModal;