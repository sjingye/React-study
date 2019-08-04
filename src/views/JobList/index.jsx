import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getJobList } from 'api/index.js';
import BaseInput from 'components/BaseInput/BaseInput.jsx';
import JobItem from './JobItem.js';
import './index.scss';

class JobList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            pick1Index: 0,
            inputValue: ''
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
    loadMore = (params) => {
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

    }
    render() {
        const { dataSource, pick1Index } = this.state;
        return (
            <div className="job-list-wrapper">
                <div className="input">
                    <BaseInput onInput={this.handleInput} oneCancel={this.handleCancel}></BaseInput>
                </div>
                <ul className="select-content">
                    <li onClick={this.tabPopup}>
                        {pick1Index === 0 ? '最新' : '人数'}
                        <i className="[popup1Visible ? 'icon-arrow-up' : '', 'icon icon-arrow-down']"></i>
                    </li>
                </ul >
                {dataSource.map((item) =>
                    (<JobItem data={item} key={item.id} />))
                }
                <button onClick={this.loadMore} className="get-more-button">获取更多数据</button>
            </div >
        )
    }
}

export default withRouter(JobList);