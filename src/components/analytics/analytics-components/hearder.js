import React from 'react';
import { Grid } from "@material-ui/core";
import SingleDropdown from "../../$widgets/dropdown/singledropdown"
import { AppImage } from "../../$widgets/images/app-image";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const header = (props) => {
    const { tab } = props
    return (
        <Grid container className={'toolbar'}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <div className="pointer-class d-flex d-flex-mobile justify-content-start">
                    <div onClick={()=>props.handleTabChange(1)} style={tab && tab ==1 ? {color: '#DDDEE3'} : {color: '#757B8C'}} className={'title'}>Analytics {tab !== 1 &&<ArrowForwardIosIcon />}</div>
                    {tab !== 1 &&
                        <div className={'dropdown_main'}>
                            <AppImage name={'icon09.svg'} width='20' />
                            <SingleDropdown
                                placeholder={<span className={tab&& tab ==1 ? 'stylew1' : 'stylew2'}>All campaigns</span>}
                                options={props.allTemplates}
                                onChange={props.changeTemplate}
                                value=''
                                className={'stylew'}
                            />
                        </div>
                    }
                    
                    {( tab == 3 ||tab == 2) &&
                        <div onClick={()=>props.handleTabChange(2)} style={tab&& tab ==2 ? {color: '#DDDEE3'} : {color: '#757B8C'}} className={'pointer-class title'}>
                            {props?.selectedTemplate?.label}
                        </div>
                    }
                    {tab == 3 &&
                        <>
                            <div className={'title'}><ArrowForwardIosIcon /></div>
                            <div style={tab && tab==3 ? {color: '#DDDEE3'} : {color: '#757B8C'}} className={'title'}>
                            Leads
                            </div>
                        </>
                    }
                </div>
            </Grid>
        </Grid>
    )
}

export default header;