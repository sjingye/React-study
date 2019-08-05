import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { getJobList } from 'api/index.js';
import BaseInput from 'components/BaseInput/BaseInput.jsx';
import Popup from 'components/Popup/Popup.jsx';
import JobItem from './JobItem.js';
import './index.scss';

class JobList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            pick1Index: 0,
            inputValue: '',
            popup1Visible: false,
        };
    }
    componentDidMount() {
        this.fetchData()
    }
    fetchData = (params = {}) => {
        getJobList({
            title: this.state.inputValue,
        }).then(response => {
            console.log(response)
            this.setState((state) => {
                return {
                    dataSource: response.data
                }
            })
        })
    }
    handleInput = (title) => {
        this.setState({
            inputValue: title
        }, () => {
            this.fetchData();
        })
    }
    handleCancel = () => {
        this.setState({
            inputValue: ''
        }, () => {
            this.fetchData()
        })
    }
    loadMore = () => {
        getJobList({
            title: this.state.inputValue,
        }).then(response => {
            console.log(response)
            this.setState((state) => {
                return {
                    dataSource: state.dataSource.concat(response.data)
                }
            })
        })
    }
    tabPopup = () => {
        this.setState({
            popup1Visible: true,
        })
    }
    handlePopupClose = () => {
        this.setState({
            popup1Visible: false,
        })
    }
    render() {
        const { dataSource, pick1Index, popup1Visible } = this.state;
        const arrowClass = classnames({
            'icon-arrow-up': this.state.popup1Visible,
        }, 'icon icon-arrow-down')
        return (
            <div className="job-list-wrapper">
                <div className="input">
                    <BaseInput onInput={this.handleInput} oneCancel={this.handleCancel} />
                </div>
                <ul className="select-content">
                    <li onClick={this.tabPopup}>
                        {pick1Index === 0 ? '最新' : '人数'}
                        <i className={arrowClass} />
                    </li>
                </ul >
                {dataSource.map((item) =>
                    (<JobItem data={item} key={item.id} />))
                }
                <button onClick={this.loadMore} className="get-more-button">获取更多数据</button>
                <Popup visible={popup1Visible} position="bottom" onClose={this.handlePopupClose}>
                    <ul className="select-content">
                        <li>
                            '最新'
                        </li>
                        <li>
                            '人数'
                        </li>
                    </ul >
                </Popup>
            </div >
        )
    }
}

export default withRouter(JobList);