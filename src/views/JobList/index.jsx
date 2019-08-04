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
            dataSource: []
        };
    }
    componentDidMount() {
        this.fetchData()
    }
    fetchData = (params = {}) => {
        getJobList({
            title: params.title || '',
        }).then(response => {
            console.log(response)
            this.setState((state) => {
                return {
                    dataSource: response.data
                    // dataSource: state.dataSource.concat(response.data)
                }
            })
        })
    }
    handleInput = (title) => {
        this.fetchData({title});
    }
    handleCancel = () => {
        this.fetchData()
    }
    _loadMore = (params) => {
        getJobList({
            title: params.title || '',
        }).then(response => {
            console.log(response)
            this.setState((state) => {
                return {
                    dataSource: state.dataSource.concat(response.data)
                }
            })
        })
    }
    render() {
        const { dataSource } = this.state;
        return (
            <div className="job-list-wrapper">
                <div className="input">
                    <BaseInput onInput={this.handleInput} oneCancel={this.handleCancel}></BaseInput>
                </div>
                {dataSource.map((item) =>
                    (<JobItem data={item} key={item.id} />)
                )}

            </div>
        )
    }
}

export default withRouter(JobList);