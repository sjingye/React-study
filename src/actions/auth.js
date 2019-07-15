export const USER_INFO = 'USER_INFO';

export function userInfo(userInfo) {
    return {
        type: USER_INFO,
        userInfo
    }
}