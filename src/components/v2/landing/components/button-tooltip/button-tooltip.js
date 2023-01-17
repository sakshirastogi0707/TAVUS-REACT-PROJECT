import React, {useEffect, useState, useCallback} from 'react';
import _ from 'lodash';
import {AppImage} from "../../../../$widgets/images/app-image";
import './button-tooltip.scss';

const ariaLabel = {'aria-label': 'description'};


function ButtonTooltip (props) {

    return (
        <div className='button-tooltip'>
            <div className='button-tooltipBox'>
                <div className='tooltipcont d-flex justify-content-between'>
                    <div className='d-flex text'><AppImage name={'bolt.svg'} />
                        <h3 className='title align-self'>Supercharge your copy </h3>
                    </div>
                    
                    <div className='closeBtn'>  <AppImage onClick={()=>props.setShow(false)} name={'cross-icon.svg'} width="27"/></div>
                </div>
                <p>Any text you write can be customized. We call custom text a variable, type @ to create a variable!
                </p>
            </div>
            
        </div>
    );
}

export default ButtonTooltip;
