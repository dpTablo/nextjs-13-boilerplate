# 인증 구현 개발 가이드

이 문서는 프론트엔드에서 인증정보(`Crendentials`)를 관리하는 매커니즘과 인증을 수행하는 방법을 설명합니다.

# 1. `Credentials` 클래스

백엔드의 인증 API 요청을 통해 인증정보를 획득할 수 있으며 `Credentials` 데이터 객체로 정보를 관리한다. 

인증이 되었다는 것(로그인)은 `Credentials` 데이터 생성되어 관리되는 것을 의미하며, 인증이 만료되었다는 것(로그아웃 또는 유효기간 만료 등)은 `Credentials` 정보가 삭제되었음을 의미한다.

## 인증 데이터의 관리
기본적으로는 `Credentials` 데이터가 redux store 와 cookie 에 관리하는 것을 권장한다. 이를 위하여 [AuthenticationManager](#3._AuthenticationManager) 를 제공한다. 

# 2. 인증정보 관리 프로세스
일반적인 인증정보 관리 프로세스는 다음과 같다.
1. 사용자로부터 ID와 비밀번호를 입력 받아 백엔드 API로 요청을 보낸다. 인증에 성공하면 인증 데이터(예: JWT 토큰)가 응답된다.
2. 응답된 데이터를 바탕으로 `Credentials` 데이터를 생성한다.
3. `LocalStorageCookieAuthenticationManager` 에 의해 redux store(local storage)와 cookie 에 정보가 저장된다.
4. 이후 백엔드 API를 사용할 때 `Credentials` 데이터가 있다면 `BackEndService` 인터페이스 구현체에서는 인증 정보를 자동으로 설정하여 API 요청을 보낸다.
5. 위의 백엔드 API 요청 시에 인증이 만료되었다면 인증정보 refresh API요청을 시도하여 인증 정보를 갱신하고 본래 호출하였던 API 를 재요청 한다.
6. refresh 에 실패한 경우에는 로그인을 유도한다.
7. 인증이 만료되면(또는 로그아웃) `LocalStorageCookieAuthenticationManager` 를 사용하여 `Credentials` 데이터를 삭제한다. 

# 3. `AuthenticationManager`

인증(ex: login), 인증해제(ex: logout) 과 같은 인증관련 행위는 `AuthenticationManager` 에게 위임된다. 즉, `Credentials` 데이터의 생성과 소멸을 관장하는 역할을 가진다.

## 기본 제공 구현체 `LocalStorageCookieAuthenticationManager`
기본 `LocalStorageCookieAuthenticationManager` 구현체를 제공한다. 이 구현체는 `Credentials` 정보를 `localStorage` 와 `Cookie`에 관리하도록 구현되어 있으며 클라이언트 측의 인증정보를 서버측(nextjs server)로 전달할 때 cookie 방식으로 전달하게 된다.

## 다른 방식의 인증 정보 관리 구현 방법
다른 방식의 인증 관리 방식은 `AuthenticationManager`를 구현하여 사용한다.