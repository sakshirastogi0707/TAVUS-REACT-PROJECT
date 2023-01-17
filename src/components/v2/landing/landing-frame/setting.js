import React, {useEffect, useState, useCallback} from 'react';
import _ from 'lodash';
import Layout from '../components/layout/layout'
import PikColor from '../components/color-picker/pik-color'
import {useSelector} from "react-redux";
import SelectButtons from '../components/button/buttons'
import SelectLogo from '../components/logo/logo'
import SelectText from '../components/text/text'
import './setting.scss';

const ariaLabel = {'aria-label': 'description'};


function Setting(props) {
    const selectedNavItemId = useSelector(s => s.landingState.selectedNavItemId)
    return (
            <div className={'side-nav '}>
                    {selectedNavItemId == 'layout' &&
                        <div className="">
                            <Layout />
                        </div>
                    }
                    {selectedNavItemId == 'colors' &&
                        <div className="">
                            <PikColor userDetail={props.userDetail} />
                        </div>
                    }
                    {selectedNavItemId == 'logo' &&
                        <div className="">
                            <SelectLogo campaignId={props.campaignId} userDetail={props.userDetail} />
                        </div>
                    }
                    {selectedNavItemId == 'text' &&
                        <div className="">
                            <SelectText campaignId={props.campaignId} userDetail={props.userDetail} />
                        </div>
                    }
                    {selectedNavItemId == 'buttons' &&
                        <div className="">
                            <SelectButtons campaignId={props.campaignId} userDetail={props.userDetail} />
                        </div>
                    }
        </div>
    );
}

export default Setting
