import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { VideoType } from './../../../enum/common.enum';

const STATIC = VideoType.STATIC

const isVideo = file => {
    return !file.type.includes("image")
}
const isVideoUrl = url => {
    return !(url.includes(".png") || url.includes(".jpg") || url.includes(".jpeg"))
}

const RightPanel = props => {
    const {
        isGenerating, videoType, uploadedFile, src, previewLink, generatingMessage
    } = props
    if (isGenerating) {
        return <>
            <div className='progress-wrapper'>
                <CircularProgress />
                <div className='progress-text'>
                    {generatingMessage}
                </div>
            </div>
        </>;
    }
    if (videoType === STATIC) {
        if (uploadedFile === null && !src) {
            return <>Background Video</>;
        }
        if (uploadedFile === null && !!src) {
            return <>
                {isVideoUrl(src) ? <video controls src={src}></video> : <img src={src}></img>}
            </>;
        }
        return <>
            {isVideo(uploadedFile) ? <video controls src={src}></video> : <img src={src}></img>}
        </>;
    }
    // dynamic case 
    if (previewLink === null) {
        return <>Background Preview</>;
    }
    return <>
        <video controls src={previewLink}></video>
    </>;
}

RightPanel.defaultProps = {
    generatingMessage : "Generating your background video sample, this will take around 30 seconds"
}

export default RightPanel