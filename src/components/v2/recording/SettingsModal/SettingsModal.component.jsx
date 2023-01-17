import React from "react";
import AppDialogInvite from "../../../$widgets/AppDialogInvite/AppDialogInvite";
import IconLabelButtons from "../../../$widgets/buttons/icon-label-buttons";
import { useUserDevices } from "../context/UserDevices.context";
import UserDevicesSettings from "../UserDevicesSettings/UserDevicesSettings.component"
import "./SettingModal.styles.scss";

const Settings = ({ open, setOpen }) => {
  const { currentAudioDevice, currentVideoDevice } = useUserDevices();
  return (
    <div>
      <AppDialogInvite
        open={open}
        maxWidth={"lg"}
        customClassMain="video-modal-box"
        onClose={() => setOpen(false)}
        content={
          <div className="contentModal">
            {currentVideoDevice && currentAudioDevice && (
              <>
                <UserDevicesSettings />
                <div className="text-center">
                  <IconLabelButtons
                    onClick={() => setOpen(false)}
                    className="Close"
                    title="Close"
                  />
                </div>
              </>
            )}
          </div>
        }
      />
    </div>
  );
};

export default Settings;
