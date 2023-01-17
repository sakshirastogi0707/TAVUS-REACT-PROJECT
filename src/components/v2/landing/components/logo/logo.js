import React, {useEffect, useState, useCallback} from 'react';
import _ from 'lodash';
import DropzoneArea from "../../../../$widgets/DropzoneArea/fileuploadArea";
// import ReactCrop from 'react-image-crop'
import ReactCrop from 'react-image-crop';
import Cropper from "./croper"
import './logo.scss'


const ariaLabel = {'aria-label': 'description'};


function SelectLogo  (props) {
    useEffect(() => {
    }, [])

    const [logo, setLogo] = useState({})
    const [crop, setCrop] = useState()


    return (
        <div className='uploadLogo '>
            <div className='titleBox'>
                <h3 className='title'>Upload your logo</h3>
                <h5 className='subtitle'>Only .png and .jpg files are supported</h5>
            </div>
            <div className='position-relative'>
                <div>
                    <Cropper userDetail={props.userDetail} logo={logo}/>
                </div>
            </div>
        </div>
    );
}

export default SelectLogo;
