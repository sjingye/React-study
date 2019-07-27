import React, { Component } from 'react';

export default function asyncComponent(importComponent) {
    class AsyncComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                Com: null,
            }
        }
        async componentDidMount() {
            const { default: Com } = await importComponent();
            this.setState({
                Com,
            })
        }
        render() {
            const Com = this.state.Com;
            return (
                <div>
                    {Com ? <Com /> : ''}
                </div>
            )
        }

    }
    return AsyncComponent;
}
