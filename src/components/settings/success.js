import React from "react";
import { AppImage } from "../$widgets/images/app-image";
import { Grid } from "@material-ui/core";
import './settings.scss';
import _ from 'lodash';
import Loader from "../$widgets/loader/loader"
import { ButtonGray } from "../$widgets/buttons/button-gray";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Alert from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Utils from "../../service/core/utils";

export default function Success(props) {
  let userDomain = props.userDomain
  const getSslNane=(userDomain) =>{
    const userDomainSplit = userDomain.sslname.split(`.${userDomain.domain}`);
    if(userDomainSplit && userDomainSplit.length>0){
        return userDomainSplit[0]
    }
    return ''
  }
  return (
    <div className={'setting-main'}>
        <Grid container className={'ds_setting'} >
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <div className="d-flex justify-content-between">
                    <div className={'setting_title'}>DNS Configuration </div>
                </div>
            </Grid>
        </Grid>
        <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} >
                <div className="top_bar">
                    <h4 className="title"><ArrowBackIcon className="cursor-pointer" onClick={() => props.history.push({pathname: "/settings/",})} /> <span className="align-self">My Domains</span></h4>
                    {/* <p>Lorem ipsum dolor sit amet</p> */}
                </div>
                <div className="top_bar_activeMs">
                    <Alert
                        iconMapping={{
                        success: <CheckCircleOutlineIcon fontSize="inherit" />,
                        }}
                    >
                       Your subdomain is active.
                    </Alert>
                </div>
          </Grid>
        </Grid>
        <Grid container className={'ds'} >
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <div className="setting-Div-sec pb-2">
                    <h4>DNS Configuration </h4>
                </div>
                <div className={'card'}>
                    <div className={'card-body'}>
                    <div className="table-responsive">
                        <table className="table table-fixed">
                        <thead>
                            <tr>
                                <th width="120px">Record type</th>
                                {userDomain.sub_domain  && <th >Host</th> }
                                {userDomain.lbname && <th >Points To</th>}
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {userDomain?.sslname && userDomain?.sslvalue && <td >CNAME</td>}
                                    {userDomain.sslname && <td ><AppImage className="cursor-pointer" onClick={()=>Utils.copyText(getSslNane(userDomain).replaceAll('"','').trim())} name={'copy-icon.svg'} /> {getSslNane(userDomain).replaceAll('"','').trim()} </td>}
                                    {userDomain.sslvalue && <td ><AppImage className="cursor-pointer" onClick={()=>Utils.copyText(userDomain.sslvalue.replaceAll('"','').trim())} name={'copy-icon.svg'} /> {userDomain.sslvalue.replaceAll('"','').trim()}  </td>}
                                </tr>
                                <tr>
                                   
                                    {userDomain?.sub_domain && userDomain?.lbname && <td>CNAME</td>}
                                    {userDomain.sub_domain && <td ><AppImage className="cursor-pointer" onClick={()=>Utils.copyText((userDomain.sub_domain).trim())} name={'copy-icon.svg'} /> {userDomain.sub_domain} </td>}
                                    {userDomain.lbname && <td ><AppImage className="cursor-pointer" name={'copy-icon.svg'} onClick={()=>Utils.copyText(userDomain.lbname.replaceAll('"','').trim())} /> {userDomain.lbname.replaceAll('"','').trim()} </td>}
                                </tr>
                            </tbody>

                        </table>
                    </div>
                    <div className="text-right px-3 pb-4">

                    </div>
                    </div>
                </div>
                {/* <div className="Dev-button  mt-5 text-center">
                    <ButtonGray className="Btn mt-35 mb-5 ml-2" onClick={() => props.backToListing()}>View My Domains</ButtonGray>
                </div> */}
            </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} className="text-right">
            <div className="Dev-button  mt-4">
                <ButtonGray className="Btn mt-35 mb-5 ml-2" onClick={() => props.backToListing()}>View My Domains</ButtonGray>
            </div>
        </Grid>

    </div>
  );
}