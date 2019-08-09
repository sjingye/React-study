/*
 * Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言
 */
import React from 'react';

const ThemeContext = React.createContext('light');
const ObjContext = React.createContext({
    color: 'blue',
    toggleColor: function () {
        console.log('toggle')
    }
})

export default class Test extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
            // 无论多深，任何组件都能读取这个值。
            // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
            <div>
                <ThemeContext.Provider value="dark" >
                    <Toolbar />
                </ThemeContext.Provider>
            </div>

        )
    }
}

function Toolbar(props) {
    return (
        <div>
            <ThemedButton {...props} />
        </div>
    )
}

class ThemedButton extends React.Component {
    constructor(props) {
        super(props);
        /* 
        为了在回调中使用 `this`，这个绑定是必不可少的

        在整个class类中，所有的this指向都是class的实例，但是当回调函数被赋值后，其体内的this指向并不会继承原本this的指向，因为此刻触发该回调函数的并不是class的实例。所以你需要手动绑定该this指向。

        该绑定的代码中，this代表的是回调函数对象，这句代码可以理解为：将该组件中的handleClick回调函数绑定到该组件上，实质上是将回调函数中的this指向该组件对象，然后将改变了执行上下文的回调函数，再重新替换掉原来的handleClick回调函数，那么此时的回调函数中的this指向的是类定义的组件。

        */
        this.handleClick = this.handleClick.bind(this)
    }
    static contextType = ThemeContext
    componentDidMount() {
        this.handleClick()
    }
    handleClick() {
        console.log(this)
    }
    render() {
        return (
            <div>
                <button theme={this.context} onClick={this.handleClick} style={{ width: '100%', height: '40px' }}>
                    测试provider
                </button>
            </div>

        )
    }
}

class ThemedP extends React.Component {
    static contextType = ThemeContext
    componentDidMount() {
        this.handleClick()
    }
    handleClick() {
        console.log(this)
    }
    render() {
        return (
            <div>
                <button theme={this.context} onClick={this.handleClick} style={{ width: '100%', height: '40px' }}>
                    测试provider
                </button>
                {/* <ObjContext.Consumer>
                    {
                        ({ color, toggleColor }) => {
                            return (
                                <p style={{ color: color }} onClick={toggleColor}>
                                    测试consumer
                                </p>
                            )
                        }
                    }

                </ObjContext.Consumer> */}
            </div>
        )
    }
}