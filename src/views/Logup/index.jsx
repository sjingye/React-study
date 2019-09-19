import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createForm, formShape } from 'rc-form';
import { Icon, Toast } from 'antd-mobile';
import { userInfo, userToken } from 'actions/auth.js';
import { logup } from 'api/index.js';
import './index.scss';

// rc-form的验证操作不是很方便，不如自己写，此页面省略校验，参照登录页

const phoneReg = /^1\d{10}$/;

const mapStateToProps = state => {
    return {
        userInfo: state.auth.userInfo,
        userToken: state.auth.userToken
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        setUserInfo: (props) => {
            dispatch(userInfo(props))
        },
        setUserToken: (props) => {
            dispatch(userToken(props))
        }
    }
}

@createForm()
@connect(mapStateToProps, mapDispatchToProps)
class Logup extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            t: 60,
            disabled: false,
            val: 0,
        };
        console.log(this.props.history)
        this.timer = null;
    }
    static propTypes = {
        form: formShape,
    };
    componentDidMount() {
        // setState的更新
        this.setState({ val: this.state.val + 1 })
        console.log(this.state.val)
        this.setState({ val: this.state.val + 1 })
        console.log(this.state.val)
        setTimeout(_ => {
            this.setState({ val: this.state.val + 1 })
            console.log(this.state.val);
            this.setState({ val: this.state.val + 1 })
            console.log(this.state.val)
        }, 0)
    }
    // 学习一下dva
    componentBeforeUnmount() {
        this.timer && clearInterval(this.timer);
    }
    getIdentify = () => {
        const phone = this.props.form.getFieldValue('phone');
        if (phoneReg.test(phone)) {
            this.timer = setInterval(() => {
                this.setState((state) => ({
                    t: state.t - 1,
                    disabled: true,
                }));
                if (this.state.t < 1) {
                    this.setState({
                        t: 60,
                        disabled: false,
                    })
                    clearInterval(this.timer);
                }
            }, 1000);

        } else {
            Toast.info('请输入正确格式的手机号');
        }
    }
    handleSubmit = (e) => {
        this.props.form.validateFields((error, values) => {
            if (!error) {
                logup({
                    username: values.username,
                    password: values.password,
                }).then((res) => {
                    sessionStorage.setItem('username', res.username);
                    this.props.setUserInfo(res);
                    this.props.setUserToken(res.username)
                    console.log(this.props.userToken)
                    this.setState({
                        loading: false,
                    })
                    this.props.history.goBack();
                }).catch(err => {
                    this.setState({
                        loading: true,
                    })
                })
            }
        });

    }
    render() {
        const { getFieldProps } = this.props.form;
        const { loading, t, disabled } = this.state;
        return (
            <div className="logup-wrapper">
                <p className="remind">已有账户请点击<Link to={`/login`}>登录</Link></p>
                <ul className="login-content">
                    <li>
                        <label htmlFor="phone" value={undefined}>手机号</label>
                        <input
                            {...getFieldProps('phone', {
                                rules: [
                                ],
                            })}
                            type="phone"
                            placeholder="请输入手机号"
                            name="phone"
                            id="phone"
                            className="rest"
                            value={undefined}
                        />
                    </li>
                    <li>
                        <label>验证码</label>
                        <input
                            {...getFieldProps('identify', {
                                rules: [{ required: true }],
                            })}
                            type="text"
                            placeholder="请输入"
                            id="identify"
                            className="rest"
                            value={undefined}
                        />
                        <button className="get-identify" onClick={this.getIdentify} disabled={disabled}>{t === 60 ? '获取验证码' : `重新获取(${t}s)`}</button>
                    </li>
                    <li>
                        <label value={undefined}>用戶名</label>
                        <input
                            {...getFieldProps('username', {
                                rules: [{ required: true }],
                            })}
                            type="text"
                            placeholder="请输入"
                            className="rest"
                            value={undefined}
                        />
                    </li>
                    <li>
                        <label htmlFor="password">登录密码</label>
                        <input
                            {...getFieldProps('password', {
                                rules: [{ required: true }],
                            })}
                            type="password"
                            placeholder="请输入"
                            name="password"
                            id="password"
                            className="rest"
                            value={undefined}
                        />
                    </li>
                </ul>
                <button className="login-btn" onClick={this.handleSubmit}>
                    {loading ? <Icon type="loading" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> : ''}
                    确定
                </button>
                <p>{this.state.val}</p>
            </div>
        )
    }
}

export default withRouter(Logup);