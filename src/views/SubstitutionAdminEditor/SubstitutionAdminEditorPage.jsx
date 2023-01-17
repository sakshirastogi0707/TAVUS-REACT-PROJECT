import React from "react";
import { useParams } from "react-router-dom";
import {
  SubstitutionProvider,
} from "../../components/substitution/context/Substitution.context";
import {
  StorageService,
  StorageKeys,
} from "../../service/core/storage.service";
import SubstitutionEditorSidebar from "./SubstitutionEditorSidebar/SubstitutionEditorSidebar.component";
import { Grid } from "@material-ui/core";
import TemplateTranscript from "./TemplateEditorAdmin/TemplateEditorAdmin.component";
import AudioGenPreview from "./AudioGenPreview/AudioGenPreview.component";

const SubstitutionAdminEditorPage = (props) => {
  const params = useParams();
  return (
    <>
      <SubstitutionProvider campaignId={params?.campaignId}>
        <Grid container direction="row-reverse" spacing={1}>
          <Grid item xs={3} style={{padding: '20px'}}>
            <SubstitutionEditorSidebar />
          </Grid>
          <Grid item container xs style={{ padding: '20px 20px', minHeight: '100vh'}} direction="column">
            <Grid item style={{background: 'rgb(35, 38, 49)', padding: '20px', minHeight: '400px', borderRadius: '30px', marginBottom: '30px'}}>
              <TemplateTranscript />
            </Grid>
            <Grid item  style={{background: 'rgb(35, 38, 49)', padding: '20px', maxHeight: '400px', width: '50%', borderRadius: '30px'}}>
              <AudioGenPreview campaignId={params?.campaignId}/>
            </Grid>
          </Grid>
        </Grid> 
        <Grid>
        </Grid>
      </SubstitutionProvider>
    </>
  );
};

export default SubstitutionAdminEditorPage;
