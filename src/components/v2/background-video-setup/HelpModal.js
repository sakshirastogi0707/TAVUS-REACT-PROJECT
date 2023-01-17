import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const modalStyles = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#1E1F25',
    boxShadow: 24,
    padding: 0,
};

function HelpModal(props) {
    return <Modal sx={modalStyles} className='info-modal'
    open={props.open}
    disableEnforceFocus={true}
    onClose={props.onClose}
    >
        <Box>
            <div className='header-wrapper'>
                <div className='header-text'>How to use a dynamic video?</div>
                <div className='close-icon-wrapper'>
                    <img src={`../../assets/images/close_circle2.svg`} onClick={props.onClose}/>
                </div>
            </div>
            <div className='info-image-wrapper'>
                <img src='../../assets/images/dynamic-modal-image.png'></img>
            </div>
            <div className='info-text'>
                Id quam gravida eget sem. Elit pellentesque ipsum purus velit, mauris habitasse viverra nibh. 
                Justo, aliquet donec lacinia montes, amet platea bibendum.Id quam gravida eget sem. 
                Elit pellentesque ipsum purus velit, mauris habitasse viverra nibh.
                Justo, aliquet donec lacinia montes, amet platea bibendum.
            </div>
            <div className='cta-wrapper'>
                <Button variant='contained' size="large">Example Video</Button>
            </div>
        </Box>
    </Modal>
}

export default HelpModal;