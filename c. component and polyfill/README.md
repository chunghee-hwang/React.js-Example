# c. component and polyfill

## Component

### Pure html vs React.js
react.js 없이 만든 public/pure.html과 react.js로 구성한 src/App.js를 비교해보자.

### component 만들기
Component를 상속하는 class를 만든다.
Component 클래스는 render()라는 멤버 메소드를 가지고 있다.
여기서 template 코드를 리턴하면 된다.

### component 사용하기
만약 Subject라는 컴포넌트를 만들었다고 하자.<br>
App 컴포넌트안에서 <Subject /> 태그를 입력하여 App 컴포넌트 안에 Subject 태그가 포함된다.

## Polyfill

### internet explorer 11에 React app polyfill 사용하기
참고 사이트: [링크](https://hoons-up.tistory.com/13)
#### react-app-polyfill 모듈 설치
```shell
npm install react-app-polyfill --save
```

#### package.json에서 다음 내용으로 수정
최신 버전의 react-script가 버그가 있기 때문에 버전을 3.2.0으로 낮추고<br>
브라우저 리스트에 IE 11 추가한다.

```json
{
  "dependencies": {
    "react-scripts": "^3.2.0", 
  },
  "browserslist": {
    "development": [
      "ie 11",
    ]
  }
}

```

#### node_modules 갱신
node_modules 폴더를 지우고
```
npm install
```
실행


#### index.js 맨 첫줄에 다음 명시

```javascript
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

// ...
```

#### 서버 실행 후 IE에서도 React.js가 동작하는 지 확인
```
npm start
```