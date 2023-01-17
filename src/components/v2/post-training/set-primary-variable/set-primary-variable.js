import React, {useEffect, useState} from "react";
import HeaderLanding from "../../../app-frame/app-header-landing/app-header-landing";
import AppFooter from "../../../app-frame/app-footer/app-footer";
import IconLabelButtons from "../../../$widgets/buttons/icon-label-buttons";
import "./set-primary-variable.scss";
import {CampaignService} from "../../../../service/api/campaign.service";
import {AppImage} from "../../../$widgets/images/app-image";
import TextArea from "../../../$widgets/input-fields/text-area";
import {
    StorageService,
    StorageKeys,
} from "../../../../service/core/storage.service";
import {UserService} from '../../../../service/api/user-service';
import TaggedInput from "../../landing/components/input-with-tags/input-with-tags";
import Action from "../../../../redux/action";
import {connect, useDispatch, useSelector} from 'react-redux'
import Utils from "../../../../service/core/utils";
import { useParams, useHistory } from "react-router-dom";

const SetPrimaryVariable = (props) => {
    const [variables, setVaiables] = useState([]);
    const [newVariable, setNewVariable] = useState();
    const [primaryVariable, setPrimary] = useState(null);
    const [userDetail, setUser] = useState({})
    const [isLoading, setLoading] = useState(false)
    const [addingVariable, setAddingVariable] = useState(false)
    const [campaignId, setCampaignId] = useState(null)
    const dispatch = useDispatch()

    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        (async () => {
        if(params?.campaignId){
            setCampaignId(params?.campaignId)
            getVariablesData(params?.campaignId);
        }
        let isValid  = await CampaignService.validateUserCampaignAccess(params?.campaignId)
        let user = await UserService.getUserProfile()
        if(!isValid){
            if(user?.campaign_count>1){
                history.push(`/campaigns-list`)
            } else {
                history.push(`/dashboard`)
            }
        }
        setUser(user)
        })();
      }, []) 

    const submit = async () => {
        try {
            setLoading(true)
            await saveNewVariableInstance()
            if (userDetail.steps) {
                let steps = userDetail.steps
                steps.set_variable = true
                const result = await UserService.userSteps(steps)
                setLoading(false)
                history.push(`/first-video/${campaignId}`)
                return result
            }
        } catch (e) {
            setLoading(false)
            console.log('campaign not saved', e)
            return false
        }
    }

    const getVariablesData = async (id) => {
        const variables = await CampaignService.getVariables(id);
        if (variables) {
            try {
                setVaiables(variables);
            } catch (err) {
                console.log(err);
            }
        }
    };
    

    const setIdentifier = async (variable) => {
        let data = {
            "metadata": {"primaryIdentifier": variable}
        }
        const result = await CampaignService.setPrimaryVariable(campaignId, data);
        if (result) {
            try {
                setPrimary(variable);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleChange2 = (e) => {
        setNewVariable(e.target.value)
    }

    const saveNewVariableInstance = async () => {
        if (!newVariable) return

        const params = {
            "variableName": newVariable.replace(/@/g, '').trim(),
            "variableInstanceId": Utils.generateInstanceId()
        }
        setAddingVariable(true)
        const variables = await CampaignService.addVariable(campaignId, params)
        setVaiables(variables)
        setAddingVariable(false)
        setNewVariable('')
    }

    const handleKeyUp = (e) => {
        e.persist()
        console.log('e', e)
        if (e.keyCode === 13) {
            saveNewVariableInstance()
        }
    }

    return (
        <div className={"post-training-main"}>
            <div className={"container"}>
                <div className={"align-self-center w-100"}>
                    <HeaderLanding userData={userDetail}/>

                    <div className="frame-box d-flex flex-column justify-content-center align-items-center">
                        <div className="script-box">
                            <div className="text-center">
                                <h2>Set Primary Variable</h2>
                                <p>
                                    Please select a primary variable that will be used to identify videos.
                                </p>
                            </div>
                            <div className="variable-box-main">
                                <div className="variableDevBox">
                                    {variables.map((variable) => {
                                        return (
                                            <div className="variableDev d-flex justify-content-between">
                                                <div className="variable-box"
                                                     style={{backgroundColor: "rgba(24, 242, 164, 0.1)"}}
                                                >
                                                    <span style={{color: variable.color}}>@{variable.name}</span>
                                                </div>
                                                <div onClick={() => setIdentifier(variable.name)}
                                                     className={primaryVariable == variable.name ? "set-identifier align-self color-blu" : "set-identifier align-self"}>
                                                    {primaryVariable == variable.name
                                                        ? <span>Selected</span>
                                                        : <span>Set as identifier</span>}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div className='variableInput d-flex justify-content-between'>
                                        <div className='variable-box'>
                                            <input type='text' placeholder="Name"
                                                   disabled={addingVariable}
                                                   onChange={handleChange2}
                                                   onKeyUp={handleKeyUp}
                                                   name='new-var'
                                                   value={newVariable}
                                            />

                                            {addingVariable ? <i className="fa fa-spinner fa-spin text-white ml-4" /> : null}

                                        </div>
                                        <div className='closebtn align-self'>
                                            <AppImage name={'close-icon.svg'} width="14" onClick={() => setNewVariable('')}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="variableBtn">
                                    <IconLabelButtons onClick={() => saveNewVariableInstance()} title="Add identifier"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <AppFooter
                        userData={userDetail}
                        onClick={() => submit()}
                        isLoading={isLoading}
                        onBack={() => history.push(`/training-complete/${campaignId}`)}
                        isBack={true}
                        title={'Continue'}
                        invite={true}
                        step={'set-variable'}
                    />
                </div>
            </div>
        </div>
    );
};

export default SetPrimaryVariable;
