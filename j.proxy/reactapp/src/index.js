import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component
{
  render(){
    return(
      <div>
        <input type="button" value="get data" onClick={
          event=>{
            // 전체 주소를 입력해야한다.. => 비효율적
            fetch('/data.json')
            .then(result=>{
              return result.json();
            })
            .then(json=>{
              console.log(json)
            })
          }
        }></input>
      </div>
    )
  }
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

