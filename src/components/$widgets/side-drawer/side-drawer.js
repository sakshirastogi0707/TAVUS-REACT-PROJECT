import React, {Fragment, useEffect, useState} from 'react';
import {Grid, Paper} from "@material-ui/core";
import Cookies from 'universal-cookie';
import {AppImage} from "../images/app-image";
import './side-drawer.scss'
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import {ButtonLightGray} from "../../$widgets/buttons/button-lightgreen";
import Tooltip from '@material-ui/core/Tooltip';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";

const cookies = new Cookies();

function SideDrawer(props) {
    const location = props.location.pathname;
    const isManageDealActive = location === '/manage-deals';
    const isManageRestaurantActive = location === '/manage-restaurant';
    const isRestaurantChartActive = location === '/restaurant-chart';
    const isanalytics = location === '/analytics';

    const isPendingRequestsActive = location === '/pending-requests';
    const isManagePlatformActive = location === '/manage-platform';

    const defaultTheme = createMuiTheme();
    const theme = createMuiTheme({
      overrides: {
        MuiTooltip: {
          tooltip: {
            position:"relative",
            fontSize: "14px",
            color: "#fff",
            backgroundColor: "#E39B01",
            left:"-25px",
            top:"10px",
            padding:"5px 15px",
          }
        }
      }
    });

    const [isOpen, setIsOpen] = useState(false);
    const [userLogged, setUserLogged] = useState(false);

    const toggleScrollBars = (flag) => {
        document.documentElement.style.overflow = !flag ? 'auto' : 'hidden';  // firefox, chrome
        document.body.scroll = !flag ? 'yes' : "no"; // ie only

        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0;
    }

    useEffect(() => {
        toggleScrollBars(props.open);
    }, [props.open])

    useEffect(() => {
        setUserLogged(cookies.get('user'))
        props.history.listen((location, action) => {
            setIsOpen(false)
        });
    }, [])

    return (
        <Fragment>
            <Paper id='sidenav' className={`drawer-paper visibility d-flex justify-content-between ${isOpen ? 'drawer-opened' : ''}`} >               
                
                <div>
                    <div className="side_drawer">
                        {isOpen ?  <div className={''}>
                                        <div className="closedrawer text-right">
                                            <AppImage onClick={() => setIsOpen(false)} 
                                            name={'ic-close.svg'} 
                                            className="avatar" 
                                            width={25} height={25}/>
                                        </div>
                                        <div className={'mt-5 mb-5'}>
                                            <AppImage name={'logo.png'} width={146} height={61} />
                                        </div>
                                    </div>
                            :
                                <div>
                                    <div className="opendrawer"><AppImage onClick={() => setIsOpen(true)} 
                                        name={'arrrow.png'} 
                                        className="avatar" 
                                        width={15} height={15}/></div>
                                        <div className={'mt-5 mb-5 invisible'}><AppImage name={'logo.png'} width={146} height={61} /></div>
                        </div> }
                   </div>
                    <ul className={'mt-3'}>
                        { userLogged && userLogged.role === 'resturant_admin' ? 
                            <li>
                                <Link to="/manage-deals"  className={isManageDealActive ? 'active' : ''}>
                                    <MuiThemeProvider theme={theme} >
                                        <Tooltip title={isOpen ? '' : 'Manage Deals'} placement="right-end">
                                            <span className={'imgds'}>
                                                <AppImage name={isManageDealActive ? 'deal-black.png' : 'deal.png'} className="avatar" width={25} height={30}/>
                                            </span>
                                        </Tooltip>
                                    </MuiThemeProvider>  
                                        {isOpen ? <span className={'menulbl'}>Manage Deals</span> : ''  }
                                </Link>                          
                            </li>
                            :
                            null
                        }
                        {userLogged && userLogged.role === 'resturant_admin' ?  
                        <li>
                            <Link to="/manage-restaurant" className={isManageRestaurantActive ? 'active' : ''}>
                                <MuiThemeProvider theme={theme}>
                                    <Tooltip title={isOpen ? '' : 'Manage Restaurant'} placement="right-end">
                                        <span className={'imgds'}>
                                            <AppImage name={isManageRestaurantActive ? 'restaurant-black.png' : 'restaurant.png'} className="avatar" width={30} height={30}/>
                                        </span>
                                    </Tooltip>
                                </MuiThemeProvider>
                                    {isOpen ? <span className={'menulbl'}>Manage Restaurant</span> : ''  }
                            </Link>                            
                        </li>
                        :
                        null
                        }
                         {userLogged && userLogged.role === 'resturant_admin' ?
                            <li>
                                <Link to="/restaurant-chart" className={isRestaurantChartActive ? 'active' : ''}>
                                    <MuiThemeProvider theme={theme}>
                                        <Tooltip title={isOpen ? '' : 'Analytics'} placement="right-end"> 
                                            <span className={'imgds'}>
                                                <AppImage name={isRestaurantChartActive ? 'analytics-black.png' : 'analytics.png'} className="avatar" width={30} height={30}/>
                                            </span>
                                        </Tooltip>
                                    </MuiThemeProvider>
                                    {isOpen ? <span className={'menulbl'}>Analytics</span> : ''  }    
                                </Link>                         
                            </li>
                            :
                            null
                        }
                        {userLogged && userLogged.role === 'super_admin' ? 
                        <li>
                            <Link to="/pending-requests" className={isPendingRequestsActive ? 'active' : ''}>
                                <MuiThemeProvider theme={theme}>
                                    <Tooltip title={isOpen ? '' :'Pending Requests'} placement="right-end"> 
                                        <span className={'imgds'}>
                                             <AppImage name={isPendingRequestsActive ? 'pending-requests.svg' : 'pending.svg'} className="avatar" width={30} height={30}/>
                                        </span>
                                    </Tooltip>
                                </MuiThemeProvider>
                                {isOpen ? <span className={'menulbl'}>Pending Requests</span> : ''  }    
                            </Link>                         
                        </li>
                        :
                        null
                        }
                        {userLogged && userLogged.role === 'super_admin' ? 
                            <li>
                                <Link to="/manage-platform" className={isManagePlatformActive ? 'active' : ''}>
                                    <MuiThemeProvider theme={theme}>
                                        <Tooltip title={isOpen ? '' : 'Manage Platform'} placement="right-end"> 
                                            <span className={'imgds'}>
                                                <AppImage name={isManagePlatformActive ? 'amplifier-black.svg' : 'amplifier.svg'} className="avatar" width={30} height={30}/>
                                            </span>
                                        </Tooltip>
                                    </MuiThemeProvider>
                                    {isOpen ? <span className={'menulbl'}>Manage Platform</span> : ''  }    
                                </Link>                         
                            </li>
                            :
                            null
                        }
                       {userLogged && userLogged.role === 'super_admin' ? 
                            <li>
                                <Link to="/restaurant-chart" className={isRestaurantChartActive ? 'active' : ''}>
                                    <MuiThemeProvider theme={theme}>
                                        <Tooltip title={isOpen ? '' : 'Analytics'} placement="right-end"> 
                                            <span className={'imgds'}>
                                                <AppImage name={isRestaurantChartActive ? 'analytics-black.png' : 'analytics.png'} className="avatar" width={30} height={30}/>
                                            </span>
                                        </Tooltip>
                                    </MuiThemeProvider>
                                    {isOpen ? <span className={'menulbl'}>Analytics</span> : ''  }    
                                </Link>                         
                            </li>
                            :
                            null
                        }
                    </ul>        
                </div>
            </Paper>
        </Fragment>
    );
}

export default withRouter(SideDrawer);