import React, { useEffect, useState } from "react";
import { CircularProgress, Grid, Typography } from "@material-ui/core";
import { TextField } from "@mui/material";
import { updateSubstitutionConfig } from "../../../service/api/substitution.service";
import { UserService } from '../../../service/api/user-service';
import { Button } from "@material-ui/core";
import {
  StorageKeys,
  StorageService,
} from "../../../service/core/storage.service";
import { useHistory, useParams } from "react-router-dom";

const SubstitutionConfigEditor = ({ substitutionConfig, subId }) => {
  const [subsConfig, setSubsConfig] = useState(substitutionConfig);
  const [isLoading, setIsLoading] = useState(false);
  const [campaignId, setCampaignID] = useState(null);
  const subsConfigKeys = Object.keys(substitutionConfig);
  const params = useParams();

  useEffect(() => {
    (async () => {
      setCampaignID(params?.campaignId)
    })();
  }, []);

  const onFormChange = (key, e) => {
    const value = e.target.value;
    setSubsConfig({ ...subsConfig, [key]: value });
  };

  const update = async () => {
    setIsLoading(true);
    await updateSubstitutionConfig(params?.campaignId, subId, subsConfig);
    setIsLoading(false);
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography>Substitution Config</Typography>
      </Grid>
      <Grid item>
        <form>
          {subsConfigKeys.map((key) => (
            <>
              <TextField
                style={{ marginBottom: "10px" }}
                label={key}
                onChange={(e) => onFormChange(key, e)}
                InputProps={{
                  endAdornment: <span style={{ color: "white" }}>sec</span>,
                }}
                defaultValue={subsConfig[key]}
              />
              <br />
            </>
          ))}
        </form>
        <Button onClick={update} variant="contained">
          {isLoading ? <CircularProgress /> : "update" }
        </Button>
      </Grid>
    </Grid>
  );
};

export default SubstitutionConfigEditor;
