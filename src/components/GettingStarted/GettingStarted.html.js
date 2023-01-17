import { Link } from "@material-ui/core";
import React from "react";
import {ButtonGray} from "../$widgets/buttons/button-gray";

export function html() {
    const {} = this.state;
    const {} = this.props;
    return (
        <div className={'gettingstarted-main'}>
           <h2>Intro Heading</h2>
           <h6>Introduction Content Title</h6>
           <div className="row">
                <div className="col-md-8">
                    <div className="box-cnt">

                    </div>
                    <ButtonGray>Continue</ButtonGray>
                </div>
                <div className="col-md-4">
                    <p>Estimated Time: <span>5 minutes</span></p>
                    <p>Due Date: <span>Sunday, August 5th</span></p>
                    <div className="">
                        <h6>What to have ready?</h6>
                        <ul>
                            <li>
                                <p>Requirement 1</p>
                                <p>Requirement 2</p>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h6>Need help?</h6>
                        <p>Contact Us: Call us at <Link>+4534435345</Link></p>
                    </div>
                </div>
           </div>
        </div>
    );
}