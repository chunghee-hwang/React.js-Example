import React, { Component } from 'react';

class CreateContent extends Component{
    render(){
      console.log('CreateContent render')
      return (
        <article>
          <h2>Create</h2>
          <form action="/create_process" method="post" onSubmit={(e)=>this.submitForm(e)}>
            <p><input type="text" name="title" placeholder="title"></input></p>
            <p>
              <textarea name="desc" placeholder="description"></textarea>
            </p>
            <p><input type="submit"></input></p>
          </form>
        </article>
      );
    }

    submitForm(e){
      e.preventDefault();
      this.props.onSubmit(e.target.title.value, e.target.desc.value)
    }
  }

  export default CreateContent