export default class DeviceService {
    static async getUserDevices() {
        let res = await navigator.mediaDevices.getUserMedia({audio: true, video: true})
        const devices = await navigator.mediaDevices.enumerateDevices()
        let audioDevices = [], videoDevices = []
        devices.forEach(function(device) {
            if(device.kind == 'audioinput'){
                audioDevices.push({value: device.deviceId, label: device.label, groupId: device.groupId})
            } else if(device.kind == 'videoinput'){
                videoDevices.push({value: device.deviceId, label: device.label, groupId: device.groupId})
            }
        });
        return {
            access: res.active,
            audioDevices,
            videoDevices
        }
    }

    static async openCamera(audioId, cameraId) {
        const constraints = {
            audio: {
              echoCancellation: true,
              deviceId: audioId,
            },
            video: {
                deviceId: cameraId,
            }
        }
        return await navigator.mediaDevices.getUserMedia(constraints);
    }
}
