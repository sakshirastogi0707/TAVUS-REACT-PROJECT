import React, {useEffect, useState} from 'react';
import "./TestAudio.scss";
import HeaderLanding from "../../app-frame/app-header-landing/app-header-landing";
import AppFooter from "../../app-frame/app-footer/app-footer";
import { AppImage } from "../../$widgets/images/app-image";
import Recording from "./recording/recording"
import AudioAndVideo from "./AudioAndVideo/AudioAndVideo"

const TestAudio = (props) => {

  const [allowdAccess, setAccess] = useState(false)
  const [audioDevices, setAudioDevices] = useState([])
  const [selectedAudio, setDefaultAudio] = useState([])
  const [mediaUrl, setMedia] = useState(null)
  const [step, setStep] = useState(1)
  
  useEffect(() => {
    (async () => {
      getUserDevices()
    })();
  }, [])

  const next = async () => {
    if(step==1){
      setStep(2)
    } else if(step==2){
      
    }
  }
  
  
  const getUserDevices = async () => {
    await navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(function(res) {
      if(res.active){
        setAccess(true)
      }
    })
    navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
      let audioDevices = []
      devices.forEach(function(device) {
        if(device.kind == 'audioinput'){
          audioDevices.push({value: device.deviceId, label: device.label, groupId: device.groupId})
        } 
      });
      setAudioDevices(audioDevices)
      if(audioDevices.length>0){
        openCamera(audioDevices[0])
        setDefaultAudio(audioDevices[0])
      }
    }).catch(function(err) {
      console.log(err.name + ": " + err.message);
    });
  }

  async function openCamera(audioId) {
    const constraints = {
        'audio': {
          'echoCancellation': true,
          'deviceId': audioId,
        }}
    return await navigator.mediaDevices.getUserMedia(constraints);
  }

  const handleSelectAudio = (val) => {
    setDefaultAudio(val)
    if(val && val.value){
      openCamera(val.value)
    }
  }

  const isDisabled = ()=> {
    if(!mediaUrl){
      return true
    }
  }
 
  
  return (
    <>
      {step==1 &&
        <Recording
          openCamera={openCamera}
          audioDevices={audioDevices} 
          allowdAccess={allowdAccess} 
          selectedAudio={selectedAudio}
          setMedia={setMedia} 
          handleSelectAudio={handleSelectAudio}
       />
      }
      {step==2 && 
        <AudioAndVideo />
      }
      
      
      <AppFooter
        disabled={isDisabled()}
        title={"Continue"}
        onClick={next}
      /> 
    </>
  );
}

export default TestAudio; 
