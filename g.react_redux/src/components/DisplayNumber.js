import React, { Component } from "react";

export default class DisplayNumber extends Component {
    //state가 변경될 때 자동 호출
    render() {
        return (
            <div>
                <h1>Display Number</h1>
                <input type="text" value={this.props.number} readOnly></input>
            </div>
        );
    }
}
