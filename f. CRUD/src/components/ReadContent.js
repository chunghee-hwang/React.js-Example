import React, { Component } from 'react';

class ReadContent extends Component{
    render(){
      console.log('Content render')
      let {title, desc} = this.props.content;
      return (
        <article>
          <h2>{title}</h2>
          {desc}
        </article>
      );
    }
  }

  export default ReadContent