import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import React from "react";
import './AppDialogInvite.scss';
import withStyles from "@material-ui/core/styles/withStyles";
import { ButtonIcon } from "../../$widgets/buttons";
import { AppImage } from '../../$widgets/images/app-image';
const DialogWithStyles = withStyles({
    paper: {
        borderRadius: 12,
    },


})(Dialog)

export const html = (_this) => {
    const { isDeviceAboveXS } = _this.state;
    const { title,modelTitle,modelSubTitle, content, footer,customClass,customClassMain, classes, onClose, open, maxWidth, className, scroll, footerItemAlign, flag } = _this.props;
    return <DialogWithStyles fullWidth={flag == false ? false : true}
        maxWidth={maxWidth || 'sm'}
        fullScreen={!isDeviceAboveXS}
        disableEnforceFocus
        onClose={onClose}
        open={open}
        id={'app-dialog-invite'}
        className={clsx(classes.modal, className)} onBackdropClick="false">
        <DialogContent className={customClassMain?" modal-content " + customClassMain : "modal-content"}>
            <div className="model_title d-flex justify-content-between">
                {modelTitle&&<div className="title">
                    <h3>{modelTitle}</h3>
                    <h5 >{modelSubTitle}</h5>
                </div>}
                <ButtonIcon className='close-icon'
                    onClick={onClose}>
                    <AppImage name={'cross-icon.svg'}  width={'27'} />
                </ButtonIcon>
            </div>
            <div className={customClass?" main-model  " + customClass : "main-model"}>
                {content}
            </div>
        </DialogContent>
    </DialogWithStyles>
};
