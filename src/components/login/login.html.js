import React,{useEffect, useRef} from "react";
import PasswordField from "../$widgets/input-fields/password-field";
import TextFields from "../$widgets/input-fields/text-field";
import {AppImage} from "../$widgets/images/app-image";
import {ButtonGray} from "../$widgets/buttons/button-gray";
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
import Loader from "../$widgets/loader/loader"
import { Link } from "react-router-dom";
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
export  function html() {
    const {isLoading} = this.state;
    const {} = this.props;
    const {validateLogin} = this;

    return (
        <div className={'login-Main'}>
            {isLoading? <Loader /> :
            <>
                <div className="main_login">
                    <div className="login-sectiom justify-content-center">
                        <div className="loginCntr loginForm"> 
                                <ToastsContainer limit={1} store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT}/>
                                <div className="logoDs mb-4">
                                    <h3>Welcome to Tavus!</h3>
                                </div>
                                <div className="mb-46"> 
                                    <Input label="Email" name="email" placeholder="Email"
                                        onKeyPress={this.enterPressed.bind(this)}
                                        auto onChange={(e) => this.handlerInput(e)}  />
                            
                                </div>
                                <div className="passcode">
                                    <PasswordField onKeyPress={this.enterPressed.bind(this)} id="Password" label="Password" name="password"  
                                    onChange={(e) => this.handlerInput(e)}/>
                                </div>
                                <div className="text-right terms">
                                    <span><Link to='forgot'>Forgot password</Link></span>
                                </div>
                                <div className="mt-4"  onClick={this.isTruLogin}><ButtonGray>Login</ButtonGray></div>
                                <div className="signup_gmail">
                                    <Button  onClick={()=>this.googleSignIn()}  className="signup_btn_google">  <AppImage  name={'google-icon.svg'}/> Continue with Google </Button>
                                </div>
                        </div>
                    </div>
                    <div className="login-sectiomTwo">
                        <div className="login-term loginCntr">
                            <AppImage name={'logo_icon.svg'}  width={46}/>
                            <h2 className="pt-3">Create personalized videos in seconds.</h2>
                            <div className="pl-5">
                                <p> Saying your customer’s name in a video improves conversion by 500%. Instead of recording a new video for each customer, simply record one clip and use Tavus to generate unlimited personalized copies in seconds.</p>
                                <div className='profile d-flex justify-content-start'>
                                        <div className="userbox">
                                            <span className="user-circle">
                                                <AppImage name={'profile.png'} />
                                            </span>
                                        </div>
                                    <div className={'long-menu menu-item align-self'}>
                                        <p className="header-p">Hassaan Raza</p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                </>
            }
        </div>
    );
}