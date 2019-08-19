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
function a () {
    b.bind(this,'id')
}
// bind
Function.prototype.mybind = function (t, ...args) {
    const _this = this
    return function () {
        //同样因为支持柯里化形式传参我们需要再次获取存储参数
        return _this.apply(t, args.concat([...arguments]))
    }
}