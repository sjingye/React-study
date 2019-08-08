// 测试redux
export default function count(state = 0, action) {
    switch(action.type) {
        case 'increase':
            return state + action.count
        case 'decrease':
            return state - action.count
        default:
            return state
    }
}