import React from "react";
import PasswordField from "../$widgets/input-fields/password-field";
import TextFields from "../$widgets/input-fields/text-field";
import {AppImage} from "../$widgets/images/app-image";
import {ButtonGray} from "../$widgets/buttons/button-gray";
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";
const cookies = new Cookies();

export  function html() {
    const {} = this.state;
    const {} = this.props;
    const {validateLogin} = this;

    return (
        <div className={'forgot-Main'}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                        <div className="loginCntr"> 
                            <ToastsContainer limit={1} store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT}/>
                            <div className="logoDs text-center mb-4">
                                <AppImage name={'logo.svg'}  height={61} width={146}/>
                            </div>
                            <div className="mb-20"> 
                            <TextFields label="Email" name="email" onKeyPress={this.enterPressed.bind(this)}
                                auto onChange={(e) => this.handlerInput(e)} />
                            </div>
                            {/* <div className="mb-20">
                                <PasswordField onKeyPress={this.enterPressed.bind(this)} id="Password" label="Password" name="password"  
                                onChange={(e) => this.handlerInput(e)}/>
                            </div> */}
                            <div className="mb-20 text-right terms">
                                <p><Link to="/login">Login</Link></p>
                            </div>
                            <div className="mt-4"  onClick={this.submit}><ButtonGray>Submit</ButtonGray></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}