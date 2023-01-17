import React from "react";
import { AppImage } from "../$widgets/images/app-image";
import { Grid } from "@material-ui/core";
import './settings.scss';
import _ from 'lodash';
import Loader from "../$widgets/loader/loader"
import { ButtonGray } from "../$widgets/buttons/button-gray";
import MuiAlert from "../$widgets/mui-alert/mui-alert"
import Utils from "../../service/core/utils";

export default function Pending(props) {
  const {isLoadingValidate, userDomain, msgValidate} = props
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
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div className={'DnsAction '}>
                        <h4>Your action is required</h4>
                        <p><strong>IMPORTANT! </strong>  
                            You <b>must</b> complete this setup within 48 hours, or the validation period will expire and you will have to restart the process
                        </p> 
                        
                    </div>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12} >
                    <div className={'DnsActionBox'}>
                    <h4>Step 1.</h4>
                        <p> Apply the following DNS configuration to use your domain for video links.</p>
                         
                        <p>All you have to do is "point" these records to Tavus, and make sure that all pre existing records of type A, AAAA or CNAME for the host <b color="#fff">" {userDomain.sub_domain} " </b> ﻿are removed.</p>
                     </div>
                     <div className={'DnsActionBox'}>
                     <h4>Step 2.</h4>
                        <p> After you have added these details in your DNS provider, it takes at least half an hour for your changes to propagate. </p>
                        <p>Come back here after half an hour and click "Validate Now" to check if your changes have propagated, and finish the setup.
                        </p> 
                    </div>
                </Grid>
              </Grid>
        <Grid container className={'ds DnsConfig'} >
        {/* {isLoadingValidate ? <Loader /> : */}
            <Grid item xs={12} sm={12} md={12} lg={12}>
                {/* <div className="setting-Div-sec">
                    <h4>Mandatory</h4>
                    <p>Apply the following DNS configuration to turn any domain into your own link shortener. All you have to do is "point" your <strong> A </strong> Records to Tavus, and make sure that all pre existing records of type <strong>A, AAAA</strong> or <strong>CNAME </strong> for test are removed.</p>
                    <p><strong>After you have added these details in your DNS provider, it takes about half an hour for configuration to complete. You can validate your domain after 30 mins.</strong></p>
                    <p>For any support please contact us at <a href="mailto:support@tavus.io">support@tavus.io</a></p>
                </div> */}
                <div className={'card'}>
                <div className={'card-body'}>
                    <div className="table-responsive">
                    {/* {isLoadingValidate ? <Loader /> : */}
                        <table className="table table-fixed">
                            <thead>
                            <tr>
                                <th width="15%" className="table_title">Record type</th>
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
                                    {userDomain.sub_domain && <td ><AppImage className="cursor-pointer" onClick={()=>Utils.copyText((userDomain.sub_domain).trim())} name={'copy-icon.svg'} /> {userDomain.sub_domain } </td>}
                                    {userDomain.lbname && <td ><AppImage className="cursor-pointer" name={'copy-icon.svg'} onClick={()=>Utils.copyText(userDomain.lbname.replaceAll('"','').trim())} /> {userDomain.lbname.replaceAll('"','').trim()}  </td>}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="text-right px-3 pb-4">

                    </div>
                </div>
                </div>
            </Grid>
            
            {/* } */}
        </Grid>
        <Grid container className="mt-4 mb-5">
                <Grid item xs={12} sm={12} md={8} lg={8} className="AlertMs align-self">
                    <MuiAlert
                        messsage= {msgValidate.messsage}
                        open={msgValidate.open}
                        type={msgValidate.type}
                        color={msgValidate.background}
                        closeCollapse={props.closeCollapse}
                        domain={userDomain}
                        makeDefault={props.makeDefault}
                    />
                    {isLoadingValidate && !msgValidate.open &&  <div className="position-relative">
                        {/* <div><Loader /> </div> */}
                        <div className="validateMs"><h4>Validating your records  <AppImage name={'loader-anim.png'} className="rotate" width="22" /></h4></div>
                    </div>}
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} className="text-right">
               
                <div className="Dev-button ml-3 ">
                    {!userDomain.validate_ssl ? 
                        <ButtonGray 
                            className={
                                "Btn " +
                                (isLoadingValidate ? "disabled-submit " : " ") +
                                ""
                            }
                            onClick={() => props.validateDomain(userDomain?.id)}
                        >{isLoadingValidate ? 'Please wait...' : 'Validate'}</ButtonGray>
                    :
                        <ButtonGray className="Btn " onClick={() => props.backToListing()}>View My Domains</ButtonGray>
                    }
                </div>
            </Grid>
        </Grid>
    </div>
  );
}