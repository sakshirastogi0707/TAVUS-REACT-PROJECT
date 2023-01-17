import React from "react";
import {
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import getTranscriptSentence from "./getTranscriptSentence";
import SubstitutionConfigEditor from "./SubstitutionConfigEditor.component";

const SubstitutionListItem = ({ substitution }) => {
    const transcriptWordsCombined = getTranscriptSentence(
      substitution.variableWords
    );
    const timeStartEnd = substitution.timeStartEnd;
    return (
      <Grid item>
        <Accordion>
          <AccordionSummary>
            {substitution.generatedPhrase} | {transcriptWordsCombined}
          </AccordionSummary>
          <AccordionDetails>
            <Grid container direction="column" spacing={1}>
              <Grid
                item
                container
                justifyContent="space-between"
                direction="column"
              >
                <Grid item container justifyContent="space-between">
                  <span>Start</span>
                  <span> {timeStartEnd.start}</span>{" "}
                </Grid>
                <Grid item container justifyContent="space-between">
                  <span>End</span>
                  <span> {timeStartEnd.end}</span>{" "}
                </Grid>
              </Grid>
              <SubstitutionConfigEditor
                substitutionConfig={substitution.substitutionConfig}
                subId={substitution.subId}
              />
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    );
  };

export default SubstitutionListItem