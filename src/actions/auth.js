export const USER_INFO = 'USER_INFO';
export const USER_TOKEN = 'USER_TOKEN';

export function userInfo(userInfo) {
    return {
        type: USER_INFO,
        userInfo
    }
}
export function userToken(userToken) {
    return {
        type: USER_TOKEN,
        token: userToken
    }
}