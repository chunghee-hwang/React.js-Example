# h. 리액트와 AJAX

## AJAX

>웹브라우저는 대단히 정적인 시스템이었다. 내용이 바뀌면 페이지 새로고침을 해서 내용을 새롭게 변경해야 했다. 이것은 웹이 전자 문서를 염두에 두고 고안된 시스템이기 때문에 당연하게 생각 되었다.

>그러다 Ajax 개념이 도입되면서 모든 것이 바뀌었다. Ajax는 웹브라우저와 웹서버가 내부적으로 데이터 통신을 하게 된다. 그리고 변경된 결과를 웹페이지에 프로그래밍적으로 반영함으로써 웹페이지의 로딩 없이 서비스를 사용할 수 있게 한다. 

>Ajax는 Asynchronous JavaScript and XML의 약자다. 한국어로는 비동기적 자바스크립트와 XML 정도로 직역할 수 있는데 자바스크립트를 이용해서 비동기적으로 서버와 브라우저가 데이터를 주고 받는 방식을 의미한다. 이 때 사용하는 API가 XMLHttpRequest이다. 그렇다고 꼭 XML을 사용해서 통신해야 하는 것은 아니다. 사실 XML 보다는 JSON을 더 많이 사용한다.

## Fetch API
자바스크립트의 기본 API로 AJAX를 수행하는 fetch가 있다.
### 사용법
자세한 사용법: [링크](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Fetch%EC%9D%98_%EC%82%AC%EC%9A%A9%EB%B2%95)
```javascript
fetch('요청할 URL')
.then(res => {
    return res.json(); // string을 json 타입으로 처리해서 js 객체로 변환한다.
})
.then(json => {
    console.log(json); // 변환된 json 객체 출력
});
```

## Component.componentDidMount
리액트의 생명주기중 하나로, 컴포넌트가 초기화될 때 호출되는 함수이다.<br>
AJAX 요청을 여기서 하면 초기 요청을 할 수 있다.

## presentational component와 container
리액트는 재사용 가능한 컴포넌트를 만드는 것이 목적이다.
따라서 컴포넌트 안에 fetch 동작을 하는 코드가 있으면 의존적이게 된다.<br>
component를 presentational component(데이터를 보여주기만 하는 component)와<br>container(데이터를 fetch하는 컴포넌트)로 나누면 된다.<br>
그 방법은 presentational component를 container가 감싸면 된다.<br>
여기서는 App 컴포넌트가 container 역할을 하게된다.