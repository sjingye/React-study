// 节流：固定时间之后会触发一次，降低触发频率，如onscoll事件
export function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
        let _this = this
        clearTimeout(timer);
        timer = setTimeout(function() {
            fn.apply(_this, args);
        }, delay);
    }
}
// 防抖，只会触发一次
export function throttle(fn, delay) {
    let timer = null;
    return function (...args) {
        let _this = this;
        if (timer) {
            timer = setTimeout(function () {
                fn.apply(_this, args);
                timer = null;
            }, delay)
        }
    }
}