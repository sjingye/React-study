import React from 'react';

export default class TestProto extends React.Component {
    componentDidMount() {
        const a = {a:1, b:2, c:3}
        const array = []
        for (let key in a) {
            console.log(key)
            array.push({
                key,
                value: a[key]
            })
        }
        console.log(array)

        // for...of语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句
        for (let value of Object.entries(a)) {
            console.log(value)
        }
        const b = Object.entries(a).map((item) => {
            return {
                key: item[0],
                value: item[1]
            }
        })
        console.log(b)
        console.log(a)
    }
    render() {
        return (
            <div></div>
        )
    }
}
