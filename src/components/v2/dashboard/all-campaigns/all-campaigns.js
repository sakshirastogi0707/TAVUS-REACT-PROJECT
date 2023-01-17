import React, {useState, useEffect} from "react";
import './all-campaigns.scss';
import CampaignsCards from "./campaigns/campaigns";
import {AppImage} from "../../../$widgets/images/app-image";
import {CampaignService} from "../../../../service/api/campaign.service";

export default function AllCampaigns() {
    const [campaigns, setCampaigns] = useState(null)

    const callApiToGetCampaigns = async () => {
        const campaigns = await CampaignService.getCampaignsV2('app-campaigns')
        setCampaigns(campaigns)
    }

    useEffect(() => {
        callApiToGetCampaigns()
    }, [])
    return (
        <div className="campaigns-main">
            <h2>All Campaigns</h2>
            <div className="compaigns-box d-flex justify-content-between">
                { campaigns &&
                    <CampaignsCards campaigns={campaigns}/>
                }
            </div>

        </div>
    );
}
