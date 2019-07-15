import React, { PureComponent } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createForm, formShape } from 'rc-form';
import { Toast, Icon } from 'antd-mobile';
import { get, loginUrl, codeimgUrl, checkCodeimgUrl } from 'api/index.js';
import { userInfo } from 'actions/auth.js';
import './index.scss';

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
class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      codeImg: '',
      codeToken: '',
      isCheckedCode: false,
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
    get(codeimgUrl).then(response => {
      console.log(response);
      if (response.data.status === 0) {
        this.setState({
          codeImg: response.data.data.captcha_img,
          codeToken: response.data.data.captcha_token,
        })
        console.log(response.data.data.captcha_img);
      }
    })
  }
  checkCodeImg = () => {
    console.log(this.props.form.getFieldValue('code'))
    get(checkCodeimgUrl, {
      captcha_token: this.state.codeToken,
      captcha_code: this.props.form.getFieldValue('code'),
    }).then(response => {
      console.log(response);
      if (response.data.status === 0) {
        this.setState({
          isCheckedCode: true,
        })
      }
    })
  }
  handleSubmit = (e) => {
    console.log(this.props.from)
    this.props.form.validateFields((err, values) => {
      if (!err && this.state.isCheckedCode) {
        this.setState({
          loading: true,
        })
        axios({
          method: 'post',
          url: loginUrl,
          data: {
            username: values.username,
            password: values.password,
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
    })
  }
  render() {
    const { getFieldProps } = this.props.form;
    const { codeImg, loading } = this.state;
    return (
      <div className="login-wrapper">
        <p className="remind">登录后才能进行相应操作</p>
        <ul className="login-content">
          <li>
            <label htmlFor="phone" value={undefined}>手机号</label>
            <input
              {...getFieldProps('phone', {
                // rules: [{ required: true }],
              })}
              type="phone"
              placeholder="请输入"
              name="phone"
              id="phone"
              className="rest"
              value={undefined}
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
              value={undefined}
            />
          </li>
          <li>
            <label>验证码</label>
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
        </ul>
        <button className="login-btn" onClick={this.handleSubmit}>
          {loading ? <Icon type="loading" style={{verticalAlign: 'middle', marginRight: '4px'}}/> : ''}
          登录
        </button>
        <p className="link">
          <Link to={`/logup`}>没有账户请点击注册</Link>
          <Link to={`/find-password`}>找回密码</Link>
        </p>
      </div>
    )
  }
}

export default withRouter(Login);