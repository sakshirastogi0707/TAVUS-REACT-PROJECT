import React from "react";
import './edit-campaign.scss';
import {AppImage} from "../../../$widgets/images/app-image";
import IconLabelButtons from '../../../$widgets/buttons/icon-label-buttons'
import {useHistory} from "react-router-dom";

export default function EditCampaigns(props) {
    const campaignId = props.match.params.id;
    const history = useHistory()

    const handleBack = () => {
        history.push(`/campaigns/${campaignId}`);
    }

    return (
        <div className="edit-campaigns-main">
            <div className="frame-box d-flex flex-column justify-content-center align-items-center">
                <div className="compaigns-box">
                    <div className="backButton" onClick={handleBack}><AppImage name={"Back.svg"}/></div>
                    <h3>Edit campaign:<span> Campaign A</span></h3>
                    <div className="Devsec">
                        <div className="buttonDev d-flex justify-content-between">
                            <div className="editButton">
                                <h3><AppImage name={"pencil3.svg"}/> <span> Configure integrations</span></h3>
                            </div>
                            <div className="align-self"><AppImage name={"arrow-left-1.svg"}/></div>
                        </div>
                        <div className="buttonDev d-flex justify-content-between">
                            <div className="editButton">
                                <h3><AppImage name={"pencil3.svg"}/> <span>Set up white label domain</span></h3>
                            </div>
                            <div className="align-self"><AppImage name={"arrow-left-1.svg"}/></div>
                        </div>
                    </div>
                    <div className="ArchiveBtn">
                        <IconLabelButtons title="Archive campaign"/>
                    </div>
                </div>
            </div>

        </div>
    );
}
