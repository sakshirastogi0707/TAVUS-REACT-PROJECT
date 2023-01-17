import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const modalStyles = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: "#1E1F25",
    boxShadow: 24,
    padding: 0,
};
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#303443",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: "white",
}));

// dummy content to be removed later
const titles = [
    "How long should my video be? ",
    "What does a good landing page look like?",
    "What are good call to actions?",
    "What are good call to actions?",
    "What are good call to actions?",
    "What are good call to actions?",
    "How to create a stunning video title"
];

function getBlock(title, index) {
    return <Grid item xs={6} key={index}>
    <Item className='modal-item'>
        <h3>{title}</h3>
        <div className='modal-item-content'>
            Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit. 
            Aliquam felis tellus nunc imperdiet dictumst in consequat gravida amet. 
        </div>
        <div className='cta-wrapper'>
            <Button variant='contained'>
                Read More &nbsp;
                <img src={`../../../assets/images/arrow-left1.svg`}/>
            </Button>
        </div>
    </Item>
    </Grid>;
}

const TipsTricksModal = props => {
    return <Modal sx={modalStyles} className='info-modal'
        open={props.open}
        disableEnforceFocus={true}
        onClose={props.onClose}
    >
        <Box>
            <div className='header-wrapper'>
                <div className='header-text'>Tips &#38; Tricks</div>
                <div className='close-icon-wrapper'>
                    <img src={`../../../assets/images/close_circle2.svg`} onClick={props.onClose}/>
                </div>
            </div>
            <div className='subheading'>Here’s some great content on how to make an engaging video!</div>
            <Box sx={{ flexGrow: 1 }} className="wrapper-box">
                <Grid container spacing={2}>
                    {titles.map((title, index) => getBlock(title, index))}   
                </Grid>
            </Box>        
        </Box>
    </Modal>
}

export default TipsTricksModal