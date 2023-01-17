import React from "react";
import SingleDropdownIcon from "../../../$widgets/dropdown/single-dropdown-icon";

const dropdownConfig = {
  audio: {
    icon: "microphone.svg",
    label: "Microphone",
  },
  video: {
    icon: "meeting-camera.svg",
    label: "Camera",
  },
};

const DeviceDropdown = ({
  type,
  currentDevice,
  availableDevices,
  onChange,
}) => {
  const config = dropdownConfig[type];
  return (
    <SingleDropdownIcon
      placeholder={`${currentDevice.label || " "}`}
      label={config.label}
      icon={config.icon}
      value={{
        value: currentDevice.deviceId,
        label: currentDevice.label,
        groupId: currentDevice.groupId,
      }}
      onChange={onChange}
      options={availableDevices.map((device) => ({
        value: device.deviceId,
        label: device.label,
        groupId: device.groupId,
      }))}
    />
  );
};

export default DeviceDropdown;
