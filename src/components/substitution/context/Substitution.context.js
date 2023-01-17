import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getTemplate,
  deleteVar,
  getVars,
  postNewVars,
  revertTemplate,
  submitTemplate,
  getAllSubVariableNames
} from "../../../service/api/substitution.service";
import {
  StorageService,
  StorageKeys,
} from "../../../service/core/storage.service";

export const SubstitutionContext = createContext();

const SubstitutionProvider = ({ children,campaignId }) => {
  const [substitutions, setSubstitutions] = useState({});
  const [substitutionsJSON, setSubstitutionsJSON] = useState({});
  const [template, setTemplate] = useState([]);
  const [isSubsLoading, setIsSubsLoading] = useState(false);

  useEffect(() => {
    (async () => {
        setIsSubsLoading(true);
        getSubstitutionsAndTemplate();
        setIsSubsLoading(false);
    })();
  }, []);

  const updateTemplateAndSubstitutions = (template, substitutions, substitutionJson) => {
    setTemplate(template);
    setSubstitutions(substitutions);
    setSubstitutionsJSON(substitutionJson)
  };

  const deleteSubstitutionInstance = async (subId) => {
    const { templated_transcript: template, substitution_json} =
      await deleteVar(campaignId, subId);
      const {substitutions} = substitution_json
    updateTemplateAndSubstitutions(template, substitutions, substitution_json);
  };

  const getSubstitutionsAndTemplate = async () => {
    const template = await getTemplate(campaignId);
    const substitutionsJSON = await getVars(campaignId);
    const {substitutions} = substitutionsJSON
    updateTemplateAndSubstitutions(template, substitutions, substitutionsJSON);
    setIsSubsLoading(false);
  };
  const addNewSubstitutionInstance = async (vars, start, end) => {
    const body = {
      vars,
      start,
      end,
    };
    const { templated_transcript: template, substitution_json}  = await postNewVars(campaignId, body);
    const {substitutions} = substitution_json
    updateTemplateAndSubstitutions(template, substitutions, substitution_json);
  };

  const revertTemplateToOriginal = async () => {
    const { templated_transcript } = await revertTemplate(campaignId);
    updateTemplateAndSubstitutions(templated_transcript, {}, {});
  };

  const submitATemplate = async ({isAdmin,isEdit}) => {
    const  {substitution_json, templated_transcript: template} = await submitTemplate(campaignId, isEdit);
    const {substitutions} = substitution_json;
    if(isAdmin) {updateTemplateAndSubstitutions(template, substitutions, substitution_json)}
  };

  const getAllVariableNames = async () => {
    const variableNamesArray = await getAllSubVariableNames(campaignId);
    return variableNamesArray
  };

  return (
    <SubstitutionContext.Provider
      value={{
        template,
        substitutions,
        substitutionsJSON,
        isSubsLoading,
        getSubstitutionsAndTemplate,
        deleteSubstitutionInstance,
        addNewSubstitutionInstance,
        revertTemplateToOriginal,
        submitATemplate,
        getAllVariableNames
      }}
    >
      {children}
    </SubstitutionContext.Provider>
  );
};

const useSubstitutions = () => {
  const context = useContext(SubstitutionContext);
  if (context === undefined) {
    throw new Error("usSubstitutions must be in SubstitutionsProvider");
  }
  return context;
};

export { SubstitutionProvider, useSubstitutions };
