import React, { createContext, useContext, useEffect, useState } from "react";
import { isObjectEmpty } from "../../../../utils/utils";
import {
  getUserAudioVideoActive,
  getUserDevices,
  getAudioDeviceFromLocalStorage,
  getVideoDeviceFromLocalStorage,
  setAudioDeviceLocalStorage,
  setVideoDeviceLocalStorage,
} from "../services/UserDevices.service";
const UserDevicesContext = createContext();

const UserDevicesProvider = ({ children }) => {
  const AUDIO_DEVICE_KIND = "audioinput";
  const VIDEO_DEVICE_KIND = "videoinput";

  const [currentAudioDevice, setCurrentAudioDevice] = useState(
    getAudioDeviceFromLocalStorage()
  );
  const [currentVideoDevice, setCurrentVideoDevice] = useState(
    getVideoDeviceFromLocalStorage()
  );
  const [audioDevices, setAudioDevices] = useState([]);
  const [videoDevices, setVideoDevices] = useState([]);
  const [allowedAccess, setAccess] = useState(true);

  const findDeviceByDeviceId = (deviceArray, deviceId) => {
    return deviceArray.find((device) => device.deviceId === deviceId);
  };

  const doesDeviceExist = (type, deviceId) => {
    if (deviceId === undefined) return false;
    if (type === AUDIO_DEVICE_KIND && audioDevices.length > 0) {
      return !!findDeviceByDeviceId(audioDevices, deviceId);
    }
    if (type === VIDEO_DEVICE_KIND && videoDevices.length > 0) {
      return !!findDeviceByDeviceId(videoDevices, deviceId);
    }
    return false;
  };

  const shouldSetDeviceToDefault = (currentDevice, type) => {
    const isDeviceUninitialized = isObjectEmpty(currentDevice);
    if (isDeviceUninitialized) return true;
    
    return !doesDeviceExist(type, currentDevice.deviceId);
  };

  const handleDevices = React.useCallback(
    (mediaDevices) => {
      setVideoDevices(mediaDevices.videoDevices);
      setAudioDevices(mediaDevices.audioDevices);
    },
    [setVideoDevices, setAudioDevices]
  );

  const setUpDevices = async () => {
    try {
      const isActive = await getUserAudioVideoActive();
      setAccess(isActive);
      if (isActive) {
        const mediaDevices = await getUserDevices();
        handleDevices(mediaDevices);
      }
    } catch (error) {
      console.error(`Error Setting up user devices caused by: ${error}`);
      setAccess(false);
    }
  };

  useEffect(() => {
    if (
      audioDevices.length > 0 &&
      shouldSetDeviceToDefault(currentAudioDevice, AUDIO_DEVICE_KIND)
    ) {
      changeCurrentAudioDevice(audioDevices[0]);
    }
  }, [audioDevices]);

  useEffect(() => {
    if (
      videoDevices.length > 0 &&
      shouldSetDeviceToDefault(currentVideoDevice, VIDEO_DEVICE_KIND)
    ) {
      changeCurrentVideoDevice(videoDevices[0]);
    }
  }, [videoDevices]);

  useEffect(()=>{
    navigator.mediaDevices.ondevicechange = (event) => {
      setUpDevices();
    };
  })

  useEffect(() => {
    setUpDevices(); 
  }, [handleDevices]);

  const changeCurrentAudioDevice = (device) => {
    setAudioDeviceLocalStorage(device);
    setCurrentAudioDevice(device);
  };

  const changeCurrentVideoDevice = (device) => {
    setVideoDeviceLocalStorage(device);
    setCurrentVideoDevice(device);
  };

  return (
    <UserDevicesContext.Provider
      value={{
        currentAudioDevice,
        currentVideoDevice,
        audioDevices,
        videoDevices,
        allowedAccess,
        changeCurrentAudioDevice,
        changeCurrentVideoDevice,
      }}
    >
      {children}
    </UserDevicesContext.Provider>
  );
};

const useUserDevices = () => {
  const context = useContext(UserDevicesContext);
  if (context === undefined) {
    throw new Error("useUserDevices must be in UserDevicesProvider");
  }
  return context;
};

export { useUserDevices, UserDevicesProvider };
