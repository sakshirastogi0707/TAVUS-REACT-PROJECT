import React, {useEffect, useState, useCallback} from 'react';
import Header from "../../../../app-frame/app-header/app-header";
import {Swiper, SwiperSlide} from "swiper/react/swiper-react.js";
import {FreeMode, Navigation} from "swiper";
import {AppImage} from "../../../../$widgets/images/app-image";
import 'swiper/swiper.scss';
import 'swiper/swiper-bundle.css';
import './layout.scss'
import {CampaignService} from "../../../../../service/api/campaign.service";
import {StorageKeys, StorageService, TempStorage} from "../../../../../service/core/storage.service";
import {useDispatch, useSelector} from "react-redux";
import Action from "../../../../../redux/action";

const Layout = (props) => {
    const landingState = useSelector(s => s.landingState)
    const [campaigns, setCampaigns] = useState([])
    const [selectedTemplateId, setSelectedTemplate] = useState(1)
    const dispatch = useDispatch()

    const handleSelect = (id) => {
        setSelectedTemplate(id);
        TempStorage.templateId = id

        dispatch({
            type: Action.UpdateLandingState,
            payload: {
                template_id: id,
            },
            origin: 'layout.handleSelect'
        })
    }

    useEffect(() => {
        CampaignService.getCampaigns('layout')
            .then((data) => {
                setCampaigns(data)
            })
    }, [])

    useEffect(() => {
        if (landingState.template_id == 0) return
        setSelectedTemplate(landingState.template_id)
    },[landingState.template_id])

    return (
        <div className='templateBox'>
            <div className='titleBox'>
                <div className='templateTitleFix'>
                    <h3 className='title'>Select a layout</h3>
                </div>
            </div>
            <div className="DevTempBox">
                <div className={'template-layouts-main'}>
                    {campaigns.map(({template_id, template_name, carousel_imageUrl}) => {
                        return <div className={`${selectedTemplateId == template_id ? 'active' : 'imgBox'}`}
                                    onClick={() => handleSelect(template_id)}
                                    key={'slide-' + template_id}>
                            <AppImage className={'image-thumb'} src={carousel_imageUrl}/>
                            <p>{template_name}</p>
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
}

export default Layout;
