import React, {useEffect, useState} from 'react';
import './app-footer.scss';
import { Grid, Paper, Popper, Menu, ClickAwayListener, MenuItem, MenuList, Grow } from "@material-ui/core";
import LinearDeterminate from "../../$widgets/app-progress/app-progress";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LoadingButtons from  "../../$widgets/buttons/loading-button"
import LinearProgres from "../../$widgets/line-progress/line-progress"
import { AppImage } from '../../$widgets/images/app-image';
import { UserService } from '../../../service/api/user-service';
import  AdminService  from "../../../service/api/admin.service";
import AuthService from "../../../service/core/auth.service";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import {withRouter} from 'react-router'
import {useLocation, useParams, useHistory} from 'react-router-dom'


const AppFooter = withRouter((props) => {
    
    const [userSteps, setUserSteps] = useState({})
    const [is_mic_available, setMic] = useState(false)
    const [is2ndCampain, setNewCampaign] = useState(false)
    const [FOOTER_OPTIONS, setFooterVariables] = useState([])
    const [campaignId, setCampaignId] = useState(null);
    const [isLoading, setIsLoding] = useState(true);
    let location = useLocation();
    
    useEffect(() => {
        (async () => {
            getUserDetail()
        })();
    }, [props?.userData]) 

      
    const getUserDetail = async () => {
        let data = props?.userData
        if(data && Object.keys(data).length !== 0 ){
            if(data?.campaign?.id){
                setCampaignId(data?.campaign?.id)
            }
            if(data?.campaign?.steps?.first_video=='true' || data?.campaign_count>1){
                await setUserSteps(data?.campaign?.steps)
                setNewCampaign(true)
                return data
            } else {
                if(props.location.pathname !== '/campaign/script/'){
                    await setUserSteps(data?.steps)
                    footerVariables(data?.is_mic_available,false)
                }
                setMic(data?.is_mic_available)
                setIsLoding(false);
                return data
            }
        } else {
            setFooterVariables([])
        }
    }

    const switchPage = async (page) => {
        if(page=='registration'){
            return
        } else {
            if(is2ndCampain){
                switch (page) {
                    case 'introducing-voices':
                        case 'my-voices':
                            case 'voices-name':
                        if(!props.match.path=='/campaign/script'&& userSteps?.script){
                           return props.history.push(`/${page}/${campaignId}`)
                        }
                        return
                    case 'script-recording':
                        if(userSteps?.voice=='true'){
                            return props.history.push(`/${page}/${campaignId}`)
                        }
                        return
                    case 'template':
                        if(userSteps?.script_recording=='true'){
                            return props.history.push(`/${page}/${campaignId}`)
                        }
                        return
                    case 'background-video-setup':
                        if(userSteps?.template=='true'){
                            return props.history.push(`/${page}/${campaignId}`)
                        }
                        return
                    case 'landing':
                        if(userSteps?.background_video=='true'){
                            return props.history.push(`/${page}/${campaignId}`)
                        }
                        return
                    case 'background-video-setup':
                        if(userSteps?.template=='true'){
                            return props.history.push(`/${page}/${campaignId}`)
                        }
                        return
                    case 'training-complete':
                        if(userSteps?.landing=='true'){
                            return props.history.push(`/${page}/${campaignId}`)
                        }
                        return
                    case 'set-variable':
                        if(userSteps?.training_complete=='true'){
                            return props.history.push(`/${page}/${campaignId}`)
                        }
                        return
                    case 'first-video':
                        if(userSteps?.set_variable=='true'){
                            return props.history.push(`/${page}/${campaignId}`)
                        }
                        return
                }
            } else {
                switch (page) {
                    case 'introducing-voices':
                        if(userSteps?.script){
                           return props.history.push(`/${page}/${campaignId}`)
                        }
                        return
                    case 'invite':
                        if(userSteps?.registration && props.step!='registration'){
                           return props.history.push(`/${page}`)
                        }
                        return
                    case 'script':
                        if(is_mic_available ){
                            if(userSteps?.invite && userSteps?.microphone){
                                return props.history.push(`/${page}/${campaignId}`)
                            }
                        } else {
                            if(userSteps?.invite && userSteps?.microphone){
                                return props.history.push(`/${page}/${campaignId}`)
                            }
                        }
                        return
                    case 'training':
                        if(is_mic_available ){
                            if(userSteps?.script){
                                return props.history.push(`/${page}/${campaignId}`)
                            }
                        } else {
                            if(userSteps?.landing){
                                return props.history.push(`/${page}/${campaignId}`)
                            }
                        }
                        return
                    
                    case 'landing':
                        if(is_mic_available){
                            if(userSteps?.background_video){
                                return props.history.push(`/${page}/${campaignId}`)
                            }
                        } else {
                            if(userSteps?.script){
                                return props.history.push(`/${page}/${campaignId}`)
                            }
                        }
                        return
                    case 'template':
                        if(is_mic_available){
                            if(userSteps?.script_recording){
                                return props.history.push(`/${page}/${campaignId}`)
                            }
                        } else {
                            if(userSteps?.script_recording){
                                return props.history.push(`/${page}/${campaignId}`)
                            }
                        }
                        return
                    case 'script-recording':
                        if(is_mic_available){
                            if(userSteps?.training){
                                return props.history.push(`/${page}/${campaignId}`)
                            }
                        } else {
                            if(userSteps?.training){
                                return props.history.push(`/${page}/${campaignId}`)
                            }
                        }
                        return
                    case 'training-complete':
                        if(is_mic_available){
                            if(userSteps?.landing){
                                return props.history.push(`/${page}/${campaignId}`)
                            }
                        } else {
                            if(userSteps?.template){
                                return props.history.push(`/${page}/${campaignId}`)
                            }
                        }
                        return
                    case 'set-variable':
                        if(is_mic_available){
                            if(userSteps?.training_complete){
                                return props.history.push(`/${page}/${campaignId}`)
                            }
                        } else {
                            if(userSteps?.training_complete){
                                return props.history.push(`/${page}/${campaignId}`)
                            }
                        }
                        return
                    case 'first-video':
                        if(is_mic_available){
                            if(userSteps?.set_variable){
                                return props.history.push(`/${page}/${campaignId}`)
                            }
                        } else {
                            if(userSteps?.set_variable){
                                return props.history.push(`/${page}/${campaignId}`)
                            }
                        }
                        return
                    case 'background-video-setup':
                        if(is_mic_available){
                            if(userSteps?.template){
                                return props.history.push(`/${page}/${campaignId}`)
                            }
                        } else {
                            if(userSteps?.template){
                                return props.history.push(`/${page}/${campaignId}`)
                            }
                        }
                        return
                    default:
                        props.history.push(`/`)
                    }
            }
        }
    }

    const footerVariables = async (is_mic,createdCampaign) => {
        if(createdCampaign){
            const result = await UserService.getFooterOptionsAlreadyCreatedCampaign(props?.userData,is_mic, props.step)
            setFooterVariables(result)
        } else {
            const result = await UserService.getFooterOptions(props?.userData,is_mic, props.step)
            setFooterVariables(result)
        }
    }

    const getName=(name,key)=>{
        let value = name
        switch( name ){
            case 'background-video-setup':
                value='background_video'
                    break;
            case 'script-recording':
                value ='script_recording'
                break;
            case 'training-complete':
                value = 'training_complete'
                break;
            case 'set-variable':
                value = 'set_variable'
                break;
            case 'first-video':
                value = 'first_video'
                break;
            case 'introducing-voices':
            case 'my-voices':
            case 'voices-name':
                value='voice'
                break;
        }
        if(props.match.url==='/campaign/script'){
            return <span className="navCont">{key+1}</span> 
        }
        if(!userSteps?.[value] || userSteps?.[value]=='false') {
            return <span className="navCont">{key+1}</span> 
        } else {
            return <span className=" navCont-active"><AppImage name={'white-check.svg'} width={'7'} height={'7'} /></span>
        }  
    }

    const getCurrentStep = () => {
      const name = location.pathname.includes('/signup')?'/signup': location.pathname;
  
      switch (name) {
          case "/signup":
  
          return "Registration";
        case "/background-video-setup":
          return "background-video-setup";
        case "/script":
        case "/campaign/script":
        case `/campaign/script/campaignId`:
          return "Script";
  
        case "/training":
        case `/training/campaignId`:
          return "Training";
  
          case "/invite":
            return "invite User";
          case "/landing":
          case `/landing/campaignId`:
            return "Landing Page";
          case "/script-recording":
         case "/setting-up-your-template":
          case `/script-recording/campaignId`:
            return "Video Recording";
          case "/template":
          case `/template/campaignId`:
            return "Personalize Video";
    
          case "/background-video-setup":
          case `/background-video-setup/campaignId`:
            return "Background Video";
          case "/set-variable":
          case `/set-variable/campaignId`:
            return "Set Identifier";
          case "/first-video":
          case "/create-video":
          case `/first-video/campaignId`:
            return "Finish";
          case "/introducing-voices":
          case "/my-voices":
          case "/voices-name":
          case `/introducing-voices/campaignId`:
          case `/my-voices/campaignId`:
          case `/voices-name/campaignId`:
            return "Voice";
          default:
            break;
      }
    };
    

    return (
            <div className="signup-footer">
                {props.progress &&
                    <LinearProgres value={props.progress} />
                }
                    <Grid spacing={2} container direction="row" justifyContent="space-between" alignItems="center">
                        <Grid item  lg={2} xs={2} md={2}>
                            <div className="bottomBack align-self">
                                {props.isBack &&
                                <div className="back-box" onClick={props.onBack}>
                                    <AppImage name={'arrow-left1.svg'}   width={'16'} />
                                </div>
                            }
                            </div>
                        </Grid>
                    {
                        props.invite &&
                        <Grid item lg={8} xs={8} md={8}>
                            <div className="fore-browser-view">
                            <div className="align-self next-bar">
                                <div className="d-flex justify-content-center footer-nave">
                                    {FOOTER_OPTIONS && FOOTER_OPTIONS.length>0 && FOOTER_OPTIONS.map((item, key)=>{
                                        return <>
                                            <div onClick={()=>switchPage(item.value)} 
                                                className={props.step==item.value ? "footerNav active": "footerNav "} key={key}>
                                                {getName(item?.value,key)}
                                                {item.name}
                                            </div>
                                            <div className="arrow-right">
                                                <AppImage name={'next.svg'}   width={'6'} />
                                            </div>
                                        </>
                                    })}
                                </div>
                            </div>
                            </div>
                            <div className="fore-mobile-view ">
                              <div className="align-self next-bar">
                                <div className="d-flex justify-content-center footer-nave">
                                    <div className={"footerNav "}>
                                    <span>{!isLoading &&!is2ndCampain && getCurrentStep()}</span>
                                    </div>
                                </div>
                              </div>
                            </div>

                        </Grid>
                    }

                        <Grid item lg={2} xs={2} md={2} className="text-right">
                            <div className="fore-browser-view">
                                <LoadingButtons
                                    onClick={props.onClick}
                                    className={props.className}
                                    disabled={props.disabled}
                                    title={props.title}
                                    isLoading={props.isLoading}
                                />
                            </div>
                            <div className="fore-mobile-view ">
                                <div className="next-bottom d-flex justify-content-end align-self">
                                    <LoadingButtons
                                        onClick={props.onClick}
                                        className={props.className}
                                        disabled={props.disabled}
                                        isLoading={props.isLoading}
                                    />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
            </div>
    );
})

export default AppFooter;