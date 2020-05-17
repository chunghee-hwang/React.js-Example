import DisplayNumber from '../components/DisplayNumber';
import {connect} from 'react-redux';
// 리덕스의 state를 리액트의 props로 연결 시키는 함수
// 즉 리덕스의 state값이 바뀔 때마다, 리액트의 props를 바꾸는 작업을 한다.
// 인자: redux의 state
function mapReduxStateToReactProps(state){
    return {
        number: state.number
    };
}

//DisplayNumber를 래핑하는 함수
export default connect(mapReduxStateToReactProps)(DisplayNumber); //connect가 리턴하는 함수를 다시 호출
/*
import React, { Component } from 'react';
import store from '../store'
// DisplayNumber 컴포넌트의 리덕스 담당 컴포넌트. (래핑)

export default class DisplayNumberContainer extends Component {
    state = { number: store.getState().number };
    constructor(props) {
        super(props);
        //store의 state가 바뀔 때마다 리스너가 호출된다.
        store.subscribe(() => {
            this.setState({ number: store.getState().number });
        });
    }
    render() {
        return <DisplayNumber
            number={this.state.number}
        ></DisplayNumber>;
    }
}*/