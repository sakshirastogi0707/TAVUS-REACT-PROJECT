import React from "react";
import Input from '@mui/material/Input';
import { AppImage } from "../$widgets/images/app-image";
import PasswordField from "../$widgets/input-fields/password-field";
import GreenCheckbox from '../$widgets/checkbox/checkbox';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { ButtonLightBlue } from "../$widgets/buttons/button-lightblue";
import SignupProcess from "./signup-process"

const ariaLabel = { 'aria-label': 'description' };

export function html() {
    const {step,allRoles,selectedRole,email, password, first_name, last_name, company, website, detail, shipping, marketing_communication, terms} = this.state;
    const {} = this.props;
    return (
        <div className={'signup-main'}>
            <div className="box">
                <SignupProcess 
                    step={step}
                    allRoles={allRoles}
                    selectedRole={selectedRole}
                    changeRoles={this.changeRoles}
                    googleSignIn={this.googleSignIn}
                    handleOnChange={this.handleOnChange}
                    email={email}
                    password={password}
                    first_name={first_name}
                    last_name={last_name}
                    company={company}
                    website={website}
                    detail={detail}
                    shipping={shipping}
                    marketing_communication={marketing_communication}
                    terms={terms}
                />
                <div className="signup-footer">
                    <div className="d-flex justify-content-between">
                        <div className="bottomBack">
                            {step!='registration' && 
                                <div className="back-box">
                                    <ArrowBackIcon onClick={()=>this.changeScreen('back')}/>
                                </div>
                            }
                        </div>
                        <Button onClick={()=>this.changeScreen('next')} variant="contained" endIcon={<ArrowForwardIcon />}>
                            {step=='registration' ? 'Start': 'Next'}
                        </Button>
                    </div>
                </div>
            </div>
            
        </div>
    );
}