import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Picker, PullToRefresh } from 'antd-mobile';
import { createForm } from 'rc-form';
import classnames from 'classnames';
import { getJobList } from 'api/index.js';
import { increaseCount, decreaseCount } from '../../actions/count.js'
import BaseInput from 'components/BaseInput/BaseInput.jsx';
import JobItem from './JobItem.js';
import './index.scss';

let timeSort = undefined
let numberSort = undefined

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
            refreshing: false,
        };
    }
    componentDidMount() {
        this.fetchData({ time: 0 })
    }
    fetchData = () => {
        getJobList().then(response => {
            this.setState(() => {
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
            timeSort = 0
            this.filterData();
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
        this.props.increase(2);
        console.log(this.props._count)
        getJobList().then(response => {
            this.props.decrease(1);
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
            this.filterData()
        } else if (type === 1) {
            timeSort = undefined
            numberSort = numberSort === 0 ? 1 : 0
            this.filterData()
        } else {
            this.setState({
                popupVisible: true,
            })
        }
    }
    filterData = (province = '') => {
        let res = [];
        if (timeSort === 0) {
            res = [...this.state.dataSource].sort((a, b) => {
                return new Date(b.createdTime) - new Date(a.createdTime)
            })
        } else if (timeSort === 1) {
            res = [...this.state.dataSource].sort((a, b) => {
                return new Date(a.createdTime) - new Date(b.createdTime)
            })
        } else if (timeSort === undefined && numberSort === 0) {
            res = [...this.state.dataSource].sort((a, b) => {
                return b.number - a.number
            })
        } else if (timeSort === undefined && numberSort === 1) {
            res = [...this.state.dataSource].sort((a, b) => {
                return a.number - b.number
            })
        }
        let list = res.filter(item => {
            if (!this.state.inputValue) {
                return true
            } else {
                return item.jobTitle.includes(this.state.inputValue)
            }
        })
        if (province) {
            list = [...list].filter(item => {
                if (!province) {
                    return true
                } else {
                    return item.city.includes(province)
                }
            })
        }
        this.setState({
            dataSource: list
        })
    }
    handlePickSave = (array) => {
        timeSort = 0
        this.filterData(array[0])
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
                {/* <PullToRefresh
                    direction="up"
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.setState({ refreshing: true });
                        console.log('刷新')
                        setTimeout(() => {
                            this.setState({ refreshing: false });
                        }, 1000);
                    }}
                >
                </PullToRefresh> */}
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

JobList = createForm()(JobList)

const WrappedList = connect((state) => {
    return {
        _count: state.count
    }
}, (dispatch) => {
    return {
        increase: (props) => {
            dispatch(increaseCount(props))
        },
        decrease: (props) => {
            dispatch(decreaseCount(props))
        }
    }
})(JobList)
export default withRouter(WrappedList);