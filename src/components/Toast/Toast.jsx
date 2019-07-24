import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group'
import classNames from 'classnames';
import './Toast.scss';

class Toast extends PureComponent {
    componentDidUpdate() {
        console.log(this.props.duration * 1000)
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.props.closeToast();
        }, this.props.duration * 1000);
    } 
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
    render() {
        const { message, position, alertVisible } = this.props;
        const classname = classNames('toast', { 'placetop': position === 'top' }, { 'placebottom': position === 'bottom' }, { 'placemiddle': position === 'middle' })
        return (
            <CSSTransition in={alertVisible} timeout={200} classNames="toast-animation">
                {alertVisible ?
                    <div className={classname}>
                        <span className="message">{message}</span>
                    </div> : <i></i>}
            </CSSTransition>
        )
    }
};

Toast.defaultProps = {
    alertVisible: false,
    position: 'middle',
    duration: 1,
}
Toast.propTypes = {
    message: PropTypes.string.isRequired,
    alertVisible: PropTypes.bool,
    position: PropTypes.string,
    duration: PropTypes.number,
    closeToast: PropTypes.func.isRequired,
}

export default Toast;