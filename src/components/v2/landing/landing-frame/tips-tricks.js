import React, {useEffect, useState, useCallback} from 'react';
import AppDialog from "../../../$widgets/AppDialog/AppDialog";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import _ from 'lodash';
import './tips-tricks.scss';
import LoadingButtons from "../../../$widgets/buttons/loading-button"

const TipsTricks = (props) => {
    useEffect(() => {
    },[props.open])
    

    return (
        <div>
            <AppDialog open={props.open}
                maxWidth={'lg'}
                className="video-modal"
                customClassMain="tips-tricks"
                modelTitle={props.title}
                onClose={()=>props.setOpenModal(false)}
                modelSubTitle={"Here’s some great content on how to make an engaging video!"}
                content={
                    <div className='contentModal'>
                        <div className='tips-tricks-main'>
                            <Grid container>
                                {props.data && props.data.map((item, key) => {
                                    return<Grid  key={key} xs={6} className="tricks-box">
                                            <div className='tips-tricks-box'>
                                                <div className='tips-cont'>
                                                    <h3>{item?.Title} </h3>
                                                    <p>{item?.Paragraph}</p>
                                                </div>
                                                <div className='float-right buttonRight'>
                                                    <LoadingButtons 
                                                        onClick={props.onClick} 
                                                        className={props.className} 
                                                        title={ item?.BtnTitle}
                                                        isLoading={props.isLoading}
                                                    />
                                                </div>
                                            </div>
                                </Grid> 
                                })}
                                
                            </Grid>
                        </div>
                    </div>
                        }
                    />
            
        </div>
    );
}

export default TipsTricks;