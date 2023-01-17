import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import './my-account.scss';
import Tooltip from '@mui/material/Tooltip';
import {Config} from "../../../config/config";
import { Link as RouterLink } from "react-router-dom";
import {
    StorageService,
    StorageKeys,
  } from "../../../service/core/storage.service";
import firebase from '../../firebase/firebase'
import { useHistory } from "react-router-dom";
import {SegmentService} from '../../../service/api/segment.service'

export default function MyAccount(props) {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const getNameInitials = (fname, lname) => {
        let name = ''
        if (fname && !lname) {
            name = fname.charAt(0);
            name += fname.charAt(1);
        } else {
            name = fname.charAt(0);
        }
        if (lname) {
            name += lname.charAt(0);
        }
        return name.toUpperCase()
    }
    const logout = async () => {
        await SegmentService.analyticsTrack("Logout clicked",{})
        await firebase.logout()
        localStorage.clear();
        history.push({
            pathname: "/login",
        });
    }
    const termsService=()=>{
        window.open('https://www.tavus.io/terms-of-service', '_blank');
    }

    return (
    <div className='my-account-main'>
        <React.Fragment>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Account settings">
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <Avatar sx={{ width: 48, height: 48 }}>{getNameInitials(props?.user?.first_name, props?.user?.last_name)}</Avatar>
            </IconButton>
            </Tooltip>
        </Box>
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            className="my-account"
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
            elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem className='account-tag'>
                <Avatar sx={{ width: 48, height: 48 }}>{getNameInitials(props?.user?.first_name, props?.user?.last_name)}</Avatar>
                <div className='account-name'>
                    <h3>{props?.user?.first_name+' '+props?.user?.last_name}</h3>
                </div>
            </MenuItem>
            <Divider />
            {((props?.user?.campaign_count > 1 || props?.user?.campaign?.steps?.first_video=='true') || props?.user?.role=='admin') ?
                <MenuItem onClick={()=>history.push({pathname: "/dashboard",})}>
                    Go to Dashboard
                </MenuItem>
                :
                props?.user?.campaign?.steps?.first_video == 'true' &&
                <MenuItem>
                    Go to Dashboard
                </MenuItem> 
            }
            <MenuItem>
                Visit support
            </MenuItem>
            <MenuItem onClick={termsService}>
                Terms of Service
            </MenuItem>
            <Divider className='mt-3'/>
            <MenuItem onClick={logout}>
                Logout
            </MenuItem>
        </Menu>
        </React.Fragment>
    </div>
  );
}
