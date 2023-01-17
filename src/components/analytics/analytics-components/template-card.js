import React from 'react';
import { AppImage } from "../../$widgets/images/app-image";
import { Grid, Menu, ClickAwayListener, MenuItem, MenuList, } from "@material-ui/core";
import Utils from "../../../service/core/utils";


const templateCards = (props) => {
    const { name, impressions, views, clicks, image, template_id } = props
    return (
        <div onClick={() => props.selectTemplate(template_id, name)} className="card_create bgColor">
            <div className="d-lg-flex justify-content-lg-between">
                <div className="chart_cont align-self">
                    <AppImage src={image} />
                </div>
                <div className="chart_list ">
                    <div>
                        <h6 className={'tag_line'}>Campaign</h6>
                        <h5 title={name} className={'title'}>{Utils.trimCharacterLength(name,72)}</h5>
                    </div>
                    <div className="d-flex justify-content-between pt-2">
                        <div className="views_list">
                            <h6 className={'tag_line'}>Impressions</h6>
                            <h5 className={'title'}>{Utils.formatNumber(impressions)}</h5>
                        </div>
                        <div className="views_list">
                            <h6 className={'tag_line'}>Views</h6>
                            <h5 className={'title'}>{Utils.formatNumber(views)}</h5>
                        </div>
                        <div className="views_list">
                            <h6 className={'tag_line'}>CTA clicks</h6>
                            <h5 className={'title'}>{Utils.formatNumber(clicks)}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default templateCards;