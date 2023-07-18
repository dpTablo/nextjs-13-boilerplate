# 테스트 작성 가이드

# 1. 기본 사항
단위 테스트는 기본적으로 아래의 라이브러리를 이용하여 구현한다.
- @testing-library
- jest

mocking 도 특별한 사유가 아니면 두 라이브러리에서 제공되는 기능을 활용하는 것을 권장한다.

테스트 케이스 파일명은 `{테스트 대상인 객체/클래스명}.test.ts` 형태로 작성한다.

## 테스트 케이스 작성 경로
테스트 케이스의 작성은 `/__tests__` 하위 디렉토리에 `/src/` 하위의 디렉토리 구성과 동일한 경로에 해당하는 테스트케이스를 작성한다.

예를 들어 `/src/service/user/DefaultUserService.ts` 의 테스트 케이스는 `/__tests_/service/user/DefaultUserService.test.ts` 경로에 작성한다.

## 단위 테스트 예제 코드
다음 코드를 참조한다.
- [DefaultAuthService.test.ts](..%2F__tests__%2Fservice%2Fauth%2FDefaultAuthService.test.ts)
- [DefaultUserService.test.ts](..%2F__tests__%2Fservice%2Fuser%2FDefaultUserService.test.ts)

# 2. next-router-mock
nextjs의 router mocking 을 위하여 [next-router-mock](https://www.npmjs.com/package) 라이브러리를 사용하였다.

# 3. MSW
MSW 라이브러리를 이용한 API Mocking 을 적용하였다.

npm : https://www.npmjs.com/package/msw

env 내의 `NEXT_PUBLIC_API_MOCKING` 속성을 `enable`로 설정하고, NODE_ENV 가 `development` 일 때 동작한다.

## MSW Handler 구현
`/src/msw/handler` 하위 경로에 백엔드 Service 인터페이스에 대응되는 코드를 구현한다. 새롭게 정의된 handler 는 server.ts 또는 worker.ts 에 추가해야 적용된다.

## nextjs 13 App Router 에서의 MSW 사용
nextjs 13 에서는 App Router 를 사용할 때 서버 컴포넌트에서는 MSW의 serviceWorker 타입이 동작하지 않는다. serviceWorker 에서는 클라이언트 사이드에서만 동작한다.

MSW serviceWorker 는 초기화는 `ClientComponentEnvironment`에 구현되어 있으며, MSW serviceWorker를 사용하려면 사용하고자 하는 컴포넌트를 `ClientComponentEnvironment`로 래핑해야 한다.
프로젝트에는 RootLayout 에 `ClientComponentEnvironment`가 적용되어 있다.
```typescript jsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        {/*
            <head /> will contain the components returned by the nearest parent
            head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
        */}
        <head />
        <body>
        <ClientComponentEnvironment>{children}</ClientComponentEnvironment>
        </body>
        </html>
    );
}
```

# 4. cypress
E2E 테스트에 해당하는 것은 cypress 테스트 케이스로 작성한다.

`/cypress/e2e` 하위 경로에 테스트를 작성하며 파일명은 `{테스트케이스명}.cy.ts` 형태로 작성한다.