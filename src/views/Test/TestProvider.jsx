/*
 * Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言
 */
import React from 'react';

const ThemeContext = React.createContext('light');

export default class Test extends React.Component {
    render() {
        return (
            // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
            // 无论多深，任何组件都能读取这个值。
            // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
            <ThemeContext.Provider value="dark" >
                <Toolbar />
            </ThemeContext.Provider>
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
    static contextType = ThemeContext
    render() {
        return (
            <button theme={this.context}>
                测试provider
            </button>
        )
    }
}