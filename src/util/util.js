// 节流：固定时间之后会触发一次，降低触发频率，如onscoll事件
export function debounce(fn, delay) {
    let timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(fn, delay);
    }
}
// 防抖，只会触发一次
export function throttle(fn, delay) {
    let timer = null;
    return function () {
        if (timer) {
            timer = setTimeout(() => {
                fn();
                timer = null;
            }, delay)
        }
    }
}