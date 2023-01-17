import React, { useEffect, useState, useCallback, } from 'react';
import { Link } from "react-router-dom";
import { AppImage } from "../$widgets/images/app-image";
import PasswordField from "../$widgets/input-fields/password-field";
import OutlinedInputCustom from "../$widgets/input-fields/outlined-input"
import IconLabelButtons from "../$widgets/buttons/icon-label-buttons"
import AdminService from "../../service/api/admin.service";
import firebase from "../../components/firebase/firebase";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import _ from 'lodash';
import { toast } from "react-toastify";
import Loader from "../$widgets/loader/loader"
import Utils from "../../service/core/utils";
import Header from "../app-frame/app-header/app-header";
import AuthService from "../../service/core/auth.service";
import { StorageKeys, StorageService, TempStorage } from '../../service/core/storage.service';
import { SegmentService } from "../../service/api/segment.service";
import './email.scss';
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/modules/free-mode/free-mode.min.css';
import 'swiper/modules/navigation/navigation.scss';
import 'swiper/modules/thumbs/thumbs.min.css';
import { Pagination } from "swiper";

const ariaLabel = { 'aria-label': 'description' };
function Email(props) {

    const [isLoading, setLoading] = useState(false)
    const [serverError, setServerError] = useState('')
    const [invitedUser, setInvited] = useState('')
    const [formstate, setFromState] = useState({
        email: '',
        password: '',
        marketing_communication: false,
        terms: false,
        errors: {}
    })
    SwiperCore.use([Autoplay]);

    useEffect(() => {
        (async () => {
            setLoading(true)
            let isAdmin = await AuthService.isAdmin()
            let isLogin = await AuthService.isLogin()
            if (isLogin || isAdmin) {
                let redirectPath = ''
                if (isAdmin) {
                    redirectPath = '/users'
                } else if (isLogin) {
                    redirectPath = '/dashboard';
                }
                if (redirectPath) {
                    return props.history.push(redirectPath);
                }
            }
            const url = new URL(window.location.href);
            var emailUrl = url.searchParams.get('user');
            const search = window.location.search;
            if (search) {
                var splitSearch = search.split('?')
                if (splitSearch && splitSearch.length > 0) {
                    var splitSearch2 = splitSearch[1].split('&')
                    if (splitSearch2 && splitSearch2.length > 0) {
                        var splitSearch3 = splitSearch2[0].split('=')
                        if (splitSearch3 && splitSearch3.length > 0) {
                            emailUrl = splitSearch3[1]
                        }
                    }
                }
            }
            let isInvited = emailUrl ? emailUrl : ''
            if (isInvited) {
                setInvited(isInvited)
            }
            userDetails(isLogin)
            setLoading(false)
        })();
    }, []);

    async function userDetails(isLogin) {
        if (isLogin) {
            AdminService.userDetails().then(async (response) => {
                if (response?.status && !response.step) {
                    props.history.push('/dashboard')
                }
                if (response?.step) {
                    Utils.signupUrls(response.step, props)
                }
            }).catch((error) => {
                console.log('error', error)
            }).finally(() => {
                setLoading(false)
            })
        } else {
            await firebase.logout()
        }
    }

    function validateForm() {
        const { email, password, marketing_communication, terms } = formstate;
        let userEmail = invitedUser ? invitedUser : email
        const errors = {};
        if (!password) {
            errors.password = "Please enter password.";
        }
        if (!userEmail) {
            errors.email = "Please enter valid email.";
        }
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(userEmail).toLowerCase())) {
            errors.email = "Please enter a valid email address."
        }
        const newObj = { ...formstate };
        newObj.errors = errors;
        setFromState(newObj);
        return _.isEmpty(errors);
    }

    async function register() {
        const { email, password, marketing_communication } = formstate
        let params = {
            email: invitedUser ? invitedUser : email,
            signup_type: 'email'
        }
        const isValid = validateForm()
        if (isValid) {
            setLoading(true)
            let resultFirebase = await firebase.register(invitedUser ? invitedUser : email, password);
            if (resultFirebase?.status == false) {
                setServerError(resultFirebase?.message)
                setLoading(false)
            } else {
                addUserByEmail(params, resultFirebase?.user?.uid, invitedUser ? invitedUser : email)
            }
        }
    }

    function addUserByEmail(params, uid, email_id) {
        AdminService.initialSignup(params).then(async (response) => {
            if (response.status) {
                if (response?.data?.id) {
                    window.analytics.user().id(response?.data?.uuid)
                    StorageService.setPerm('Role', response?.data?.role)
                    await SegmentService.analyticsTrack("Registration Started", {
                        email: email_id ? email_id : email,
                    });
                }
                props.history.push('/signup/privacy-policy')
            } else {
                setServerError(response?.message)
                await firebase.deleteUserFromAuthentication(uid);
            }
        }).catch((error) => {
            console.log('error', error)
        }).finally(() => {
            setLoading(false)
        })
    }

    function handleChange(event) {
        const { name, value, checked } = event.target;
        const newObj = { ...formstate };
        if (name == 'marketing_communication' || name == 'terms') {
            newObj[name] = checked;
        } else {
            newObj[name] = value
        }
        setFromState(newObj)
    }

    async function googleSignIn() {
        try {
            let userInfo = await firebase.googleSignInPopup();
            AdminService.login().then((response) => {
                let data = response.data;
                if (response.status) {
                    window.analytics.user().id(response?.data.uuid)
                    StorageService.setPerm('Role', response?.data?.role)
                    data['uid'] = userInfo?.uid
                    switch (response.step) {
                        case 2:
                            return props.history.push('/signup/privacy-policy')
                        case 3:
                            return props.history.push("/signup/company");
                        case 4:
                            return props.history.push("/signup/website");
                        case 5:
                            return props.history.push("/signup/role");
                        case 6:
                            return props.history.push("/signup/plan");
                        case 7:
                            return props.history.push("/signup/address");
                        case 8:
                            return props.history.push("/signup/price");
                        case 9:
                            return props.history.push("/signup/book-demo");
                        default:
                            intercomDetail(data)
                    }
                } else if (!response.status && response?.data) {
                    setServerError(response.message)
                } else {
                    let params = {
                        email: userInfo.email,
                        signup_type: 'google'
                    }
                    addUserByEmail(params, userInfo.uid, userInfo.email)
                }
            }).catch((error) => {
                console.log(error, 'error')
                this.setState({ isLoading: false })
            })
        } catch (error) {
            console.log(error, 'google login error')
        }
    }

    async function intercomDetail(data) {
        if (data) {
            if (data.role === 'admin') {
                return props.history.push("/users");
            } else {
                return props.history.push("/dashboard");
            }
        } else {
            this.setState({ isLoading: false })
        }
    }

    const handleEnter = (event) => {
        if (event.key.toLowerCase() === "enter") {
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            if (index == 1) {
                register()
            } else {
                form.elements[index + 1].focus();
            }
            event.preventDefault();
        }
    };

    const { email, password, marketing_communication, terms, errors } = formstate;

    return (
        <div className={'signup-frame-main'}>
            <div className='signup-left'>
                <div className='signup-left-box'>
                    <AppImage name={'logo.svg'} width={'128'} />
                    <div className='signup-top'>
                        <h2>Meet Tavus, the best video engine on the market.</h2>
                        <p>It’s time to reimagine how we <br /> communicate.</p>
                    </div>
                    <div className='signup-bottom'>
                        <p><strong>75%</strong> of late-stage prospects buy after receiving a personal video</p>
                        <hr />
                        <p> <strong>94%</strong> of marketers say videos help increase user understanding of their product or service</p>
                    </div>
                    <div className='swiper-main-box'>
                        <Swiper
                            spaceBetween={30}
                            pagination={{
                                clickable: true,
                            }}
                            loop={true}
                            autoplay={true}

                            modules={[Pagination]}
                            className="mySwiper"
                        >
                            <SwiperSlide><p><strong>75%</strong> of late-stage prospects buy after receiving a personal video</p></SwiperSlide>
                            <SwiperSlide><p> <strong>94%</strong> of marketers say videos help increase user understanding of their product or service</p></SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
            <div className='signup-right-box'>
                {/* {isLoading ? <Loader /> : */}
                <div className='DevBoxSection d-flex flex-column justify-content-center align-items-center'>
                    <form className='w-100'>
                        <div className="">
                            <Header />
                            <div className='header'>
                                <h1>Sign up</h1>
                                <h3>Already have an account? <Link to='/login'>Login</Link> </h3>
                            </div>
                            <OutlinedInputCustom onKeyDown={handleEnter} placeholder="Email Address" value={invitedUser ? invitedUser : email} name="email" onChange={(e) => handleChange(e)} required autoFocus={true} inputProps={ariaLabel} className='mb-4' />

                            {errors['email'] && <span className='error'>{errors.email}</span>}
                            <div className="passcode" >
                                <PasswordField onKeyDown={handleEnter} className="Password" value={password} name="password" onChange={(e) => handleChange(e)} required autoFocus={false} label="Password" />
                                {errors['password'] && <span className='error'>{errors.password}</span>}
                            </div>
                            {errors['terms'] && <span className='error'>{errors.terms}</span>}
                            <div className='login-btn'>
                                <IconLabelButtons
                                    // disabled={isLoading}
                                    className="invitebtn"
                                    onClick={register}
                                    title="Next"
                                    disabled={(((!email && !invitedUser)) || !password || isLoading) ? true : false}
                                />
                            </div>
                            <div className='hrDiv'>
                                <hr />
                            </div>
                            {!invitedUser &&
                                <div className="signup_gmail">
                                    <Button onClick={googleSignIn} className="signup_btn_google">  <AppImage name={'google-icon.svg'} /> Continue with Google </Button>

                                </div>
                            }
                        </div>
                    </form>
                </div>
                {serverError &&
                    <div className='alertMs'>
                        <Alert severity="error" onClose={() => setServerError('')}>{serverError} <Link to='/login'>LOGIN</Link> </Alert>
                    </div>
                }
            </div>

        </div>
    );
}
export default Email;