import React from "react";
import {
  Grid,
  Typography,
  Box,
} from "@material-ui/core";
import { useSubstitutions } from "../../../components/substitution/context/Substitution.context";
import SubstitutionListItem from "./SubstitutionListItem.component";

const SubstitutionEditorSidebar = () => {
  const { substitutions, isSubsLoading, substitutionsJSON } =
    useSubstitutions();
  if (isSubsLoading || !substitutionsJSON.subOrder) return <>loading</>;
  return (
    <Box style={{ overflowY: "scroll", maxHeight: "100vh" }}>
      <Grid
        container
        direction="column"
        spacing={2}
        style={{ padding: "10px 0" }}
      >
        <Grid item>
          <Typography variant="h3"> Substitutions </Typography>
        </Grid>
        {substitutionsJSON.subOrder.map(
          (subId) =>
            substitutions[subId] && (
              <SubstitutionListItem substitution={substitutions[subId]} />
            )
        )}
      </Grid>
    </Box>
  );
};

export default SubstitutionEditorSidebar;
