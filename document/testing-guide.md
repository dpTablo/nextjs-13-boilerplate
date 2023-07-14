# 테스트 작성 가이드

# 기본 사항
단위 테스트는 기본적으로 아래의 라이브러리를 이용하여 구현한다.
- @testing-library
- jest

mocking 도 특별한 사유가 아니면 두 라이브러리에서 제공되는 기능을 활용하는 것을 권장한다.

# next-router-mock
nextjs의 router mocking 을 위하여 [next-router-mock](https://www.npmjs.com/package) 라이브러리를 사용하였다.

# MSW
MSW 라이브러리를 이용한 API Mocking 을 적용하였다.

npm : https://www.npmjs.com/package/msw

env 내의 `NEXT_PUBLIC_API_MOCKING` 속성을 `enable`로 설정하고, NODE_ENV 가 `development` 일 때 동작한다.

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

# cypress
E2E 테스트에 해당하는 것은 cypress 테스트 케이스로 작성한다.