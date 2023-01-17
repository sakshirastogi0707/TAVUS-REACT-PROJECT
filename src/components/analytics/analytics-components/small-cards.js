import React from 'react';
import { AppImage } from "../../$widgets/images/app-image";

const smallCards = (props) => {
    const { title, count } = props
    return <div className="card_list bgColor ">
        <div className="d-flex justify-content-between">
            <div className="chart_title">
                <h5 className={'title'}>{title}</h5>
                <h5 className={'total-cont'}>{count}</h5>
            </div>
            {/* <div className="chart_cont align-self">
                <AppImage name={'Chart.png'} width="50" />
            </div> */}
        </div>
    </div>
}

export default smallCards;