import React, {useEffect, useState, useCallback} from 'react';
import {Grid} from "@material-ui/core";
import {useSelector} from "react-redux";
import { InlineWidget } from "react-calendly";
import ReactPlayer from 'react-player'
import { HTTP } from "../../../../../../../service/core/http.service";
import { urls } from "../../../../../../../config/urlConfig";
import Template4 from "../template4/template4";
import Template3 from "../template3/template3";
import Template2 from "../template2/template2";
import Template1 from "../template1/template1";
import Loader from "../../../../../../$widgets/loader/loader"



const View = (props) => {

    const [requestData, setRequestData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
       getRequestDetail()
    }, [])

    const getRequestDetail = () => {
        setIsLoading(true)
        HTTP.get(`${urls.variablePreview}${props.match.params.id}` ).then((result) => {
            if (result.status == 200) {
                setRequestData(result.data.data)
                setIsLoading(false)
            }
        }).catch((err) => {
            setIsLoading(false)
        })
    }


    return (
        <>
        {isLoading ? <Loader /> : 
            <>
                {requestData && requestData?.campaign && requestData?.campaign?.landing_json?.template_id == 1 &&
                    <Template1 requestData={requestData}/>
                }

                {requestData && requestData?.campaign && requestData?.campaign?.landing_json?.template_id == 2 &&
                    <Template2 requestData={requestData}/>
                }

                {requestData && requestData?.campaign && requestData?.campaign?.landing_json?.template_id == 3 &&
                    <Template3 requestData={requestData}/>
                }
                {requestData && requestData?.campaign && requestData?.campaign?.landing_json?.template_id == 4 &&
                    <Template4 requestData={requestData}/>
                }
            </>
        }
            
        </>
       
    );
}

export default View;
