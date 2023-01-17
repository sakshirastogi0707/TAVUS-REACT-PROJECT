import React from "react";
import { AppImage } from '../$widgets/images/app-image';

const Header = (props) => {
    

    return (
        <div className="header-main mb-4">
            <div className="text-center">
                <div className={'logo'}>
                    <AppImage name={'logo.svg'} width={'128'} />
                </div>
                <div className={'headerDiv mt-5'}>
                    <h2>{props.title}</h2>
                    <p>{props.subtitle}</p>
                </div>
            </div>
        </div>
    );
}

export default Header;