import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';
import './Toast.scss';

class Toast extends PureComponent {
    componentDidMount() {
        this.timer = setTimeout(() => {
            this.props.close();
        }, this.props.duration * 1000 || 1500);
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
    render() {
        const { message, position, visible } = this.props;
        const classname = classnames('toast', { 'placetop': position === 'top' }, { 'placebottom': position === 'bottom' }, { 'placemiddle': position === 'middle' })
        return (
            <CSSTransition in={visible} timeout={200} classNames="toast-animation">
                <div className={classname}>
                    <span className="message">{message}</span>
                </div>
            </CSSTransition>
        )
    }
};

Toast.defaultProps = {
    position: 'middle',
    duration: 1.5,
}
Toast.propTypes = {
    message: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    position: PropTypes.string,
    duration: PropTypes.number,
}

export default Toast;