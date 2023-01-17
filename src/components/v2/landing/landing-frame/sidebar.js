import React, {useEffect, useState, useCallback} from 'react';
import List from '@material-ui/core/List';
import { ListItemButton } from '@mui/material';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconLabelButtons from '../../../$widgets/buttons/icon-label-buttons'
import {Link, NavLink} from 'react-router-dom';
import './sidebar.scss';
import TipsTricks from "./tips-tricks"
import {AppImage} from '../../../$widgets/images/app-image';
import Action from "../../../../redux/action";
import {useDispatch, useSelector} from "react-redux";
import AppDialog from "../../../$widgets/AppDialog/AppDialog";

export const SIDEBAR_NAV_ITEMS = [
    {name: 'Layout', logo: 'Layout.svg',  Active_logo: 'Layout.svg', id: 'layout', index: 0},
    {name: 'Colors', logo: 'fill-icon-font.svg', Active_logo: 'fill-icon-font1.svg', id: 'colors', index: 1},
    {name: 'Logo', logo: 'picture-icon-font.svg', Active_logo: 'picture-icon-font1.svg', id: 'logo', index: 2},
    {name: 'Text', logo: 'letter-case-icon-font.svg', Active_logo: 'letter-case-icon-font1.svg', id: 'text', index: 3},
    {name: 'Buttons', logo: 'button-icon.svg', Active_logo: 'button-icon1.svg', id: 'buttons', index: 4}
]

export const Tips_Tricks = [
    {Title: 'How long should my video be?  ',
    Paragraph: 'When creating a video you should aim to make it engaging and not bore people...',
    BtnTitle: "Read More"
    },
    {Title: 'Should I cuss in my videos?',
    Paragraph: 'Generally, when making a personalized video you should aim to not offend someone,,,',
    BtnTitle: "Read More"
    },
    {Title: 'What makes a script engaging?',
    Paragraph: 'Making a dope ass script takes no time if you’re good at writing scripts...',
    BtnTitle: "Read More"
    },
    {Title: 'What parts of a video should I personalize?',
    Paragraph: 'Personalizing the right amount of content is key to making a video engaging... ',
    BtnTitle: "Read More"
    },
]

function SideBar(props) {
    const landingState = useSelector(s => s.landingState)
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false)
    const handleNavItemClick = (item) => {
        let steps = landingState.completed_steps
        if(!steps.includes(item.id)){
            steps.push(item.id)
        }
        dispatch({
            type: Action.UpdateLandingState,
            payload: {
                selectedNavItemId: item.id,
                completed_steps: steps
            },
            origin: 'landing-frame.handleNavItemClick'
        })
    }

    const getLogo = (item) => {
        if(landingState?.completed_steps && landingState?.completed_steps.includes(item.id) && landingState?.selectedNavItemId!=item.id){
            return 'nav-checked-icon.svg'
        } else if(landingState?.selectedNavItemId==item.id){
            return item.logo
        } else {
            return item.Active_logo
        }
    }

    return (
            <div className={'side-bar '}>
                <List>
                    {SIDEBAR_NAV_ITEMS && SIDEBAR_NAV_ITEMS.map((item, key) => {
                        return <ListItemButton key={key}
                                         selected ={landingState.selectedNavItemId == item.id}
                                         button
                                         component={landingState.selectedNavItemId}
                                         onClick={() => handleNavItemClick(item)}
                                         className={landingState?.completed_steps && landingState?.completed_steps.includes(item?.id) && landingState?.selectedNavItemId!=item?.id && 'active-nav'}
                                         >
                            <ListItemIcon>
                                <AppImage name={getLogo(item)}/>
                            </ListItemIcon>
                            <ListItemText primary={item?.name}/>
                        </ListItemButton>
                    })}
                </List>
                <div className='navButton'>
                     {/* <IconLabelButtons title="Tips & Tricks" onClick={()=>setOpenModal(true)} startIcon="sparkles-icon-font.svg"/> */}
                     <IconLabelButtons title="Tips & Tricks" startIcon="sparkles-icon-font.svg"/>
                </div>
                <TipsTricks title={"Tips & Tricks"} subTitle={''} data={Tips_Tricks} open={openModal} setOpenModal={setOpenModal}
                
                />
            </div>
    );
}

export default SideBar;
