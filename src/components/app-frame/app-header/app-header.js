import React, { useEffect, useState } from "react";
import { AppImage } from '../../$widgets/images/app-image';
import  './app-header.scss';
import MyAccount from "./../my-account/my-account"

const Header = (props) => {
        
    useEffect(() => {
        
    }, [props.userData]) 
    
    return (
        <div className="header-main">
            {(props?.userData  && (props?.userData?.steps && props?.userData?.steps?.registration) || props?.userData?.role=='admin') && <div className="AccountBox"><MyAccount user={props?.userData}/></div>}
            <div className="text-center">
                <div className={'logo'}>
                    <AppImage name={'logo.svg'} width={'122'} />
                </div>
                <div className={'headerDiv'}>
                    <h2>{props?.title}</h2>
                    <p>{props?.subtitle}</p>
                </div>
            </div>
        </div>
    );
}

export default Header;