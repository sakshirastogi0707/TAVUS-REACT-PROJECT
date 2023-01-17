import React from 'react';
import { AppImage } from '../../$widgets/images/app-image';

const formatFileSize = size => {
    let f = Math.round(size / (1024 * 1024));
    return `${f} mb`;
}

const StaticBlock = props => {
    let { uploadedFile,
        onClick,
        onDragOver,
        onDrop,
        onTrashClick,
        onChange,
        mediaTemplate,
        fileInputRef
     } = props

     const getUploadedFileName = () => {
        if (uploadedFile) {
            return uploadedFile.name
        }
        if (mediaTemplate?.assets?.background_video?.filename) {
            return mediaTemplate.assets.background_video.filename
        }
        return "video file"
     }

     const getUploadedFileSize = () => {
        if (uploadedFile) {
            return uploadedFile.size
        }
        if (mediaTemplate?.assets?.background_video?.filename) {
            return mediaTemplate.assets.background_video.size
        }
        return 0
     }

     let storageLink = mediaTemplate?.assets?.background_video?.storage_link
    if (uploadedFile === null && !storageLink) {
        return <>
        <div className='drag-and-drop-block' onDrop={onDrop} onClick={onClick} onDragOver={onDragOver}>
            <div className='drag-and-drop-block-cover'>
                <div className='drag-drop-icon-wrapper'>
                    <AppImage name={"cloud-upload.svg"}/>
                </div>
                <div className='drag-drop-text-wrapper'>
                    Drag and drop or browse to<br/> choose a file
                </div>
            </div>
            <input type='file' hidden ref={fileInputRef} onChange={onChange} accept="image/*, video/*"></input>
        </div>
        </>
    } else {
        return <>
        <div className='file-info-block-wrapper'>
            <div className='file-info-block'>
                <div className='icon'>
                    <img src={`../../../assets/images/video_icon.png`}/>
                </div>
                <div className='info'>
                    <div className='info-inner'>{getUploadedFileName()}</div>
                    <div className='info-inner sub'>{formatFileSize(getUploadedFileSize())}</div>
                </div>
                <div className='icon trash' onClick={onTrashClick}>
                    <img src={`../../../assets/images/trash.png`}/>
                </div>
            </div>
        </div>
        </>
    }
}
export default StaticBlock