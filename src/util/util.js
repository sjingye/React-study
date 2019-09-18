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

// bind
Function.prototype.mybind = function (t, ...args) {
    const _this = this
    return function () {
        //同样因为支持柯里化形式传参我们需要再次获取存储参数
        return _this.apply(t, args.concat([...arguments]))
    }
}
// proxy
let onWatch = (obj, setBind, getLogger) => {
    let handler = {
        get(target, property, receiver) {
            getLogger(target, property)
            return Reflect.get(target, property, receiver)
        },
        set(target, property, value, receiver) {
            console.log(`set '${property}' = ${value}`)
            setBind(value)
            return Reflect.set(target, property, value)
        }
    }
    return new Proxy(obj, handler)
}
let obj = { a: 1 }
let value
let p = onWatch(obj, (v) => {
    // value = v
}, (target, property) => {
    console.log(`Get '${property}' = ${target[property]}`)
})
p.a = 2
console.log(p.a)

// 函数柯里化
function add (a) {
    return b => {
        return a + b
    }
}
add(1)(2)
// es5
function Person (state) {
    this.state = state
    return '<div></div>'
}
Person.prototype.say = function () {
    console.log(this.state)
}
const me = new Person('state')
console.info(me)
me.say()

function Parent(name) {
    this.parent = name
}
Parent.prototype.say = function() {
    console.log(`${this.parent}: 你打篮球的样子像kunkun`)
}
function Child () {}
Child.prototype = Object.create(Parent.prototype);

var child = new Child('cxk');
child.say() // father好，我是练习时长两年半的cxk