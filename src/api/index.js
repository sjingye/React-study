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
                resolve(params);
            } else {
                reject({ msg: '登录失败！' })
            }
        }, 100);
    })
}
// 获取职位列表数据,排序数据自己模拟的，加载更多的时候数据排序会有问题，仅做演示之用
export function getJobList(params) {
    // fake async
    return new Promise((resolve, reject) => {
        let title = params.title || ''
        let time = params.time
        let number = params.number
        let province = params.province
        setTimeout(() => {
            const data = require('../mock/JobListData.js').mockData();
            let res = [];
            if (time === 0) {
                res = [...data.data].sort((a, b) => {
                    return new Date(b.createdTime) - new Date(a.createdTime)
                })
            } else if (time === 1) {
                res = [...data.data].sort((a, b) => {
                    return new Date(a.createdTime) - new Date(b.createdTime)
                })
            } else if (time === undefined && number === 0) {
                res = [...data.data].sort((a, b) => {
                    return b.number - a.number
                })
            } else if (time === undefined && number === 1) {
                res = [...data.data].sort((a, b) => {
                    return a.number - b.number
                })
            }
            let list = res.filter(item => {
                if (!title) {
                    return true
                } else {
                    return item.jobTitle.includes(params.title)
                }
            })
            if (params.province) {
                const a  = JSON.parse(JSON.stringify(list)).filter(item => {
                    console.log(item)
                    return item.city.includes(params.province)
                })
                console.log(a)
            }
            resolve({
                ...data,
                data: list
            });
        }, 100);
    })
}