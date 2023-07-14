# 백엔드 API 서비스 계층 구현 가이드

# 백엔드 서버 URL 설정에 관하여
아래 3개 설정 정보를 확인하여 백엔드 개발 서버와 백엔드 운영 서버의 정보를 설정한다.  
- .env
- .env.development
- .evn.production


`NEXT_PUBLIC_API_BACK_END_SERVICE_BASE_URL` 프로퍼티에 개발서버에 맞는 정보를 설정한다.

# 기본 사항
크게 3가지 요소로 구성된다.
- `AxiosFactory`
- `AxiosProvider`
- `BackEndService` 인터페이스 구현체

## AxiosFactory
`AxiosInstanceType`을 정의하고 이에 맞는 axios instance 를 생성한다. 이 때 생성옵션 값과 같은 생성시점에서 결정해야 하는 사항들을 다룬다.

## AxiosProvider
axios instance 에 부가적인 설정을 하고, 싱글톤으로 관리되도록 하는 역할을 한다. Service 에게 axios instance 를 제공하는 책임을 가진다.

## BackEndService
백엔드 서비스 API 를 요청하는 객체를 Service 라고 하며 `BackEndService` 를 구현한다. `BackEndService`는 2가지 하위 인터페이스로 구분할 수 있다.
- `AuthenticationRequiredService` : 인증이 필요한 서비스
- `AnonymousService` : 익명으로 사용 가능한 서비스

구현하고자 하는 서비스의 집합별로 해당하는 인터페이스를 구현한다. 요청 시 사용되는 axios 는 AxiosProvider 로부터 제공받는다.

### ClientSideBackEndApi 와 ServerSideBackEndApi
위 3가지 요소에 대한 설정과 인증 서비스를 제외한 모든 서비스들의 facade 객체이다. 각각 클라이언트 측과 서버(nextjs server) 측에서 사용가능하다.
컴포넌트 구현 측면에서는 위 두가지 facade 객체를 통해서 백엔드 서비스 요청을 수행한다.