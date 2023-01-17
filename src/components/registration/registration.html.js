import React from "react";
import PasswordField from "../$widgets/input-fields/password-field";
import TextFields from "../$widgets/input-fields/text-field";
import {AppImage} from "../$widgets/images/app-image";
import {ButtonGray} from "../$widgets/buttons/button-gray";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../$widgets/loader/loader"
import { Link } from "react-router-dom";


export  function html() { 
    const {errors, isLoading} = this.state;
    const {} = this.props;
    const {validateLogin} = this;

    return (
      <div className={'registration-main registration-tab'}>
        <div className="container">
          <div className="registration-cntr">
          
            <div className="row justify-content-around">
              <div className="col-md-6 col-lg-6">
                <div className="logoDs  mb-4">
                    <AppImage name={'logo.svg'}  height={61} width={146}/>
                </div>
                <div className="head-title">
                  <div className="titleDiv">
                      <h1>Howdy there! 👋 You're looking great today.</h1>
                      <p>You're so close to generating videos using your AI clone. You ready?</p>
                  </div>
                  
                  {/* <div className="text-left">
                    <AppImage name={'register.png'} className={'img-fluid'} />
                  </div> */}
                </div>
              </div>
              {isLoading? <Loader /> :
              <div className="col-md-6 col-lg-6 pt-3">
                <h3>Let's finish making your account 🏁</h3>
                <div className="loginCntr">
                  <ToastContainer />
                    <div className="mb-20"> 
                      <TextFields label="First Name" name="first_name"  
                      onChange={(e) => this.handlerInput(e)} />
                      {errors['first_name'] &&<span className='error'>{errors.first_name}</span>}
                    </div>
                    <div className="mb-20"> 
                      <TextFields label="Last Name" name="last_name"  
                      onChange={(e) => this.handlerInput(e)} />
                      {errors['last_name'] &&<span className='error'>{errors.last_name}</span>}
                    </div>
                    <div className="mb-20"> 
                      <TextFields label="Email" name="email"
                      value={this.state.email}
                      disabled
                      onChange={(e) => this.handlerInput(e)} />
                      {errors['email'] &&<span className='error'>{errors.email}</span>}
                    </div>
                    <div className="mb-20">
                        <PasswordField id="Password" label="Password" name="password"  
                        onChange={(e) => this.handlerInput(e)}/>
                        {errors['password'] &&<span className='error'>{errors.password}</span>}
                    </div>
                    <div className="mb-5">
                        <PasswordField id="Password" label="Confirm Password" name="confirm_password"  
                        onChange={(e) => this.handlerInput(e)}/>
                        {errors['confirm_password'] &&<span className='error'>{errors.confirm_password}</span>}
                    </div>
                    
                    <div className="mb-20" onClick={this.submit}><ButtonGray>Submit</ButtonGray></div>
                    <div className="terms">
                      <p>By clicking Submit you agree to our <Link>Terms & conditions</Link></p>
                    </div>
                  </div>
              </div>
              }
            </div>
            
          </div>   
        </div>
      </div>
    );
}
