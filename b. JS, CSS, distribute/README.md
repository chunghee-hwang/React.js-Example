## b. JS, CSS, distribute

#### JS 작성
index.js를 살펴보면 다음 코드가 있다.
```javascript
import App from './App';
ReactDOM.render(<App />, document.getElementById('root'));
```
이는 App.js로 부터 컴포넌트를 가져온 뒤 id가 root인 태그 아래에 
class가 App인 컴포넌트를 랜더링하겠다는 뜻이다.

JS 코드 작성은 App.js에서 이뤄지며, Component 클래스를 상속받으면 사용자 정의 태그가 만들어진다.

##### 기본 틀
1. index.html
```html
<div id="root">
    <div class="App">
</div>
```

2. App.js
```javascript
import React, { Component } from 'react';
import './App.css';

class App extends Component
{
  render(){
    return (
      // 반드시 모든 코드는 이 태그의 안쪽에 있어야한다.
      <div className="App">
        Hello, React!!
      </div>
    );
  };
}
export default App;
```

<hr />

#### CSS 작성
앱 전체를 관장하고 있는 index.html의 디자인을 수정하려면 index.css를 수정하면 된다.

App 컴포넌트에 대한 디자인을 수정하려면 App.css를 수정하면 된다. 이게 가능한 이유는 각 컴포넌트 js 파일에서 해당 css 파일을 import하고 있기 때문이다.

index.js<br>
```javascript
import './index.css';
```

App.js<br>
```javascript
import './App.css';
```

<hr />

#### 배포하기(deploy)
```shell
npm run build # 빌드
npm install -g serve # 간단한 웹 서버 설치
npx serve -s build # 빌드한 앱 실행
```
위 명령어를 치게 되면 디렉토리에 'build'라는 것이 생긴다.

build/index.html을 살펴보면, 코드에는 공백을 찾을 수 없다. 즉, 코드가 압축되었다. 배포된 웹 페이지의 용량은 144KB인 반면, 디버그 웹 페이지의 용량은 1.7MB로 차이가 크다.
