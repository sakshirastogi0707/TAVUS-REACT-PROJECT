import React, {useEffect, useState} from 'react';
import {AppImage} from "../../../../$widgets/images/app-image";
import Accordian from "../../../../$widgets/accordion/accordion";
import { SketchPicker} from 'react-color'
import {connect, useDispatch, useSelector} from 'react-redux'
import Action from "../../../../../redux/action";
import {StorageKeys, StorageService, TempStorage} from "../../../../../service/core/storage.service";
import { UserService } from '../../../../../service/api/user-service';
import './pik-color.scss'
import rgbHex from 'rgb-hex';
import { lineHeight } from '@mui/system';
import { SegmentService } from '../../../../../service/api/segment.service';

const PikColor = (props) => {

    const landingState = useSelector(s => s.landingState)
    const [background, setBackground] = useState({
        color1: '',color2: '',color3: '',color4: '',color5: ''
    });
    const dispatch = useDispatch()
    const [expandedPanel, setExpandedPanel] = useState(false);

    useEffect(() => {
        setBackground({
            color1: landingState.color1,
            color2: landingState.color2,
            color3: landingState.color3,
            color4: landingState.color4,
            color5: landingState.color5,
        });
    }, [landingState.background])

    const handleChangeComplete = (color, choice) => {
        dispatch({
            type: Action.UpdateLandingState,
            payload: {
                color1: choice=='color1' ? color.rgb : landingState.color1,
                color2: choice=='color2' ? color.rgb : landingState.color2,
                color3: choice=='color3' ? color.rgb : landingState.color3,
                color4: choice=='color4' ? color.rgb : landingState.color4,
                color5: choice=='color5' ? color.rgb : landingState.color5,
            },
            origin: 'color-picker.handleChangeComplete'
        })
    };

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        if(expandedPanel){
            SegmentService.analyticsTrack('Colors Configured', {
                [expandedPanel]: landingState[expandedPanel],
            })
        }
        setExpandedPanel(isExpanded ? panel : false);
    };

    return (
        <div className='colorPick'>
            <div className='titleBox'>
                <h3 className='title'>Colors</h3>
                <h5 className='subtitle'>Let’s pick out some cool colors</h5>
            </div>
            <div className="DevTempBox">
                <div>
                    <Accordian
                        expanded={expandedPanel === 'color1'}
                        onChange={handleAccordionChange('color1')}
                        text={<span><span className='boxIcon' style={{backgroundColor: landingState.color1?.r ? '#'+rgbHex(landingState.color1?.r, landingState.color1?.g, landingState.color1?.b, landingState.color1?.a): landingState.color1}}></span><span className='buttonText'>Background 1</span></span> }
                        value = {
                            <div className='colorDiv'>
                            <SketchPicker
                                color={ landingState.color1 }
                                presetColors={[]}
                                onChangeComplete={(event)=>handleChangeComplete(event, 'color1') }
                            />
                            </div>
                        }
                    />
                </div>
                <div>
                    <Accordian
                        expanded={expandedPanel === 'color2'}
                        onChange={handleAccordionChange('color2')}
                        text={<span><span className='boxIcon' style={{backgroundColor: landingState.color2?.r ? '#'+rgbHex(landingState.color2?.r, landingState.color2?.g, landingState.color2?.b, landingState.color2?.a): landingState.color2}}></span><span className='buttonText'>Background 2</span></span> }
                        value = {
                            <SketchPicker
                                color={ landingState.color2 }
                                presetColors={[]}
                                onChangeComplete={(event)=>handleChangeComplete(event, 'color2') }
                            />
                        }
                    />
                </div>
                {landingState.template_id !=4 &&
                    <>
                         <div>
                            <Accordian
                                expanded={expandedPanel === 'color3'}
                                onChange={handleAccordionChange('color3')}
                                text={<span><span className='boxIcon' style={{backgroundColor: landingState.color3?.r ? '#'+rgbHex(landingState.color3?.r, landingState.color3?.g, landingState.color3?.b, landingState.color3?.a): landingState.color3}}></span><span className='buttonText'>Button 1</span></span> }
                                value = {
                                    <SketchPicker
                                        color={ landingState.color3 }
                                        presetColors={[]}
                                        onChangeComplete={(event)=>handleChangeComplete(event, 'color3') }
                                    />
                                }
                            />
                        </div>
                        <div>
                            <Accordian
                                expanded={expandedPanel === 'color4'}
                                onChange={handleAccordionChange('color4')}
                                text={<span><span className='boxIcon' style={{backgroundColor: landingState.color4?.r ? '#'+rgbHex(landingState.color4?.r, landingState.color4?.g, landingState.color4?.b, landingState.color4?.a): landingState.color4}}></span><span className='buttonText'>Button 2</span></span> }
                                value = {
                                    <SketchPicker
                                        color={ landingState.color4 }
                                        presetColors={[]}
                                        onChangeComplete={(event)=>handleChangeComplete(event, 'color4') }
                                    />
                                }
                            />
                        </div>
                    </>
                }
               
                <div>
                    <Accordian
                        expanded={expandedPanel === 'color5'}
                        onChange={handleAccordionChange('color5')}
                        text={<span><span className='boxIcon' style={{backgroundColor: landingState.color5?.r ? '#'+rgbHex(landingState.color5?.r, landingState.color5?.g, landingState.color5?.b, landingState.color5?.a): landingState.color5}}></span><span className='buttonText'>Text</span></span> }
                        value = {
                            <SketchPicker
                                color={ landingState.color5 }
                                presetColors={[]}
                                onChangeComplete={(event)=>handleChangeComplete(event, 'color5') }
                            />
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default PikColor;
