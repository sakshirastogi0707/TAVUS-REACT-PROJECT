import { CircularProgress } from "@material-ui/core";
import React from "react";
import { GVSProvider } from "../../../substitution/context/GVS.context";
import { useSubstitutions } from "../../../substitution/context/Substitution.context";
import { TemplateWord } from "../../../template-transcript/TemplateWord/TemplateWord.component";
import { VariableWords } from "../../../template-transcript/VariableWord/VariableWord.component";

const PreviewTranscript = () => {
  const { template, substitutions, isSubsLoading } = useSubstitutions();
  if (isSubsLoading) return <CircularProgress />;
  return (
    <GVSProvider>
      {substitutions && template.map((templateWord, idx) => {
        if (templateWord && templateWord.type === "subId") {
          return (
            <VariableWords
              noRevertAllowed={true}
              substitution={substitutions[templateWord.subId]}
              key={`variableWords-${idx}`}
            />
          );
        }
        return <TemplateWord key={`TemplateWords-${idx}`} {...templateWord} />;
      })}
    </GVSProvider>
  );
};

export default PreviewTranscript
