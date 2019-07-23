import { userData } from '../mock/userData.js';

export function logup(params) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = userData.findIndex(item => item.username === params.username)
            if (index === -1) {
                userData.push({
                    ...params,
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