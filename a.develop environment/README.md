## Create react app 설치

### React.js 환경 구축
1. node.js 설치

2. npx로 react app 환경 구축

```
npx create-react-app my-app
cd my-app
npm start
```

3. 여러가지 설정하기
```
npm run eject
```

### [npm vs npx](https://geonlee.tistory.com/32)
<b>npm</b>은 node.js의 모듈을 컴퓨터의 로컬에 저장하고, 모듈의 버전이 높아지면 사용자가 직접 모듈을 삭제하고 다시 설치해야한다.

<b>npx</b>는 앱이 빌드되면 일회성으로 모듈을 설치하며 앱이 종료되면 다시 모듈을 삭제한다. 모듈의 버전이 높아졌다면 앱이 빌드될 때마다 모듈을 설치하기 때문에 업데이트된 버전으로 앱을 빌드할 수 있다.

## 절대 경로로 import 하기
### 상대 경로로 모듈 import 하기
아래 처럼 모듈을 임포트하면 디렉토리 깊이가 깊어지면 매우 불편해진다
```javascript
import {something} from '../../../Something';
```

### 절대 경로로 모듈 import 하기
이를 여기 [문서](https://create-react-app.dev/docs/importing-a-component/#absolute-imports)를 통해 설정해주면 모듈을 절대경로로 접근할 수 있다.

```javascript
import {something} from 'component/Something';
```
