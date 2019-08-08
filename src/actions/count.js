export function increaseCount(count) {
    return {
        type: 'increase',
        count
    }
}

export function decreaseCount(count) {
    return {
        type: 'decrease',
        count
    }
}