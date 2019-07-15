import React, { PureComponent } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createForm, formShape } from 'rc-form';
import { Toast } from 'antd-mobile';
import { get, loginUrl, codeimgUrl } from 'api/index.js';
import { userInfo } from 'actions/auth.js';
import './index.scss';

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      codeImg: ''
    };
  }
  static propTypes = {
    form: formShape,
  };
  componentDidMount() {
    document.title = '登录';
    this.fetchCodeImg();
  }
  fetchCodeImg = () => {
    console.log('验证')
    get(codeimgUrl).then(response => {
      console.log(response);
      if (response.data.status === 0) {
        this.setState({
          codeImg: response.data.data.captcha_img,
        })
        console.log(response.data.data.captcha_img);
      }
    })
  }
  handleSubmit = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        axios({
          method: 'post',
          url: loginUrl,
          data: {
            username: values.username,
            password: values.password,
            backend: '0',
          }
        }).then((res) => {
          const data = res.data.data;
          console.log(data)
          if (data.status === 0) {
            sessionStorage.setItem('zwzpToken', data.data.token);
            this.props.setUserInfo({
              ...data.data.userinfo,
              token: data.data.token
            });
            this.setState({
              loading: false,
            })
            this.props.history.replace('/auth/user');
          } else {
            Toast.info(res.msg);
          }
        }).catch(err => {
          this.setState({
            loading: true,
          })
        })
      }
    })
  }
  render() {
    const { getFieldProps } = this.props.form;
    const { codeImg } = this.state;
    return (
      <div className="login-wrapper">
        <p className="remind">登录后才能进行相应操作</p>
        <ul className="login-content">
          <li>
            <label htmlFor="phone">手机号码</label>
            <input
              {...getFieldProps('phone', {
                // rules: [{ required: true }],
              })}
              type="phone"
              placeholder="请输入"
              name="phone"
              id="phone"
              className="rest"
            />
          </li>
          <li>
            <label htmlFor="password">登录密码</label>
            <input
              {...getFieldProps('password', {
                // rules: [{ required: true }],
              })}
              type="password"
              placeholder="请输入"
              name="password"
              id="password"
              className="rest"
            />
          </li>
          <li>
            <label>验证码</label>
            <input
              {...getFieldProps('code', {
                // rules: [{ required: true }],
              })}
              type="number"
              placeholder="请输入"
              name="code"
              id="code"
              className="rest"
            />
            {codeImg && <img className="code" alt="code" src={this.state.codeImg} onClick={this.fetchCodeImg} />}
          </li>
        </ul>
        <button className="login-btn" onClick={this.handleSubmit}>登录</button>
        <p className="link">
          <Link to={`/logup`}>没有账户请点击注册</Link>
          <Link to={`/find-password`}>找回密码</Link>
        </p>
      </div>
    )
  }
}

Login = createForm()(Login);

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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));