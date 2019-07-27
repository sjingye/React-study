import React, { useState, useReducer } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { login } from 'api/index.js';
import { Toast } from '../../components/index.js';
import './index.scss';

const initialState = {};

function reducer(state = { userInfo: {} }, action) {
    switch (action.type) {
        case 'userInfo':
            return Object.assign({}, state, {
                userInfo: action.userInfo
            })
        default:
            return state;
    }
}

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alertTip, setAlertTip] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);

    function handleSubmit(e) {
        if (!checkForm()) return;
        login({
            username: username,
            password: password,
        }).then((res) => {
            sessionStorage.setItem('username', res.username);
            dispatch({
                type: 'userInfo',
                userInfo: res
            })
            setAlertTip('登录成功');
            setAlertVisible(true);
            props.history.go(-1);
        }).catch(err => {
            setAlertTip('登录失败');
            setAlertVisible(true);
        })
    }
    function checkForm() {
        let msg = '';
        let reg = /^[\u4e00-\u9fa5A-Za-z\d]{1,20}$/;
        if (!reg.test(username) || !reg.test(password)) {
            msg = '请输入汉字、字母或者数字';
            setAlertTip(msg);
            setAlertVisible(true);
        }
        return !Boolean(msg);
    }
    function handleAlertVisible() {
        setAlertVisible(false);
    }
    return (
        <div className="login-wrapper">
            <p className="remind">登录后才能进行相应操作</p>
            <ul className="login-content">
                <li>
                    <label>用户名</label>
                    <input
                        placeholder="请输入"
                        id="username"
                        className="rest"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }}
                    />
                </li>
                <li>
                    <label>登录密码</label>
                    <input
                        type="password"
                        placeholder="请输入"
                        id="password"
                        className="rest"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                </li>
            </ul>
            {/* {state.userInfo && <p>{state.userInfo.password}</p>} */}
            <button className="login-btn" onClick={handleSubmit}>登录</button>
            <p className="link">
                <Link to={`/logup`}>没有账户请点击注册</Link>
            </p>
            {alertVisible && <Toast message={alertTip} visible={alertVisible} close={handleAlertVisible} />}
        </div>
    )
}

export default withRouter(Login);