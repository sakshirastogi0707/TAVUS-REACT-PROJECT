import React, {useEffect, useState, useCallback} from 'react';
import HeaderLanding from "../../../../app-frame/app-header-landing/app-header-landing";
import {Swiper, SwiperSlide} from "swiper/react/swiper-react.js";
import {FreeMode, Navigation, Mousewheel} from "swiper";
import {AppImage} from "../../../../$widgets/images/app-image";
import 'swiper/swiper.scss';
import 'swiper/swiper-bundle.css';
import './template-selector.scss'
import {CampaignService} from "../../../../../service/api/campaign.service";
import {StorageKeys, StorageService, TempStorage} from "../../../../../service/core/storage.service";
import {useDispatch, useSelector} from "react-redux";
import Action from "../../../../../redux/action";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const TemplateSelector = (props) => {
    const landingState = useSelector(s => s.landingState)
    const [selectedTemplateId, setSelectedTemplate] = useState(1)

    const [campaigns, setCampaigns] = useState([])

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleSelect = (id) => {
        setSelectedTemplate(id);
        props.onTemplateChange(id);
        let template =  campaigns.find(element => element.template_id == id);
        let templateName = template?.template_name
         props.layoutName(templateName)
    }

    useEffect(() => {
        setLoading(true)
        CampaignService.getCampaigns('template-selector')
            .then((data) => {
                setLoading(false)
                setCampaigns(data)
            }).catch((e) => {
            console.log('errors while getting templates', e)
            setLoading(false)
        })
    }, [])

    return (
        <div className={'landing-main'}>
            <div className={'align-self-center w-100'}>
                <div className='carouselHeader'>
                    <HeaderLanding
                        userData={props.userDetail}
                        title="Choose your landing page"
                        subtitle={["You'll be able to customize the colors, text, and logo once you've selected a base template.",<br/>, "Expect this step to take 5 minutes."]}/>

                </div>
               <div className={'carousel-main d-flex align-items-center'}>
                    <Swiper
                        spaceBetween={20}
                        mousewheel={false}
                        freeMode={false}
                        slidesPerView={2.5}
                        className={"loaderSwiper"}
                        navigation={true}
                        modules={[FreeMode, Navigation]}
                        onSlideChange={(x) => console.log('slide changed')}
                        // onSwiper={(swiper) => console.log('onSwiper')}
                    >
                        {campaigns.map(({template_id, template_name, carousel_imageUrl}) => {
                            return <SwiperSlide>
                                <li className={`${selectedTemplateId == template_id ? 'active' : ''}`}
                                    onClick={() => handleSelect(template_id)}
                                    key={'slide-' + template_id}>
                                    <AppImage src={carousel_imageUrl}/>
                                    <p>{template_name}</p>
                                </li>
                            </SwiperSlide>
                        })}
                    </Swiper>

                    {loading && <Swiper
                        spaceBetween={20}
                        freeMode={false}
                        slidesPerView={2.5}
                        navigation={true}
                        className={"loaderSwiper"}
                        modules={[FreeMode, Navigation]}
                        onSlideChange={(x) => console.log('slide changed')}
                    >
                        {[1, 2, 3].map((i) => {
                            return <SwiperSlide>
                                <li key={'slide-' + i}>
                                <Stack spacing={1}>
                                    <Skeleton variant="rectangular" width={500} height={330} />
                                    <Skeleton variant="text" />
                                </Stack>
                                </li>
                            </SwiperSlide>
                        })}
                    </Swiper>}

                </div>
            </div>
        </div>
    );
}

export default TemplateSelector;
