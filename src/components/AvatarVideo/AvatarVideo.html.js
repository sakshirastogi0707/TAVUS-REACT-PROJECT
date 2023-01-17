import React from "react";
import {ButtonGray} from "../$widgets/buttons/button-gray";
import avatarVideoType1 from "./video-content/avatar-video-type1";
import avatarVideoType2 from "./video-content/avatar-video-type2";

export function html() {
    const {} = this.state;
    const {} = this.props;
    return (
        <div className={'avatar-video-main'}>
            <AvatarVideoType1 />
            <AvatarVideoType2 />

        </div>
    );
}