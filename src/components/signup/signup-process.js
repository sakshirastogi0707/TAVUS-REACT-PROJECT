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
import SingleDropdown from "../$widgets/dropdown/singledropdown";
import CheckIcon from '@material-ui/icons/Check';
const ariaLabel = { 'aria-label': 'description' };

const signupProcess = (props) => {
    const { step,allRoles, selectedRole, email, password, first_name, last_name, company, website, detail, shipping,marketing_communication,terms } = props

    return (
        <div className="DevBox">
            {step==1 && 
                <>
                    <h3>Setup your Tavus account</h3>
                    <h5>Finally, so we can continue talking</h5>
                    <h4 className="number_sec">3/2</h4>
                    <Input placeholder="Enter your email " value={email} name="email" onChange={(event)=>props.handleOnChange(event)} required autoFocus={true} inputProps={ariaLabel} />
                    <div className="passcode">
                        <PasswordField className="Password" value={password} name="password" onChange={(event)=>props.handleOnChange(event)} required autoFocus={true} label="Password"/>
                    </div>
                    <div className="checkBox">
                        <div className="d-flex pt-2 pb-2"><GreenCheckbox name='marketing_communication' checked={marketing_communication} onChange={(event)=>props.handleOnChange(event)} /><span> Allow tavus to send you personalized promotions and tips to use the tavus platfom?</span></div>
                        <div className="d-flex pt-2 pb-2"><GreenCheckbox name='terms' checked={terms} onChange={(event)=>props.handleOnChange(event)} /><span> I agree to the &nbsp; <a href=""> Terms of Service </a> &nbsp; and &nbsp;<a href=""> Privacy Policy</a></span> </div>
                    </div>
                    <div className="signup_gmail">
                        <h6>Signup with</h6>
                        <Button className="signup_btn"> <AppImage name={'microsoft-icon.svg'}   />Signup with Microsoft </Button> <Button onClick={props.googleSignIn} className="signup_btn">  <AppImage  name={'google-icon.svg'}   /> Signup with Google </Button>
                        <h5>Already Registered? <a href="">Login here</a> </h5>
                    </div>
                </>
            }

            {/* What’s your name? */}
            {step==2 && 
                <div className="DevBoxSec">
                    <h3>What’s your name?</h3>
                    <h5>Let’s start with your personal information</h5>
                    <h4 className="number_sec">3/2</h4>
                    <Input placeholder="First name" name="first_name" value={first_name} onChange={(event)=>props.handleOnChange(event)} autocomplete="false" inputProps={ariaLabel} />
                    <Input placeholder="Last name" name="last_name" value={last_name} onChange={(event)=>props.handleOnChange(event)} autocomplete="false" inputProps={ariaLabel} />
                </div>
            }
            {/* What’s your name? End  */}
             {/* What’s your company? */}
            {step==3 && 
                <div className="DevBoxSec">
                    <h3>What’s your company name?</h3>
                    <h5>Let’s start with your professional information</h5>
                    <h4 className="number_sec">3/2</h4>
                    <Input placeholder="Company name" name="company" value={company} onChange={(event)=>props.handleOnChange(event)} autocomplete="false" inputProps={ariaLabel} />
                </div>
            }
            {/* What’s your company? End  */}
            {step==4 && 
                <div className="DevBoxSec">
                    <h3>Setup your Tavus account.</h3>
                    <h5>Let’s start with your professional information</h5>
                    <h4 className="number_sec">3/2</h4>
                    <Input placeholder="What is your website ?" name="website" value={website} onChange={(event)=>props.handleOnChange(event)} autocomplete="false" inputProps={ariaLabel} />
                </div> 
            }
            {step==5 && 
            <div className="DevBoxSec">
                <h3>Setup your Tavus account.</h3>
                <h5>Let’s start with your professional information</h5>
                <h4 className="number_sec">3/2</h4>
                <SingleDropdown
                    placeholder={<span className={'stylew2'}>All campaigns</span>}
                    options={allRoles}
                    onChange={props.changeRoles}
                    value={selectedRole}
                    className={'stylew'}
                />
            </div>
            }
            {step==6 && 
                <div className="DevBoxSec">
                    <h3>Setup your Tavus account.</h3>
                    <h5>Let’s start with your project information</h5>
                    <h4 className="number_sec">3/2</h4>
                    <Input placeholder="How do you plan to use Tavus?" name="detail" value={detail} onChange={(event)=>props.handleOnChange(event)} autocomplete="false" inputProps={ariaLabel} />
                </div>
            }
            {step==7 && 
                <div className="DevBoxSec">
                    <h3>Setup your Tavus account.</h3>
                    <h5>Let’s start with your project information</h5>
                    <h4 className="number_sec">3/2</h4>
                    <p>We <i>highly</i> recommend using our free Tavus microphone in order to get the best quality of videos. 
                    If you already have a <b>studio-grade</b> microphone or don't want to wait for one, you can continue without it.</p>
                    <Input placeholder="Shipping Address" name="shipping" value={shipping} onChange={(event)=>props.handleOnChange(event)} autocomplete="false" inputProps={ariaLabel} />
                </div>
            }
            {step==8 && 
                <div className="DevBox_pricing">
                    <h3>Transparent pricing</h3>
                    <p>No surprise fees.</p>
                    <div className="btn-group pt-4 pb-4" role="group" aria-label="Basic example">
                        <button type="button" className={'btn btn-primary'} >Daily</button>
                        <button type="button" className={'btn btn-secondary'}>Weekly</button>
                    </div>
                    <div className="pricing_list">
                        <h4>$100 <span>/month</span></h4>
                        <p>For most businesses that want <br/>to otpimize web queries</p>
                        <ul className="pt-4 pb-4">
                            <li><CheckIcon />Feature one</li>
                            <li><CheckIcon />Feature one</li>
                            <li><CheckIcon />Feature two</li>
                            <li><CheckIcon />Feature two</li>
                            <li><CheckIcon />Feature three</li>
                            <li><CheckIcon />Feature three</li>
                            <li><CheckIcon />Feature four</li>
                            <li><CheckIcon />Feature four</li>
                            <li><CheckIcon />Feature five</li>
                        </ul>
                    </div>
                </div>
            }
            <Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" value={20} />
            </Box>
        </div>
    );
}

export default signupProcess;