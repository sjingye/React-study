import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { Picker } from 'antd-mobile';
import { district } from 'antd-mobile-demo-data';
import { createForm } from 'rc-form';
import classnames from 'classnames';
import { getJobList } from 'api/index.js';
import BaseInput from 'components/BaseInput/BaseInput.jsx';
import JobItem from './JobItem.js';
import './index.scss';

let timeSort = 0
let numberSort = 0

const provinceLite = require('../../mock/JobListData.js').provinceLite;
const provinceList = Object.keys(provinceLite).map(item => {
    return {
        label: item,
        value: item,
    }
})

class JobList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            pick1Index: 0,
            inputValue: '',
            popupVisible: false,
            pickValue: 0,
        };
    }
    componentDidMount() {
        this.fetchData({ time: 0 })
    }
    fetchData = (params) => {
        getJobList({
            title: this.state.inputValue,
            ...params,
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
            this.setState((state) => {
                return {
                    dataSource: state.dataSource.concat(response.data)
                }
            })
        })
    }
    tabSort = (e, type) => {
        if (type === 0) {
            timeSort = timeSort === 0 ? 1 : 0
            this.fetchData({
                time: timeSort
            })
        } else if (type === 1) {
            numberSort = numberSort === 0 ? 1 : 0
            this.fetchData({
                number: numberSort
            })
        } else {
            this.setState({
                popupVisible: true,
            })
        }
    }
    handlePickSave = (array) => {
        this.fetchData({
            province: array[0]
        })
        this.setState({
            popupVisible: false,
        })
    }
    handlePickDismiss = () => {
        this.setState({
            popupVisible: false,
        })
    }
    render() {
        const { dataSource } = this.state;
        const arrowClass1 = classnames({
            'icon-arrow-up': timeSort === 1,
        }, 'icon icon-arrow-down')
        const arrowClass2 = classnames({
            'icon-arrow-up': numberSort === 1,
        }, 'icon icon-arrow-down')
        return (
            <div className="job-list-wrapper">
                <div className="input">
                    <BaseInput onInput={this.handleInput} oneCancel={this.handleCancel} />
                </div>
                <ul className="select-content">
                    <li onClick={e => { this.tabSort(e, 0) }}>
                        最新
                        <i className={arrowClass1} />
                    </li>
                    <li onClick={e => { this.tabSort(e, 1) }}>
                        人数
                        <i className={arrowClass2} />
                    </li>
                    <li onClick={e => { this.tabSort(e, 2) }}>
                        省
                    </li>
                </ul >
                {dataSource.map((item) =>
                    (<JobItem data={item} key={item.id} />))
                }
                <button onClick={this.loadMore} className="get-more-button">获取更多数据</button>
                <Picker
                    data={provinceList}
                    cols={1}
                    value={this.state.pickValue}
                    onChange={v => this.setState({ pickValue: v })}
                    onOk={this.handlePickSave}
                    onDismiss={this.handlePickDismiss}
                    visible={this.state.popupVisible}
                >
                </Picker>
            </div >
        )
    }
}

export default withRouter(createForm()(JobList));