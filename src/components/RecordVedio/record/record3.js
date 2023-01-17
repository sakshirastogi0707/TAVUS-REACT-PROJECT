import React, {Component} from 'react';
import {ButtonGray} from "../../$widgets/buttons/button-gray";


function Record3() {
    return <div className="avatarvideotype1-main">
                <h2>Let's make it dynamic</h2>
                <p>Highlight the words or phrases you'd like to make dynamic, and assign them to variables on the right
                </p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id.</p>
                <div className="row">
                    <div className="col-sm-8">
                        <div className="">

                        </div>
                        <ButtonGray>Continue</ButtonGray>
                    </div>
                    <div className="col-sm-4">
                        <h6>Insert variable</h6>
                        <p>Note: You will be providing the data for these dynamic variables</p>
                        <Link>Create new </Link>
                    </div>
                </div>
                
            </div>
       
}


export default (Record3);
