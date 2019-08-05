import React, {useState} from 'react';
// import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';
import './Popup.scss';

export default function Popup({
    modal = true,
    visible,
    position = 'bottom',
    onClose,
    children,
}) {
    const popupClass = classnames("popup", position, {
        'popup-slide-bottom-enter': !visible,
    })
    const popupWrapperClass = classnames('popup-wrapper', {
        'visible': visible,
    })
    return (
        <div className={popupWrapperClass}>
            <div className={popupClass}>
                {children}
            </div>
            {modal && <div className="popup-modal" onClick={onClose}></div>}
        </div>
    )
}