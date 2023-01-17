import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import React from "react";
import './AppDialogCenter.scss';
import withStyles from "@material-ui/core/styles/withStyles";
import { ButtonIcon } from "../buttons";
import { AppImage } from '../images/app-image';
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
        id={'app-dialog-center'}
        className={clsx(classes.modal, className)} onBackdropClick="false">
        <DialogContent className={customClassMain?" modal-content " + customClassMain : "modal-content"}>
            <div className="model_title ">
                <ButtonIcon className='close-icon'
                    onClick={onClose}>
                    <AppImage name={'close-circle.svg'}  width={'27'} />
                </ButtonIcon>
            </div>
            <div className={customClass?" main-model  " + customClass : "main-model"}>
                {content}
            </div>
        </DialogContent>
    </DialogWithStyles>
};
