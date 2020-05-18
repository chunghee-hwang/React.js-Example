import React, { Component } from 'react';

class Nav extends Component {
  // 라이프 사이클 중 컴포넌트가 초기화될 때 호출되는 함수
  render() {
    let listTags = this.props.list.reduce((accumulator, value) => {
      accumulator.push(
        <li key={value.id}>
          <a href={value.id} data-id={value.id} onClick={e => {
            e.preventDefault();
            this.props.onClick(e.target.dataset.id);
          }}>
            {value.title}
          </a>
        </li>);
      return accumulator;
    }, []);
    return (
      <nav>
        <ul>
          {listTags}
        </ul>
      </nav>
    );
  }
}

class Article extends Component {
  render() {
    return (
      <article>
        <h2>{this.props.title}</h2>
        {this.props.desc}
      </article>
    );
  }
}

class NowLoading extends Component {
  render() {
    return <div>Now Loading...</div>
  }
}

class App extends Component {
  state = {
    article: {
      item: { title: 'Welcome', desc: 'Hello, React & AJAX' },
      isLoading: false
    },
    list: {
      items: [],
      isLoading: false
    }
  }
  componentDidMount() {
    let newList = Object.assign({}, this.state.list, {isLoading:true});
    this.setState({list: newList});
    // Ajax 통신
    fetch('list.json')
      .then(res => {
        return res.json(); // string을 json 타입으로 처리해서 js 객체로 변환한다.
      })
      .then(json => {
        console.log(json); // 변환된 json 객체 출력
        this.setState(
          {
            list: {
              items: json,
              isLoading: false
            }
          });
      });
  }
  render() {
    let NavTag = null;
    if (this.state.list.isLoading) {
      NavTag = <NowLoading></NowLoading>
    } else {
      NavTag =
        <Nav list={this.state.list.items} onClick={id => {
          let newArticle = Object.assign({},this.state.article, {isLoading: true});
          this.setState({'article': newArticle});
          fetch(`${id}.json`)
            .then(res => {
              return res.json();
            })
            .then(json => {
              this.setState({
                article: {
                  item: {
                    title: json.title,
                    desc: json.desc
                  },
                  isLoading: false
                }
              });
            });
        }} />
    }
    let ArticleTag = null;
    if(this.state.article.isLoading){
      ArticleTag = <NowLoading></NowLoading>
    }
    else{
      ArticleTag =  
      <Article
      title={this.state.article.item.title}
      desc={this.state.article.item.desc} />
    }
    return (
      <div className="App">
        <h1>WEB</h1>
        {NavTag}
        {ArticleTag}
      </div>
    );
  }
}

export default App;
