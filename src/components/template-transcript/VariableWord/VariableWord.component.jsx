import React, { useRef, useState, useEffect } from "react";
import { colors } from "../../substitution/config/variableColors";
import RevertModal from "./RevertModal.component";
import StaticWord from "./StaticWord.component";
import DynamicWord from "./DynamicWord.component";
import { useGVS } from "../../substitution/context/GVS.context";

export const VariableWords = ({ substitution, noRevertAllowed }) => {

  const {isLoading, getGVS, vars} = useGVS()
  const [open, makeOpen] = useState(false);
  const [positionOfModal, setPositionOfModal] = useState({});
  const ref = useRef();

  useEffect(()=>{
    if(vars === null){
      getGVS()
    }
  }, [vars])

  const onClose = () => {
    makeOpen(false);
  };

  const handleOnClick = () => {
    makeOpen(true);
  };

  useEffect(() => {
    let isMounted = true;

    if (ref && ref.current) {
      if (isMounted) {
        setPositionOfModal(ref.current.getBoundingClientRect());
      }
    }
    return () => {
      isMounted = false;
    }; // cleanup toggles value, if unmounted
  }, [ref.current]);

  if (vars === null || !substitution || Object.keys(substitution).length === 0) return <></>;
  return (
    <>
      <span ref={ref} style={{ cursor: noRevertAllowed ? "auto" : "pointer" }} onClick={handleOnClick}>
        {substitution &&
          substitution.variables &&
          substitution.variables.map((word, idx) => {
            if (word.type === "Static")
              return (
                <StaticWord
                  key={`${word.type}-${word.name}-${idx}`}
                  {...word}
                />
              );
            return (
              <DynamicWord
                key={`${word.type}-${word.name}-${idx}`}
                colorIdx={vars[word.name]?.colorIdx}
                {...word}
              />
            );
          })}
          <StaticWord value={" "} />
      </span>
      {substitution && substitution.subId && substitution.variableWords && !noRevertAllowed && (
        <RevertModal
          subId={substitution.subId}
          position={positionOfModal}
          words={substitution.variableWords}
          open={open}
          onClose={onClose}
        />
      )}
    </>
  );
};
