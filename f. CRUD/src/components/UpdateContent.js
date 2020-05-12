import React, { Component } from 'react';

class UpdateContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.content.id,
      title: this.props.content.title,
      desc: this.props.content.desc
    }
  }
  
  render() {
    console.log(this.props.content);
    console.log('UpdateContent render')
    return (
      <article>
        <h2>Update</h2>
        <form action="/create_process" method="post" onSubmit={(e) => this.submitForm(e)}>
          <input type="hidden" name="id" value={this.state.id}></input>
          <p>
            <input
              type="text"
              name="title"
              placeholder="title"
              value={this.state.title}
              onChange={(e)=>this.inputFormHandler(e)}
            >
            </input>
          </p>
          <p>
            <textarea 
            name="desc" 
            placeholder="description" 
            value={this.state.desc}
            onChange={(e)=>this.inputFormHandler(e)}

            ></textarea>
          </p>
          <p><input type="submit"></input></p>
        </form>
      </article>
    );
  }

  inputFormHandler(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value})
  }

  submitForm(e) {
    e.preventDefault();
    this.props.onSubmit(
      this.state.id, 
      this.state.title, 
      this.state.desc
    );
  }
}

export default UpdateContent