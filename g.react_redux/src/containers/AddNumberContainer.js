import AddNumber from '../components/AddNumber'
import {connect} from 'react-redux'

//리덕스의 dispatch를 react의 props로 연결시키는 함수
//인자 store.dispatch함수
function mapReduxDispatchToReactProps(dispatch)
{
    return {
        onClick:function(size){
            dispatch({type:'INCREMENT', size})
        }
    };
}

// 리덕스와 AddNumber 컴포넌트를 연결
export default connect(null, mapReduxDispatchToReactProps)(AddNumber);

/*
import React, { Component } from 'react';
import store from '../store'

// 컨테이너에서는 Redux 로직을 맡고
// 하위 컴포넌트는 뷰를 그리는 역할만 한다.
// 즉 AddNumber를 랩핑한 컴포넌트이다.
export default class AddNumberContainer extends Component{
    render(){
        return <AddNumber onClick={(size)=>{
            store.dispatch({type:'INCREMENT', size})
        }}></AddNumber>
    }
}
*/