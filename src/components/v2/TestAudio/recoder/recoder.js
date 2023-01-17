import React, {useEffect, useState, useRef, useCallback} from 'react';
import VideoRecorder from 'react-video-recorder'
import './recoder.scss';
import Countdown from 'react-countdown';

const ariaLabel = { 'aria-label': 'description' };


let counter = 3
const Recorder = ({startRecord,stopRecord,setStatus,setMedia,playRecord,pauseRecord,recordAnother,setRecording,setModal1}) => {
    const [isVideo, setVideo] = useState(false)
    const [isRecording, setIsRecording] = useState(false);
    const [counter, setCounter] = useState(false);
    const [interval, setIntervalId] = useState(0);
    const refi = useRef()

    useEffect(() => {
      if(startRecord){
          startRecord.current = handleStartRecording
      }
    }, [])

   

    useEffect(() => {
      if(stopRecord){
          stopRecord.current = handleStopRecording
      }
    }, [])

    useEffect(() => {
      if(recordAnother){
        recordAnother.current = handleNewRecording
      }
    }, [])

    async function handleNewRecording() {
      await refi.current.turnOnCamera();
      setMedia(null)
    };
    
    async function handleStartRecording() {
      setStatus(true)
      setCounter(true)
      setTimeout(
        async function() {
          await refi.current.startRecording();
        }
        .bind(this),
        3000
      )
      setIsRecording(true)
    };

    async function handleStopRecording() {
      await refi.current.handleStopRecording();
      await refi.current.handleStopReplaying()
      setRecording(true)
      setIsRecording(false)
      setModal1(true)
      setCounter(false)
      setStatus(false)
    };

    const renderer = ({ hours, minutes, seconds, completed }) => {
      if (completed) {
        return ''
      } else {
        return <span>{seconds}</span>;
      }
    };

    return (
      <>
          {counter &&
            <div className='count-down'>
                <p style={{color: 'white'}}><Countdown date={Date.now() + 3000} renderer={renderer}></Countdown> </p>
            </div>
            
          }
          {isRecording &&
            <div className='recordinDevBox'>
                <p style={{backgroundColor: 'red'}} className="recordinDev"></p>
            </div>
           
          }
          <VideoRecorder
            ref={refi}
            replayVideoAutoplayAndLoopOff
            constraints={{
              audio: true,
              video: false
            }}
            onRecordingComplete={(videoBlob) => {
              setMedia(videoBlob)
            }}
            renderActions={() => {}}
            isOnInitially
            showReplayControls
          />
        
       
      </>
    );
  }

export default Recorder;