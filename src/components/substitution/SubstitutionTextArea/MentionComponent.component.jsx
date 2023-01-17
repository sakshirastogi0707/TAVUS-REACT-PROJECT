import React, { useEffect } from "react";
import { colors } from "../config/variableColors";
import { useGVS } from "../context/GVS.context";

const MentionComponent = ({ mention, className,  children, ...rest }) => {
  const { removeVariable } = useGVS()

  const removeVariableWhenIsDeleted = async () => {
    await removeVariable(mention.name,mention.gvsId)
  }

  useEffect(()=>{
    return () => {
      if(mention.gvsId){
        removeVariableWhenIsDeleted()
      }
    }
  },[])
  
  return (
    <span
      className={className}
      data-testid="mentionText"
      style={{
        color: colors[mention.colorIdx].font,
        background: colors[mention.colorIdx].background,
        borderRadius: "8px",
        fontSize: "20px",
        padding: "2px 8px",
      }}
    > 
      @{mention.name}
      <span style={{display: "none"}}>{children}</span>
    </span>
  );
};
export default MentionComponent;