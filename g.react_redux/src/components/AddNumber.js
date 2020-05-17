// 리덕스와 종속되지 않고 화면에 표시만 해주는 컴포넌트
import React, { Component } from 'react';
export default class AddNumber extends Component {
    state = { size: 1 }
    render() {
        return (
            <div>
                <h1>Add Number</h1>
                <input type="button" value="+" onClick={() => {
                    this.props.onClick(this.state.size);
                }}></input>
                <input type="text" value={this.state.size} onChange={(e) => {
                    this.setState({ size: Number(e.target.value) });

                }}></input>
            </div>
        );
    }
}