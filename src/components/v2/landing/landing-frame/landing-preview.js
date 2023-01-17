import React, {useState} from 'react';
import _ from 'lodash';
import LandingPreview1 from '../components/template-preview/template1/template1'
import LandingPreview2 from '../components/template-preview/template2/template2'
import LandingPreview3 from '../components/template-preview/template3/template3'
import LandingPreview4 from '../components/template-preview/template4/template4'
import TemplateToggle from '../components/template-toggle/template-toggle'
import {useSelector} from "react-redux";
import './landing-preview.scss';

const LandingPreview = (props) => {
   const landingState = useSelector(s => s.landingState)
   const template_id = useSelector(s => s.landingState.template_id)
    
   const getTemplate = (template_id) => {
        switch (template_id) {
        case "1":
            return <LandingPreview1/>
            break;
        case "2":
            return <LandingPreview2/>
            break;
        case "3":
            return <LandingPreview3/>
            break;
        case "4":
            return <LandingPreview4/>
            break;
        default:
            return <LandingPreview1/>
        }
    }

    return (

        <div className={'app-frame'}>
            <div className='d-flex justify-content-center'><TemplateToggle/></div>
            <div className='template-Box'>
               {
                template_id ? getTemplate(template_id) :'No LandingPreview '
               }
            </div>

        </div>
    );
}

export default LandingPreview;
