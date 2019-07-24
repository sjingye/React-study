import React, { PureComponent } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createForm, formShape } from 'rc-form';
import { Toast, Icon } from 'antd-mobile';
// import {  } from 'api/index.js';
import { userInfo } from 'actions/auth.js';
import './index.scss';
import { post } from '../../api';

const phoneReg = /^1\d{10}$/;

const mapStateToProps = state => {
  return {
    userInfo: state.auth.userInfo
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    setUserInfo: (props) => {
      dispatch(userInfo(props))
    }
  }
}

@createForm()
@connect(mapStateToProps, mapDispatchToProps)
class Logup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      codeImg: '',
      codeToken: '',
      isCheckedCode: false,
      t: 0,
    };
    this.timer = null;
  }
  static propTypes = {
    form: formShape,
  };
  componentDidMount() {
    document.title = '登录';
    this.fetchCodeImg();
  }
  fetchCodeImg = () => {
    get(codeimgUrl).then(response => {
      console.log(response);
      if (response.data.status === 0) {
        this.setState({
          codeImg: response.data.data.captcha_img,
          codeToken: response.data.data.captcha_token,
        })
      }
    })
  }
  getIdentify = () => {
    const phone = this.props.form.getFieldValue('phone')
    if (this.state.isCheckedCode && phoneReg.test(phone)) {
      post(getIdentifyUrl, {
        phone,
      }).then(response => {
        console.log(response)
        if (response.code === 200) {
          this.setState({
            t: 60,
          })
          this.timer = setInterval(() => {
            this.setState((state, props) => ({
              t: state.t - 1
            }));
          }, 1000);
          if (this.state.t < 1) {
            this.setState({
              t: 0,
            })
            clearInterval(this.timer);
          }
        }
      })
    }
  }
  handleSubmit = (e) => {
        axios({
          // method: 'post',
          // url: logupUrl,
          // data: {
          //   username: values.username,
          //   phone: values.phone,
          //   password: values.password,
          //   code: values.identify,
          }
        }).then((res) => {
          const data = res.data.data;
          if (data.status === 0) {
            sessionStorage.setItem('zwzpToken', data.data.token);
            this.props.setUserInfo({
              ...data.data.userinfo,
              token: data.data.token
            });
            this.setState({
              loading: false,
            })
            Toast.info(res.data.msg);
            // this.props.history.replace('/auth/user');
          } else {
            Toast.info(res.msg);
          }
        }).catch(err => {
          this.setState({
            loading: true,
          })
        })
  }
  render() {
    const { getFieldProps } = this.props.form;
    const { codeImg, loading, t } = this.state;
    return (
      <div className="logup-wrapper">
        <p className="remind">已有账户请点击<Link to={`/login`}>登录</Link></p>
        <ul className="login-content">
          <li>
            <label htmlFor="phone" value={undefined}>手机号</label>
            <input
              {...getFieldProps('phone', {
                rules: [{ required: true }],
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
            <label>图片验证码</label>
            <input
              {...getFieldProps('code', {
                rules: [{ required: true }],
              })}
              type="text"
              placeholder="请输入"
              name="code"
              id="code"
              className="rest"
              value={undefined}
              onBlur={this.checkCodeImg}
            />
            {codeImg && <img className="code" alt="code" src={this.state.codeImg} onClick={this.fetchCodeImg} />}
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
            <button className="get-identify" onClick={this.getIdentify}>{t < 1 ? '获取验证码' : `重新获取(${t}s)`}</button>
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
          <li>
            <label value={undefined}>姓名</label>
            <input
              {...getFieldProps('name', {
                // rules: [{ required: true }],
              })}
              type="text"
              placeholder="请输入"
              id="name"
              className="rest"
              value={undefined}
            />
          </li>
        </ul>
        <button className="login-btn" onClick={this.handleSubmit}>
          {loading ? <Icon type="loading" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> : ''}
          确定
        </button>
      </div>
    )
  }
}

export default withRouter(Logup);