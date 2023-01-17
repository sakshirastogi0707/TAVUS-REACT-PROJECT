import { TextareaAutosize, TextField } from '@material-ui/core';
import React, {Component} from 'react';
import {ButtonGray} from "../../$widgets/buttons/button-gray";
import './AvatarVideo.scss';

function AvatarVideoType2() {
    return <div className="avatarvideotype2-main">
                <h2>Let's write your script</h2>
                <div className="row">
                    <div className="col-sm-8">
                        <div>
                            <label>Name</label>
                            <TextField  />
                        </div>
                        <div>
                            <label>What is your video script going to be?</label>
                            <TextareaAutosize />
                        </div>

                        <ButtonGray>Save and Continue</ButtonGray>
                    </div>
                    <div className="col-sm-4">
                        <div>
                            <h6>Tips and Tricks</h6>
                            <ul>
                                <li><p>Fill in examples where you would like your variables...</p></li>
                                <li><p>See our guide for best practices </p></li>
                            </ul>
                        </div>
                    </div>
                </div>
                
            </div>
       
}


export default (AvatarVideoType2);