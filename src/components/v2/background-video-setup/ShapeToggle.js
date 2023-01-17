import React from 'react';
import { AvatarShape } from "./../../../enum/common.enum"
import { AppImage } from '../../$widgets/images/app-image';

const SQUARE = AvatarShape.SQUARE, ROUND = AvatarShape.ROUND

const ShapeToggle = props => {
    const { avatarShape, changeAvatarShape } = props
    return <div className='shape-toggle-box'>
       <div className={avatarShape === SQUARE ? 'switch-box selected' : 'switch-box'} onClick={() => changeAvatarShape(SQUARE)}>
            <AppImage name={"rectangle_white.svg"}/>
        </div>
        <div className={avatarShape === ROUND ? 'switch-box selected' : 'switch-box'} onClick={() => changeAvatarShape(ROUND)}>
            <AppImage name={"circle_white.svg"}/>
        </div>
    </div>;    
}

export default ShapeToggle