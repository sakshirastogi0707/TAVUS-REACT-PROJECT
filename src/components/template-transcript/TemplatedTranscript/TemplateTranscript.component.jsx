import React, { useEffect, useState } from "react";
import { TemplateWord } from "../TemplateWord/TemplateWord.component";
import shortUUID from "short-uuid";
import SubstitutionModal from "../../substitution/SubstitutionModal/SubstitutionModal.component";
import { VariableWords } from "../VariableWord/VariableWord.component";
import Loader from "../../$widgets/loader/loader";
import { GVSProvider } from "../../substitution/context/GVS.context";
import { useSubstitutions } from "../../substitution/context/Substitution.context";
import DismissModal from "../../v2/modals/DismissModal/DismissModal.component";

const TemplateTranscript = ({isLoading}) => {
  const [loading, setLoading] = useState(false);
  const [spanIds, setSpanIds] = useState([]);
  const [spanIdsToTemplate, setSpanIdsToTemplate] = useState([]);
  const [selectionWords, setSelectionWords] = useState("");
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [subModalPosition, setSubModalPosition] = useState({ x: 0, y: 0 });
  const [startEndIndexOfHighlighted, setStartEndIndexOfHighlighted] = useState(
    {}
  );

  const {template, substitutions, isSubsLoading} = useSubstitutions()

  const handleOnModelClose = () => {
    setSelectionWords("");
    setIsSubModalOpen(false);
    setStartEndIndexOfHighlighted({});
  };
  useEffect(() => {
    setLoading(true)
    if(template){
      const spanIds = [];
      const spanIdsToTemplate = [];
      template.forEach((word, idx) => {
        const id = shortUUID.generate();
        spanIds.push(id);
        spanIdsToTemplate[id] = { ...word, index: idx };
      });
      setSpanIds(spanIds);
      setSpanIdsToTemplate(spanIdsToTemplate);
    }
    setLoading(false)
   
  }, [template, substitutions,isSubsLoading]);



  const handleOnMouseUp = () => {
    const selection = window.getSelection();
    if (selection.anchorNode === null) return;
    const start = selection.anchorNode.parentElement.id;
    const end = selection.focusNode.parentElement.id;
    if (spanIdsToTemplate[start] && spanIdsToTemplate[end]) {
      const idx1 = spanIdsToTemplate[start].index;
      const idx2 = spanIdsToTemplate[end].index;
      const startIdx = idx1 > idx2 ? idx2 : idx1;
      const endIdx = idx1 < idx2 ? idx2 : idx1;
      let selectionWords = "";
      for (let i = startIdx; i <= endIdx; i++) {
        selectionWords += template[i].word;
      }
      const { x, y } =
        selection.anchorNode.parentElement.getBoundingClientRect();
      setSelectionWords(selectionWords);
      setStartEndIndexOfHighlighted({ startIdx, endIdx });
      setSubModalPosition({ x, y });
      setIsSubModalOpen(true);
      if (window.getSelection().empty) {
        // Chrome
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {
        // Firefox
        window.getSelection().removeAllRanges();
      }
    }
  };



 

  if (loading || isLoading || isSubsLoading)
    return (
      <Loader/>
    );
  if(!template){
    return <>
    <DismissModal 
      open={true}
      title={"Error retrieving template"}
      content={"There was an error getting your template!"}
    />
    </>
  }
  return (
    <GVSProvider>
      <div onMouseUp={handleOnMouseUp} style={{ position: "relative" }}>
        {spanIds.map((id, idx) => {
          const templateWord = spanIdsToTemplate[id];

          const isStart = startEndIndexOfHighlighted.startIdx === idx;
          const isEnd = startEndIndexOfHighlighted.endIdx === idx;
          const isHighlight =
            startEndIndexOfHighlighted.startIdx <= idx &&
            startEndIndexOfHighlighted.endIdx >= idx;
          return (
            <React.Fragment key={`templateTranscriptWords-${idx}`}>
              {idx === 0 && (
                <TemplateWord
                  key={`TemplateWords-${idx}-start`}
                  word=" "
                  id={id}
                />
              )}
              {templateWord && templateWord.type === "subId" ? (
                <VariableWords
                  substitution={substitutions[templateWord.subId]}
                  key={`variableWords-${idx}`}
                />
              ) : (
                <TemplateWord
                  key={`TemplateWords-${idx}`}
                  {...templateWord}
                  vars={substitutions}
                  id={id}
                  isStart={isStart}
                  isEnd={isEnd}
                  isHighlight={isHighlight}
                />
              )}

              {idx === spanIds.length - 1 && (
                <TemplateWord
                  key={`TemplateWords-${idx}-end`}
                  d
                  word=" "
                  id={id}
                />
              )}
            </React.Fragment>
          );
        })}
        <SubstitutionModal
          position={subModalPosition}
          open={isSubModalOpen}
          onClose={handleOnModelClose}
          sub={selectionWords}
          startEndIndexOfSub={startEndIndexOfHighlighted}
        />
      </div>
    </GVSProvider>
  );
};

export default TemplateTranscript;