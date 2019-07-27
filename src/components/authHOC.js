import React, { useEffect } from 'react';

// useEffect方法不行，可能生命周期的时间节点不太一样？
/*
function RouteHOC(BaseComponent, name) {
    useEffect(() => {
       document.title = name
       console.log(name)
    })
    return function Restricted(props) {
        return (<BaseComponent {...props} />)
    }
}
*/

function RouteHOC(BaseComponent, name) {
    // 返回Restricted组件
    return class Restricted extends React.Component {
        componentDidMount() {
            document.title = name
            console.log(name)
        }
        render() {
            return <BaseComponent {...this.props} />
        }
    }
}

export default RouteHOC;