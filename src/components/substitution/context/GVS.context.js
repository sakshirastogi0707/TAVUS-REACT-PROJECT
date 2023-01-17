import React, { createContext, useContext, useEffect, useState } from "react";
import { CampaignService } from "../../../service/api/campaign.service";
import { UserService } from '../../../service/api/user-service';
import Utils from "../../../service/core/utils";
import { colors } from "../../substitution/config/variableColors";
import { useParams } from "react-router-dom";

function hashCode(str) {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    let chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

export const getColorIndex = (variableName) => {
  return hashCode(variableName) % colors.length;
};


const covertVariableFormat = (variables) => {
  const convertedVars = {}
  Object.keys(variables).forEach((variableKey) => {
    const colorIdx =  getColorIndex(variableKey);
    convertedVars[variableKey] = {
      instances: convertedVars[variableKey],
      colorIdx
    }
   });
   return convertedVars
}

const GVSContext = createContext();

const GVSProvider = ({ children }) => {
  const [vars, setVars] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    (async () => {
      getGVS()
    })();
  }, []);
 

  const reloadVars = async () => {
    const baseVars = await CampaignService.getVariablesWithIds(params?.campaignId);
    if (baseVars) {
      const newVars = covertVariableFormat(baseVars)
      setVars(newVars);
    }
  }

  const getGVS = async () => {
    setIsLoading(true);
    const baseVars = await CampaignService.getVariablesWithIds(params?.campaignId);
    if (baseVars) {
      const newVars = covertVariableFormat(baseVars)
      setVars(newVars);
    }
    setIsLoading(false);
  };

  const addVariable = async (variableName) => {
    setIsLoading(true);
    const variableInstanceId = Utils.generateInstanceId();
    const newVariable = {
      variableName,
      variableInstanceId,
    };

    const newSetOfVariables = await CampaignService.addVariableReturnIds(params?.campaignId, newVariable);
    if(newSetOfVariables){
      const newVars = covertVariableFormat(newSetOfVariables)
      setVars(newVars);
    }
    setIsLoading(false);
    return newVariable
  }

  const removeVariable = async (variableName, variableInstanceId) => {
    const removeVariableBody = {
      variableName,
      variableInstanceId
    }
    const newSetOfVariables = await CampaignService.removeVariableWithIds(params?.campaignId, removeVariableBody);
    if(newSetOfVariables){
      const newVars = covertVariableFormat(newSetOfVariables)
      setVars(newVars);
    }
  }

  return (
    <GVSContext.Provider value={{ getGVS, vars, isLoading, addVariable, reloadVars, removeVariable }}>
      {children}
    </GVSContext.Provider>
  );
};

const useGVS = () => {
  const context = useContext(GVSContext);
  if (context === undefined) {
    throw new Error("useGVS must be in GVSProvider");
  }
  return context;
};

export { GVSProvider, useGVS };
