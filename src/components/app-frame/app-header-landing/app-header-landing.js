import React, { useEffect, useState } from "react";
import { AppImage } from '../../$widgets/images/app-image';
import './app-header-landing.scss';
import MyAccount from "./../my-account/my-account"
import  AdminService  from "../../../service/api/admin.service";
import {
    StorageService,
    StorageKeys,
  } from "../../../service/core/storage.service";

const HeaderLanding = (props) => {
    const [user, setUser] = React.useState(false);
    
    useEffect(() => {
        setUser(props?.userData)
    }, [props?.userData]);

    return (
        <div className="header-main-landing">
            {props?.userData && user?.steps && user?.steps?.registration && <div className="AccountBox"><MyAccount user={props?.userData}/></div>}
        <div className="d-md-flex justify-content-md-start">
            <div className={'logo align-self'}>
                <AppImage name={'logo.svg'} width={'122'} />
            </div>
        </div>
            <div className={'headerDiv text-center'}>
                <h2>{props.title}</h2>
                <p>{props.subtitle}</p>
            </div>
        </div>
    );
}

export default HeaderLanding;