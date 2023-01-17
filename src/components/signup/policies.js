import React from "react";
import Button from '@mui/material/Button';
import CustomCheckbox from '../$widgets/checkbox/custom-checkbox';

const Policies = (props) => {
   

    return (
        <div className="signup-policies">
            <div className="policies-box">
                <div className="row d-flex justify-content-center">
                        <div className="col-7">
                            <h3 className="text-center pb-2">Almost there</h3>
                            <p className="text-center">Please review and accept the legal stuff so we can finish signing you up.</p>
                            <div className="checkBox">
                                <div className="d-flex pt-2 pb-2"><CustomCheckbox name='marketing_communication'  /><span> Allow tavus to send you personalized promotions and tips to use the tavus platfom?</span></div>
                                <div className="d-flex pt-2 pb-2"><CustomCheckbox name='terms'   /><span> I agree to the &nbsp; <a href=""> Terms of Service </a> &nbsp; and &nbsp;<a href=""> Privacy Policy</a></span> </div>
                            </div>
                            <div className="text-center"><Button >Let me in</Button></div>
                            
                        </div>
                </div>
            </div>
        </div>
    );
}

export default Policies;