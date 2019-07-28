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
    fetchData = () => {
        getJobList().then(response => {
            console.log(response)
            this.setState((state) => {
                return {
                    dataSource: state.dataSource.concat(response.data)
                }
            })
        })
    }
    handleInput = (value) => {
        console.log(value)
        this.setState((state) => {
            return {
                dataSource: [...state.dataSource].filter(item => {
                    console.log(item)
                    console.log(value)
                    return item.jobTitle === value
                })
            }
        })
    }
    handleCancel = () => {

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