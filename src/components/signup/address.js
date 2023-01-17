import React, {useEffect, useState, useRef, useCallback} from 'react';
import Inputs from '../$widgets/input-fields/input-field';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import  AdminService  from "../../service/api/admin.service";
import { AppImage } from "../$widgets/images/app-image";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@mui/material/Box';
import Utils from "../../service/core/utils";
import axios from 'axios';
import Header from "../app-frame/app-header/app-header";
import AppFooter from "../app-frame/app-footer/app-footer";
import { SegmentService } from '../../service/api/segment.service';
const ariaLabel = { 'aria-label': 'description' };


const mapAccess = {mapboxApiAccessToken: process.env.REACT_APP_MAPBOX};
const queryParams = {
    country: "au",
    types: "address"
};

const Address = (props) => {
    useEffect(() => {
        userDetails()
    },[])

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, false);
        return () => {
          document.removeEventListener("click", handleClickOutside, false);
        };
    }, []);

    const handleClickOutside = event => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setResults([])
        }
    };

    const wrapperRef = useRef(null);

    const [isLoading, setLoading] = useState(false)
    const [shipping, setShipping] = useState('')
    const [errors, setErrors] = useState(false)
    const [results, setResults] = useState([])
    const [cursor, setCursor] = useState(-1)
    const [isVisible, setIsVisible] = useState(true);
    const [isInvited, setIsInvited] = useState(false);
    const [userData, setUserData] = useState({});

    async function userDetails() {
        AdminService.userDetails().then(async (response) =>{
            if(!response || !response.step){
                props.history.push('/signup/email')
            }
            if(response.step<7){
                Utils.signupUrls(response.step,props)
            }
            if(response?.data?.invitee?.survey?.id){
                setIsInvited(true)
            }
            if(response?.data.survey?.shipping_address){
                setShipping(response?.data.survey?.shipping_address)
            }
            setUserData(response?.data)
        }).catch((error) => {
            console.log('error', error)
        }).finally(()=>{
            setLoading(false)
        })
    }
    
    async function updateUser() {
        setErrors(false)
        let params = {
            shipping_address: shipping,
            step: 'step8'
        }
        await AdminService.survey(params).then(async (response) =>{
            if(response.status){
                if(response?.data?.id){
                   await SegmentService.analyticsTrack(shipping ? 'Address Added' : 'Address Skipped', {
                        address : shipping,
                    });
                }
                if(isInvited){
                    props.history.push('/microphone')
                } else {
                    props.history.push('/signup/price')
                }
            }
        }).catch((error) => {
            console.log('error', error)
        }).finally(()=>{
            setLoading(false)
        })
    }

    const selectAddress = (val) => {
        setShipping(val)
        setResults([])
    };

    const performSearch = (value) => {
        if (value === "") {
            setResults([])
            setLoading(false)
            setShipping(value)
          return
        } 
        setShipping(value)
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${process.env.REACT_APP_MAPBOX}`)
          .then(response => {
            let serach_result = []
            if(response?.data?.features.length>0){
                for(let i=0; i<response?.data?.features.length; i++){
                    serach_result.push({value: response?.data?.features[i].place_name})
                }
            }
            setResults(serach_result)
            setLoading(false)
        })
    }


    const handleKeyDown =(e)=> {
        if (e.keyCode === 38) {
            if(cursor>0){
                setCursor(cursor-1)
                setShipping(results[cursor-1]?.value)
            }
        } else if (e.keyCode === 40) {
            if(cursor==results.length){
                setCursor(0)
                setShipping(results[0]?.value)
            } else {
                setCursor(cursor+1)
                setShipping(results[cursor+1]?.value)
            }
        }
        if (e.key.toLowerCase() === "enter") {
            if(results.length>0){
                for(let i=0;i<results.length;i++){
                    setShipping(results[cursor].value)
                    setResults([])
                }
            } else {
                updateUser()
            }
        }
      }    
    
      const searchUsingDebounce = useCallback( Utils.debounce(performSearch), []);

    return (
        <div className={'signup-main'}>
        <div className={'container'}>  
        <div className={'align-self-center w-100'} >
            <>
            <Header
                userData={userData}
                title="Enter your shipping address."
                subtitle="You will recieve our free Tavus microphone" />
                <div className="box box-address mobile-box boxDev d-flex flex-column align-items-center justify-content-center">
                    <div className="DevBox m-auto w7">
                        <div className="DevBoxSec">
                            <Inputs 
                                onKeyDown={ handleKeyDown } 
                                className="customInput" variant="outlined" 
                                placeholder="Shipping Address" name="shipping" 
                                value={shipping}
                                onChange={(e) => searchUsingDebounce(e.target.value)}
                                autoComplete="off"
                                inputProps={ariaLabel} 
                                ref={wrapperRef}
                                autoFocus={true}
                            />
                            {results.length>0 && <ul className='listAddress'>
                                {results && results.length>0 && results.map((val,i)=>{
                                    return  <li onKeyDown={ handleKeyDown } key={val.value} className={cursor === i ? 'li-active' : null} style={{cursor:'pointer'}} onClick={()=>selectAddress(val.value)}>{val.value}
                                                {cursor === i  && <AppImage name={'check-gray.svg'} width={'16'} className="pull-right pt-1" />} 
                                            </li>
                                })}
                            </ul>}
                            {errors && <span className='error'>Please enter address</span>}
                            <p className='address_contant'>We <i><b>highly</b></i> recommend using our free Tavus microphone in order to get the best quality of videos.<br/>
                            If you already have a <b>studio-grade</b> microphone or don't want to wait for one, you can continue without it.</p>
                        </div>
                    </div>
                </div>
            
            <AppFooter 
                userData={userData}
                onClick={updateUser} 
                isLoading={isLoading}
                disabled={(isLoading) ? true : false} 
                onBack= {()=>props.history.push('/signup/tshirt')}
                isBack={true}
                title={shipping ? 'Continue' : 'Skip'}
                progress={85}
                invite={true}
                step={'registration'}
            />
            </>
        </div>
        </div>
        </div>
    );
}

export default Address;