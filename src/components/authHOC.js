import React, { useEffect } from 'react';

function RouteHOC(BaseComponent, name) {
    useEffect(() => {
       document.title = name
    })
    // 返回Restricted组件
    return function Restricted() {
        return (<BaseComponent />)
    }
}

export default RouteHOC;