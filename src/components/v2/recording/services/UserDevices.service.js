import {
  StorageService,
  StorageKeys,
} from "../../../../service/core/storage.service";

export const AUDIO_DEVICE_KIND = "audioinput";
export const VIDEO_DEVICE_KIND = "videoinput";

const audioDeviceStoreKey = StorageKeys.userSetAudioDevice;
const videoDeviceStoreKey = StorageKeys.userSetVideoDevice;

export const getUserDevices = async () => {
  try {
    const mediaDevices = await navigator.mediaDevices.enumerateDevices();
    const audioDevices = mediaDevices.filter(
      ({ kind }) => kind === AUDIO_DEVICE_KIND
    );
    const videoDevices = mediaDevices.filter(
      ({ kind }) => kind === VIDEO_DEVICE_KIND
    );
    return {
      audioDevices,
      videoDevices,
    };
  } catch (error) {
    throw new Error(`Error getting user devices caused by ${error}`);
  }
};


export const getUserAudioVideoActive = async () => {
  try {
    const { active } = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    return active;
  } catch (error) {
    console.error(`Error getting user audio/video active caused by: ${error}`)
    return false;
  }
};

export const getAudioDeviceFromLocalStorage = () => {
  const storeAudioDevice = StorageService.getLocalData(audioDeviceStoreKey);
  return storeAudioDevice ? storeAudioDevice : {};
};

export const getVideoDeviceFromLocalStorage = () => {
  const storeVideoDevice = StorageService.getLocalData(videoDeviceStoreKey);
  return storeVideoDevice ? storeVideoDevice : {};
};

export const setAudioDeviceLocalStorage = (device) => {
    StorageService.setPerm(audioDeviceStoreKey, device);
}
export const setVideoDeviceLocalStorage = (device) => {
    StorageService.setPerm(videoDeviceStoreKey, device);

}




