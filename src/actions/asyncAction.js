// 同步的action
function receivePosts(subreddit, json) {
    return {
        type: 'RECEIVE_POSTS',
        subreddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

// 异步的action
export function fetchPosts(subreddit) {
    // Thunk middleware 知道如何处理函数。
    // 这里把 dispatch 方法通过参数的形式传给函数，
    // 以此来让它自己也能 dispatch action。
    return function (dispatch) {
        return fetch(`http://www.subreddit.com/r/${subreddit}.json`)
            .then(
                response => response.json(),
                // 不要使用 catch，因为会捕获
                // 在 dispatch 和渲染中出现的任何错误，
                // 导致 'Unexpected batch number' 错误。
                // https://github.com/facebook/react/issues/6895
                error => console.log('An error occurred.', error)
            )
            .then(json =>
                // 可以多次 dispatch！
                // 这里，使用 API 请求结果来更新应用的 state。

                dispatch(receivePosts(subreddit, json))
            )
    }
}

/*
* Redux middleware: 可以利用来进行日志记录、创建崩溃报告、调用异步接口或者路由等等
* 它提供的是位于 action 被发起之后，到达 reducer 之前的扩展点 
* middleware-函数柯里化
*/

