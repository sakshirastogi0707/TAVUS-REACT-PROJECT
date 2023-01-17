import React, { useEffect } from "react";
import { useState } from "react";
import { Grid } from "@material-ui/core";
import {
  StorageKeys,
  StorageService,
} from "../../../service/core/storage.service";
import AudioGenPreviewResults from "./AudioGenPreviewResults.component";
import AudioGenValuesForm from "./AudioGenValuesForm.component";
const AudioGenPreview = ({campaignId}) => {

  const [audioGenId, setAudioGenId] = useState(null);
  const initAudioGenId = () => {
    const storedAudioGenId = StorageService.get(StorageKeys.audioGenId);
    if (storedAudioGenId && storedAudioGenId != "undefined") {
      setAudioGenId(storedAudioGenId);
    }
  };

  const clearAudioId = () => {
    StorageService.delete(StorageKeys.audioGenId);
    setAudioGenId(null)
  }

  useEffect(() => {
    initAudioGenId();
  }, []);

  return (
    <Grid container direction="column" style={{ width: "100%" }}>
      <Grid item>
        <h4 style={{borderBottom: 'solid 1px white'}}>Create Test Audio</h4>
      </Grid>
      {!audioGenId ? (
        <AudioGenValuesForm campaignId={campaignId} setAudioGenId={setAudioGenId}/>
      ) : (
        <Grid item>
          <AudioGenPreviewResults audioGenId={audioGenId} clearAudioId={clearAudioId}/>
        </Grid>
      )}
    </Grid>
  );
};

export default AudioGenPreview;
