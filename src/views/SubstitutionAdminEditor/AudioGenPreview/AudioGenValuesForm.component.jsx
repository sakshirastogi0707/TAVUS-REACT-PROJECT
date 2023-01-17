import React, { useEffect, useState } from "react";
import { useSubstitutions } from "../../../components/substitution/context/Substitution.context";
import {
  Button,
  Grid,
  Input,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import {
  StorageKeys,
  StorageService,
} from "../../../service/core/storage.service";
import { generateAudioRequest } from "../../../service/api/audioGen.service";
import { UserService } from '../../../service/api/user-service';

const AudioGenValuesForm = ({ setAudioGenId, campaignId }) => {
  const [variableNames, setVariableNames] = useState([]);
  const [variableMapping, setVariableMapping] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { getAllVariableNames } = useSubstitutions();

  const initVariableNamesAndMapping = async () => {
    setIsLoading(true);

    const allVarNames = await getAllVariableNames();
    const variableMappingTemp = {};
    allVarNames.forEach((varName) => {
      variableMappingTemp[varName] = "";
    });
    setVariableMapping(variableMappingTemp);
    setVariableNames(allVarNames);
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      initVariableNamesAndMapping();
    })();
  }, []);

  const onFormChange = (key, e) => {
    const value = e.target.value;
    setVariableMapping({
      ...variableMapping,
      [key]: value,
    });
  };

  const handleAudioGenSubmit = async () => {
    setIsLoading(true);
    const audioRequestId = await generateAudioRequest(
      variableMapping,
      campaignId
    );
    setAudioGenId(audioRequestId);
    StorageService.set(StorageKeys.audioGenId, audioRequestId);
    setIsLoading(false);
  };

  if (isLoading)
    return (
      <Grid item>
        <CircularProgress />
      </Grid>
    );
  return (
    <>
      <Grid item>
        <h5>Set Test values</h5>
      </Grid>
      {variableNames.map((name) => (
        <Grid item container justifyContent="space-between">
          <Grid item>{name}</Grid>
          <Grid item>
            <Input
              style={{ marginBottom: "10px" }}
              label={name}
              onChange={(e) => onFormChange(name, e)}
              defaultValue={variableMapping[name]}
            />
          </Grid>
        </Grid>
      ))}
      <Grid item>
        <Button onClick={() => handleAudioGenSubmit()} variant="contained">
          Submit
        </Button>
      </Grid>
    </>
  );
};

export default AudioGenValuesForm;
