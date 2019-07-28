import { userData } from '../mock/userData.js';

export function logup(params) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = userData.findIndex(item => item.username === params.username)
            if (index === -1) {
                userData.push({
                    username: params.username,
                    password: params.password,
                });
                resolve(params);
            } else {
                reject({ msg: '注册失败！' })
            }
        }, 100);
    })
};

export function login(params) {
    // fake async
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = userData.find(item => item.username === params.username)
            if (data.password === params.password) {
                console.log(params)
                resolve(params);
            } else {
                reject({ msg: '登录失败！' })
            }
        }, 100);
    })
}
// 获取职位列表数据
export function getJobList(params) {
    // fake async
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = require('../mock/JobListData.js').mockData();
            resolve(data);
        }, 100);
    })
}