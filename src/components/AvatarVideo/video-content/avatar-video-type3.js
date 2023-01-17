import React, {Component} from 'react';
import {ButtonGray, ButtonOutlined} from "../../$widgets/buttons/button-gray";
import { AppImage } from '../../$widgets/images/app-image';
import './AvatarVideo.scss';

function AvatarVideoType3() {
    return <div className="avatarvideotype2-main">
            <AppImage name={'checked_icon.svg'} />
            <h2>You're killing it!</h2>
            <p>You've completed...</p>
            <ButtonOutlined>Begin</ButtonOutlined>
            <ButtonGray>Get Started</ButtonGray>
        </div>
       
}


export default (AvatarVideoType3);