import axios from 'axios';
const prefix = 'http://recruit-test-b.com';

axios.defaults.baseURL = prefix;
axios.interceptors.request.use(function (request) {
    request.headers.common['Content-Type'] = 'application/json; charset=utf-8';
    return request;
}, function (error) {
    return Promise.reject(error);
});

export function post(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, params,
            {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('zwzpToken'),
                },
            }
        ).then((response) => {
            resolve(response.data);
        }).catch((response) => {
            reject(response.data);
        })
    })
}

export function get(url = '', params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('zwzpToken'),
            },
            params,
        }).then(function (response) {
            resolve(response.data);
        }).catch(function (response) {
            reject(response.data);
        })
    })
}

export const loginUrl = `${prefix}/member/login`;
export const codeimgUrl = '/captcha/get-captcha';
export const checkCodeimgUrl = '/captcha/verify-captcha';
export const getIdentifyUrl = '/member/sendcode';
export const logupUrl = '/member/signup';

/**
 * 用户
 */
export const userUrl = '/member/index';
export const deleteUserUrl = '/member/delete';
export const addUserUrl = '/member/register';
// 查询单个用户
export const userDataUrl = '/member/show';
export const updateUserUrl = '/member/update';
/**
 * 人才库
 */
// 主页数据展示和查询
export const tanlentsUrl = '/talent/index';
export const tanlentsSelectUrl = '/talent/header';
export const tanlentsCheckboxUrl = '/talent/custom';
export const postTanlentsCheckboxUrl = '/talent/choose';
/**
 * 简历
 */
export const resumeUrl = '/resumes/index';

