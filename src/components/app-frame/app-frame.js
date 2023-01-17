import React, { Component, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import './app-frame.scss';
import {Config} from "../../config/config";
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Action from "../../redux/action";
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import AppDropdown from '../$widgets/app-dropdown/app-dropdown';
import PropTypes from 'prop-types';
import firebase from '../firebase/firebase'
import { StorageKeys, StorageService } from "../../service/core/storage.service";
import { IntercomProvider, useIntercom } from 'react-use-intercom';
import { useHistory } from "react-router-dom";

import { AppImage } from '../$widgets/images/app-image';
import {SegmentService} from '../../service/api/segment.service'
import Integrations from '../integrations/integrations';
import {CampaignService} from "../../service/api/campaign.service";
import CustomSelect from "../$widgets/input-fields/custom-select";
import AppDialog from "../$widgets/AppDialog/AppDialog";
import { ButtonLightBlue } from "../$widgets/buttons/button-lightblue";
import { UserService } from '../../service/api/user-service';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));


function AppFrame(props) {

    const history = useHistory();
    const { window, children } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [user, setUser] = React.useState(false);
    const [isTemplateModal, setTemplateOpen] = React.useState(false);
    const [allcampaigns, setCampaigns] = React.useState([]);
    const [selectedCampaign, setSelectedCampaign] = React.useState(null);
    const [errors, setErrors] = React.useState({});

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
        (async () => {
            setUser(await UserService.getUserProfile())
            getTemplates()
        })();
    }, []);

    const getTemplates = async () => {
        let campaigns = await CampaignService.getCampaignListWithIdAndName()
        if(campaigns){
            let tempData = []
            campaigns.map((val) => {
                tempData.push({ value: val.id, label: val.campaign_name })
            })
            setCampaigns(tempData)
        }
    }

    const logout = async () => {
        await SegmentService.analyticsTrack("Logout Clicked", {});
        await firebase.logout()
        localStorage.clear();
        history.push({
            pathname: "/login",
        });
    }

    const getNameInitials = (fname, lname) => {
        let name = ''
        if (fname) {
            name = fname.charAt(0);
        }
        if (lname) {
            name += lname.charAt(0);
        }
        return name.toUpperCase()
    }


    const selectCampaign = (event) => {
        const name = event.target.name;
        setSelectedCampaign(event.target.value)
    }

    const drawer = (
        <div className={'side-nav '}>
            <div className={'logo text-center'}>
                <AppImage name={'logo.svg'} width={'128'} />
            </div>
            {user
             ?
            <>
                <List>
                    <>
                        <ListItem activeClassName="link-active" strict button component={NavLink} to={user?.role == 'admin' ? 'users' : "/dashboard"} >
                            <ListItemIcon >
                                <AppImage name={'home_icon.svg'} />
                            </ListItemIcon>
                            <ListItemText primary={user?.role == 'admin' ? 'Users' : "Home"} />
                        </ListItem>

                        {user?.role == 'admin' && <ListItem activeClassName="link-active" strict button component={NavLink} to={"/dashboard"} >
                            <ListItemIcon >
                                <AppImage name={'video.svg'} />
                            </ListItemIcon>
                            <ListItemText primary={"Videos"} />
                        </ListItem>}

                        {user?.role == 'user' && <ListItem strict activeClassName="link-active" button component={NavLink} to={"/csv-request"} >
                            <ListItemIcon >
                                <AppImage name={'csv_icon.svg'} />
                            </ListItemIcon>
                            <ListItemText primary={"CSV Requests"} />
                        </ListItem>}

                        {user?.role == 'user' && <ListItem  activeClassName="link-active" button component={NavLink} to={"/settings/"} >
                            <ListItemIcon >
                                <AppImage name={'globe-outline.svg'} />
                            </ListItemIcon>
                            <ListItemText primary={user?.role == 'admin' ? 'Users' : "My Domains"} />
                        </ListItem>}

                        <ListItem strict activeClassName="link-active" button component={NavLink} to={"/campaigns-list"} >
                            <ListItemIcon >
                                <AppImage name={'template.svg'} />
                            </ListItemIcon>
                            <ListItemText primary={"Campaigns"} />
                        </ListItem>
                        {/* } */}
                        {user?.role == 'user' && 
                        <ListItem strict activeClassName="link-active" button onClick={()=>setTemplateOpen(true)} >
                            <ListItemIcon >
                                <AppImage name={'shuffle-icon.svg'} width="20" />
                            </ListItemIcon>
                            <ListItemText primary={"Integrations"} />
                        </ListItem>}
                    </>
                </List>
                <div className={'logout-sec'}>

                    <List>
                        <> <h4 className='account-title'>ACCOUNT</h4>
                            <ListItem onClick={logout} exact button >
                                <ListItemIcon >
                                    <AppImage name={'logout.svg'} />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItem>
                        </>
                    </List>
                    <div className='profile d-flex justify-content-start'>
                        <div className='align-self'>
                            <div className="userbox">
                                <span className="user-circle">
                                   
                                    {
                                        user?.first_name ?
                                        getNameInitials(user?.first_name, user?.last_name) :
                                        getNameInitials(user?.email, '')
                                    }
                                </span>
                            </div>

                        </div>
                        <div className={'long-menu menu-item'}>
                            <p className="header-p">Howdy there <span className='text-capitalize'>{user?.first_name}</span></p>
                            <span className='emid'>{user?.email?.substr(0,20)}...</span>
                        </div>
                    </div>
                </div>
            </> :
            <div className='signup_left'>
                
            </div>
        }

        <AppDialog open={isTemplateModal}
            maxWidth={'xs'}
            customClassMain="csv-upload-modal"
            onClose={() => setTemplateOpen(false)}
            modelTitle={"Select Campaign"}
            content={
            <div className=''>
                <div className='contentModal'>
                <div className="">
                    <div className="mb-20">
                    <label className="text-left">Campaign<sup className="text-danger">*</sup></label>
                    <CustomSelect onChange={selectCampaign} options={allcampaigns} name='templateForVideo' value={selectedCampaign} />
                    {errors['selectedCampaign'] && <span className='error'>{errors.selectedCampaign}</span>}
                    </div>
                    {/* </div> */}
                    <div className="uploadbtn">
                        <ButtonLightBlue className=" mt-35 mb-2" disabled={!selectedCampaign}
                        onClick={() => history.push(`/integrations/${selectedCampaign}`) }

                        >Next</ButtonLightBlue>
                    </div>
                </div>
                </div>
            </div>
            }
        />
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={'app-frame'}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>


            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>

            <main className={'content'}>
                {children}
            </main>

        </div>
    );

}

AppFrame.propTypes = {
    window: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        device: state.device,
    }
}

export default connect(mapStateToProps)(AppFrame);
