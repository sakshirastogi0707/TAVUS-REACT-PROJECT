import React from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@material-ui/icons/Close';


export default function MuiAlert(props) {
  const {open, type, messsage, color } = props 
  return (
        <Collapse in={open}>
            <Alert
                style={{background: color}}
                className="hello"
                severity={type}
                action={
                <IconButton
                    aria-label="close"
                    size="small"
                    onClick={() => 
                        props.closeCollapse()
                    }
                >
                    
                    <CloseIcon fontSize="inherit" />
                    
                </IconButton>
                
                }
                sx={{ mb: 2 }}
                
            >
            {type==='success' ? 
                <>
                    Your domain has been configured successfully. <a onClick={()=>props.makeDefault('',props.domain)} style={{cursor:'pointer'}} color="inherit" size="small">
                    <u><strong>Click here</strong></u>
                    </a> to use this domain for all your videos.
                </>
                :
                type==='warning' ? 
                <>
                    We were unable to validate your domain. You may need to wait longer for the changes to propagate, as this can take up to 24 hours. When ready, click Validate again to check if the changes have propagated. If you still encounter issues you may need to check your DNS records again to make sure they were entered correctly. Contact us via Slack or <a className='mail-text' href="mailto:support@tavus.io">support@tavus.io</a> if you continue to face issues.
                </>
                : 
                messsage
            }
           
            </Alert>
        </Collapse>
    );
}
