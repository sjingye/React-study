import React from 'react';
import PropTypes from 'prop-types';
import './BaseInput.scss';
import { debounce } from '../../util/util.js';

class BaseInput extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            inputContent: ''
        };
        this.wrapInput =  debounce(this.wrapInput, 600)
    }
    static propTypes = {
        onInput: PropTypes.func.isRequired,
        oneCancel: PropTypes.func.isRequired,
    }
    wrapInput = (value) => {
        console.log(value)
        this.props.onInput(value)
    }
    handleChange = (event) => {
        event.persist();
        this.setState({
            inputContent: event.target.value,
        })
        this.wrapInput(event.target.value);
    }
    handleCancel = () => {
        this.props.oneCancel();
    }
    render() {
        return (
            <div className="input-wrapper">
                <div className="input-item">
                    <i className="icon icon-search"></i>
                    <input
                        type="text"
                        placeholder="请输入职位名称"
                        onChange={this.handleChange}
                        value={this.state.inputContent}
                    />
                    <i className="icon icon-close"></i>
                </div>
                <p className="icon-cancel" onClick={this.handleCancel}>取消</p>
            </div >
        )
    }
}

export default BaseInput;