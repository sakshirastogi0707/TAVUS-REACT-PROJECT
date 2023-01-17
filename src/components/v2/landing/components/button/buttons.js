import React, {useEffect, useState, useCallback} from 'react';
import _ from 'lodash';
import Accordian from "../../../../$widgets/accordion/accordion";
import Inputs from "../../../../$widgets/input-fields/input-field"
import {connect, useDispatch, useSelector} from 'react-redux'
import Action from "../../../../../redux/action";
import {StorageKeys, StorageService, TempStorage} from "../../../../../service/core/storage.service";
import IconLabelButtons from '../../../../$widgets/buttons/icon-label-buttons'
import IconText from '../../../../$widgets/input-fields/image-field'
import AppDialogCenter from "../../../../$widgets/AppDialogCenter/AppDialogCenter"
import './buttons.scss'
import {AppImage} from '../../../../$widgets/images/app-image';
import Textarea from '../../../../$widgets/input-fields/text-area'
import { UserService } from '../../../../../service/api/user-service';
import { SegmentService } from '../../../../../service/api/segment.service';
const ariaLabel = {'aria-label': 'description'};

export const SIDEBAR_NAV_ITEMS = [
    {name: ' Go to the calendly meeting you want to use', id: '1'},
    {name: ' Copy the “Share” link', id: '2'},
    // {name: ' Navigate to “Add to website”', id: '3'},
    // {name: ' Configure how you want it to look', id: '4'},
    {name: ' Paste below', id: '3'},
]
function SelectButton(props) {

    const landingState = useSelector(s => s.landingState)
    const dispatch = useDispatch()
    const [expandedPanel, setExpandedPanel] = useState(false);
    const [isLoading, setLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [selectedButton, setSelectedButton] = useState('')
    const [button1, setButton1] = useState({
        link: '', text: '', type: ''
    });
    const [button2, setButton2] = useState({
        link: '', text: '', type: ''
    });

    const [calendly, setSetCalendly] = useState('')
    const [error, setError] = useState(null)

    useEffect(() => {
        setButton1({
            link: landingState?.CTA?.button1?.link,
            text: landingState?.CTA?.button1?.text,
            type: landingState.template_id==4 ? 'calendly_link' :landingState?.CTA?.button1?.type ,
        });
        setButton2({
            link: landingState?.CTA?.button2?.link,
            text: landingState?.CTA?.button2?.text,
            type: landingState?.CTA?.button2?.type,
        });
    }, [landingState])

    useEffect(() => {
    }, [button1, button2])

    const onChangeButton1 = (event) => {
        const {name, value} = event.target
        let button1 = landingState.CTA?.button1
        let button2 = landingState.CTA?.button2
        button1[name] = value

        setButton1(button1)
        dispatchData(button1, button2)
    }

    const onChangeButton1_tagified = (name, value) => {
        let button1 = landingState.CTA?.button1
        let button2 = landingState.CTA?.button2
        let name2 = name.includes('_text') ? 'text' : 'link'
        button1[name2] = value

        setButton1(button1)
        dispatchData(button1, button2)
    }

    const dispatchData = (button1, button2) => {
        dispatch({
            type: Action.UpdateLandingState,
            payload: {
                CTA: {button1, button2},
            },
            origin: 'button.dispatchData'
        })
    }

    const onChangeButton2 = (event) => {
        const {name, value} = event.target
        let button1 = landingState.CTA?.button1
        let button2 = landingState.CTA?.button2
        button2[name] = value
        setButton2(button2)
        dispatchData(button1, button2)
    }

    const onChangeButton2_tagified = (name, value) => {
        let button1 = landingState.CTA?.button1
        let button2 = landingState.CTA?.button2
        let name2 = name.includes('_text') ? 'text' : 'link'
        button2[name2] = value
        setButton2(button2)
        dispatchData(button1, button2)
    }

    const removeButton = (button) => {
        let ctaButtons = landingState.CTA
        delete ctaButtons[button]
        dispatch({
            type: Action.UpdateLandingState,
            payload: {
                CTA: ctaButtons,
            },
            origin: 'button.removeButton'
        })
    }

    const addButton = () => {
        let ctaButtons = landingState.CTA
        if (ctaButtons.button1) {
            ctaButtons.button2 = {
                text: 'CTA Button 2',
                link: 'https://www.tavus.io/',
                type: 'normal_link',
            }
        } else {
            ctaButtons.button1 = {
                text: 'CTA Button 1',
                link: 'https://www.tavus.io/',
                type: 'normal_link',
            }
        }
        dispatch({
            type: Action.UpdateLandingState,
            payload: {
                CTA: ctaButtons,
            },
            origin: 'button.addButton'
        })
    }

    const openCalendlyModal = (button) => {
        if (button == 'button1') {
            setSetCalendly(landingState.CTA?.button1.link)
        } else {
            setSetCalendly(landingState.CTA?.button2.link)
        }

        setButton1(button1)
        setSelectedButton(button)
        setError('')
        setOpenModal(true)
    }

    const NormalLink = (button) => {
        let ctaButtons = landingState.CTA
        if (button == 'button1') {
            ctaButtons.button1 = {
                text: landingState.CTA?.button1.text,
                link: landingState.CTA?.button1.link,
                type: 'normal_link',
            }
            setButton1(ctaButtons.button1)
        } else {
            ctaButtons.button2 = {
                text: landingState.CTA?.button2.text,
                link: landingState.CTA?.button2.link,
                type: 'normal_link',
            }
            setButton2(ctaButtons.button2)
        }
    }

    const handleCalendly = (event) => {
        setSetCalendly(event.target.value)
    }

    const submitCalendly = () => {
        let ctaButtons = landingState.CTA
        let embebdCode = calendly.replace(/<\!--.*?-->/g, "")
        if(!embebdCode.includes('calendly')){
            return setError('Not a valid calendly link.')

        }
        if (!embebdCode) {
            return setOpenModal(false)
        }
        if (selectedButton == 'button1') {
            ctaButtons.button1.link = embebdCode.toString()
            ctaButtons.button1.type = 'calendly_link'
        } else {
            ctaButtons.button2.link = embebdCode.toString()
            ctaButtons.button2.type = 'calendly_link'
        }
        dispatch({
            type: Action.UpdateLandingState,
            payload: {
                CTA: ctaButtons,
            },
            origin: 'button.submitCalendly'
        })
          SegmentService.analyticsTrack('Button Configured', {
            selectedButton: selectedButton,
            calendly: embebdCode.toString(),
            type: 'calendly_link',
        })
        setOpenModal(false)
    }

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpandedPanel(isExpanded ? panel : false);
    };

    return (
        <div className={'create-buttonLink'}>
            <div className='titleBox'>
                <h3 className='title'>Buttons</h3>
                <h5 className='subtitle'>Create engaging call-to-actions</h5>
            </div>
        <div className='button-variable'>
            {button1.type &&
            <div className='closeBtn'>
                <Accordian
                    text="Button 1"
                    expanded={expandedPanel === 'button1'}
                    onChange={handleAccordionChange('button1')}
                    value={
                        <div>
                            <div>
                                {landingState.template_id !=4 &&
                                    <div className='ButtonVariable'>
                                    <div className='align-self'>
                                        <AppImage name={'az.svg'} />
                                    </div>
                                    <div className='VariableText'>
                                        <label>Button Text</label>
                                        <div className=''>
                                        <IconText
                                            campaignId={props.campaignId}
                                            onBlur={() => SegmentService.analyticsTrack('Button Configured', {
                                                'button1.text': button1?.text,
                                                type: button1.type,
                                            })}
                                            placeholder={button1?.placeholder?button1?.placeholder:'CTA BUTTON 1'}
                                            textIcon="az.svg" value={button1?.text} onChange={onChangeButton1_tagified}
                                            label="Button Text" name={'button1_text'} taggedInput={true}/>
                                        </div>

                                    </div>
                                </div>
                                }
                                

                            </div>
                            {button1.type == 'calendly_link'
                                ? <div className='CalendlyBtn'><IconLabelButtons
                                    onClick={() => openCalendlyModal('button1')} title="Configure Calendly"
                                    startIcon="calendly-icon.svg"/></div>
                                    :
                                        <div className='ButtonVariable'>
                                            <div className='align-self'>
                                                <AppImage name={'link.svg'} />
                                            </div>
                                            <div className='VariableText'>
                                                <label>Button Link</label>
                                                <div className=''>
                                                <IconText
                                                    campaignId={props.campaignId}
                                                    onBlur={() =>
                                                                SegmentService.analyticsTrack('Button Configured', {
                                                                    'button1.link': button1?.link,
                                                                   type: button1.type,
                                                               })
                                                           }
                                                    placeholder={'link email.com'}
                                                    textIcon="link.svg" value={button1?.link} onChange={onChangeButton1_tagified}  taggedInput={true}
                                                   label="Button Link" name={'button1_link'}/>
                                                </div>

                                            </div>
                                        </div>
                            }
                            {landingState.template_id !=4 && <>
                                <div className='hrDiv'>
                                <hr/>
                                </div>
                                {button1.type == 'normal_link'
                                    ? <div className='CalendlyBtn'><IconLabelButtons
                                        onClick={() => openCalendlyModal('button1')} title="Embed Calendly"
                                        startIcon="calendly-icon.svg"/></div>
                                    : <div className='CalendlyBtn UseCalendlyBtn'>
                                        <IconLabelButtons onClick={() => NormalLink('button1')} title="Use Normal Link"/></div>
                                }
                            </>}

                        </div>
                    }
                />
                {landingState.template_id !=4 &&
                    <div className='closeIcon'>
                        <AppImage onClick={() => removeButton('button1')} name={'cross-icon.svg'}/>
                    </div>
                }
            </div>
            }
            {landingState.template_id !=4 && button2.type &&
            <div className='closeBtn'>
                <div>
                    <Accordian
                        text="Button 2"
                        expanded={expandedPanel === 'button2'}
                        onChange={handleAccordionChange('button2')}
                        value={
                            <div>
                                <div >
                                <div className='ButtonVariable'>
                                    <div className='align-self'>
                                        <AppImage name={'az.svg'} />
                                    </div>
                                    <div className='VariableText'>
                                        <label>Button Text</label>
                                        <IconText
                                            campaignId={props.campaignId}
                                            onBlur={() =>
                                                SegmentService.analyticsTrack('Button Configured', {
                                                    'button2.text': button2?.text,
                                                    type: 'normal_link',
                                                })
                                            }
                                            textIcon="az.svg" value={button2?.text} onChange={onChangeButton2_tagified}
                                            label="Button Text" name={'button2_text'}
                                            placeholder={button2?.placeholder?button2?.placeholder:'CTA BUTTON 2'}
                                            taggedInput={true}
                                        />
                                    </div>
                                </div>
                                </div>
                                {button2.type == 'calendly_link'
                                    ? <div className='CalendlyBtn'><IconLabelButtons
                                        onClick={() => openCalendlyModal('button2')} title="Configure Calendly"
                                        startIcon="calendly-icon.svg"/></div>
                                    :
                                        <div className='ButtonVariable'>
                                        <div className='align-self'>
                                            <AppImage name={'link.svg'} />
                                        </div>
                                        <div className='VariableText'>
                                            <label>Button Link</label>
                                            <div className=''>
                                            <IconText
                                                campaignId={props.campaignId}
                                                onBlur={() =>
                                                           SegmentService.analyticsTrack('Button Configured', {
                                                               'button2.link': button2?.link,
                                                               type: 'normal_link',
                                                           })
                                                       }
                                                placeholder={'link email.com'}
                                                textIcon="link.svg" value={button2?.link} onChange={onChangeButton2_tagified}
                                                label="Button Link" name={'button2_link'}
                                                taggedInput={true}/>
                                            </div>

                                        </div>
                                    </div>
                                }
                                {/* <div><IconText value={button2?.link} onChange={onChangeButton2}  label="Button Link"  name={'link'} /></div> */}
                                <div className='hrDiv'>
                                    <hr/>
                                </div>
                                {button2.type == 'normal_link'
                                    ? <div className='CalendlyBtn'><IconLabelButtons
                                        onClick={() => openCalendlyModal('button2')} title="Embed Calendly"
                                        startIcon="calendly-icon.svg"/></div>
                                    :
                                    <div className='CalendlyBtn UseCalendlyBtn'><IconLabelButtons onClick={() => NormalLink('button2')}
                                                                                   title="Use Normal Link"/></div>
                                }
                            </div>
                        }
                    />
                </div>
                <div className='closeIcon'>
                    <AppImage onClick={() => removeButton('button2')} name={'cross-icon.svg'}/>
                </div>
            </div>
            }
            {landingState.template_id !=4 && (!button2.type || !button1.type) &&
            <div className='calendlyAddButton'><IconLabelButtons onClick={addButton} title="Add Button" startIcon="apps-add.svg"/></div>
            }
            {/* {(!button2.type || !button1.type) &&
                    <div className='calendlyAddButton'><IconLabelButtons onClick={addButton} title="Add Button" startIcon="apps-add.svg"/></div>
                } */}
            <AppDialogCenter setOpenModal={setOpenModal}
                            maxWidth={'sm'}
                            className="video-modal"
                            customClassMain="inviteUser"
                            open={openModal}
                            onClose={() => setOpenModal(false)}
                            content={
                                <div className='contentModal'>
                                    <div className='text-center'>
                                        <AppImage name={'calendly_logo.png'}/>
                                        <h3>Embed Calendly</h3>
                                    </div>
                                    <div className='calendlyList'>
                                        {SIDEBAR_NAV_ITEMS && SIDEBAR_NAV_ITEMS.map((item, key) => {
                                            return <div className="detail" key={key}>
                                                <div className="cont">
                                                    {item?.id}
                                                </div>
                                                <div className="text-list">
                                                    <h5>{item?.name}</h5>
                                                </div>
                                            </div>

                                        })}
                                        <div className='CalendlyTextarea'>
                                            <Textarea
                                                onChange={handleCalendly}
                                                value={calendly}
                                                placeholder="Paste the Share URL here <>"
                                            />
                                            {error && <span style={{color: 'red'}}>{error}</span>}
                                        </div>
                                        
                                        <div className='text-center CalendlyButton'>
                                        <IconLabelButtons disabled={!calendly} onClick={submitCalendly} title="Save & Dismiss"/>
                                        </div>
                                    </div>
                                </div>
                            }/>
        </div>
        </div>
    );
}

export default SelectButton;
