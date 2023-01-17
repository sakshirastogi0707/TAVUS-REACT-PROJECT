import React, { useState } from "react";
import { Button, CircularProgress, Grid } from "@material-ui/core";
import { useEffect } from "react";
import { getStatusAndUrlOfAudioRequest } from "../../../service/api/audioGen.service";

const AudioGenPreviewResults = ({ audioGenId, clearAudioId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [isAudioError, setIsAudioError] = useState(false);


  const pollingFunction = async () => {
    const { isReady, finalAudioUrl, isError } = await getStatusAndUrlOfAudioRequest(
      audioGenId
    );

    if (isReady) {
      setIsAudioReady(true);
      setAudioUrl(finalAudioUrl);
      setIsLoading(false);
      return;
    }

    if(isError){
      setIsAudioError(true)
      setIsLoading(false);
      return;
    }

    setTimeout(pollingFunction, 5000);
  };

  useEffect(() => {
    pollingFunction();
  }, []);

  if (isLoading)
    return (
      <Grid item>
        <CircularProgress />
      </Grid>
    );
  return (
    <Grid item container spacing={1} direction="column">
      <Grid item>ID: {audioGenId}</Grid>
      {isAudioReady && (
        <Grid item>
          <audio controls preload="auto" src={audioUrl} />
        </Grid>
      )}
      {
        isAudioError && (
          <Grid>
            Error creating audio
            </Grid>
        )
      }
      <Grid item>
        <Button onClick={() => clearAudioId()} variant="contained">
          Create New Request
        </Button>
      </Grid>
    </Grid>
  );
};

export default AudioGenPreviewResults;
