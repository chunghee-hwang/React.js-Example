import { createStore } from 'redux';
export default createStore((state, action) => {
    if(!state){
        return {number: 0};
    }
    if(action.type === 'INCREMENT'){
        // ...: state 복사
        return {...state, number: state.number + action.size};
    }
    return state;

},window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
