# 목차
- [1. 프로젝트 구성](#1.-프로젝트-구성)
- [2. IDE, 개발환경 설정](#2.-IDE,-개발환경-설정)
- [3. 프로젝트 설정](#3.-프로젝트-설정)
- [4. 배포](#4-배포)
---

# 1. 프로젝트 구성
## next.js 13.4.1
next.js 13 문서
https://nextjs.org/docs

## typescript
개발언어로 typescript 를 사용한다.

## MSW
MSW 라이브러리를 이용한 API Mocking 을 적용하였다.

npm : https://www.npmjs.com/package/msw

env 내의 `NEXT_PUBLIC_API_MOCKING` 속성을 `enable`로 설정하고, NODE_ENV 가 `development` 일 때 동작한다.

### nextjs 13 App Router 에서의 MSW 사용
nextjs 13 에서는 App Router 를 사용할 때 서버 컴포넌트에서는 MSW의 serviceWorker 타입이 동작하지 않는다. serviceWorker 에서는 클라이언트 사이드에서만 동작한다.

MSW serviceWorker 는 초기화는 `ClientComponent`에 구현되어 있으며, MSW serviceWorker를 사용하려면 사용하고자 하는 컴포넌트를 `ClientComponent`로 래핑해야 한다. 

```typescript jsx
export default function TestPage() {
    return (
        <div>
            <ClientComponent>
                <LoginForm />
            </ClientComponent>
        </div>
    );
}
```

## ajv
json 데이터를 직렬화하여 데이터 모델 객체를 생성할 때 `ajv`를 이용하여 json 데이터의 검증을 수행한다.

```typescript
export class UserAuthentication {
    private _userId = '';

    private _accessToken = '';

    private _refreshToken = '';

    static fromJson(json: object): UserAuthentication {
        const avj = new Avj();
        const validate = avj.compile(schema);
        if (!validate(json)) {
            throw new ServiceResponseInvalidJsonError(validate.errors);
        }

        const instance = new UserAuthentication();
        instance.userId = json.userId as string;
        instance.accessToken = json.accessToken as string;
        instance.refreshToken = json.refreshToken as string;
        return instance;
    }

    // 이하 생략
}
```

## style
3가지의 style 라이브러리가 적용되어 있다.
- scss
- styled-components
- tailwindCSS

### tailwindCSS와 다른 스타일 라이브러리와의 상호운용성
tailwindCSS 와 다른 스타일 라이브러리를 혼용하여 사용하는 경우에 CSS 주입 순서의 오류로 인하여 원하지 않는 렌더링 결과를 얻을 수 있다.

스타일 라이브러리의 특성마다 이 부분에 대하여 설정이 필요하다.

mui 라이브러리에 대해서는 아래 문서를 참조하여 이 부분을 해결하였다.

mui 가이드 문서

https://mui.com/material-ui/guides/interoperability/#tailwind-css

# 2. IDE, 개발환경 설정
## stylelint
사용하는 IDE에서 stylelint를 설정해야 한다.

아래는 WebStorm IDE에서의 설정이다.
![img.png](document/readme/webstorm_stylelint_settings.png)

## [eslint] Delete 'cr' [prettier/prettier] 이슈
`eol`을 `native`로 설정합니다.
```shell
git config --global core.eol native
```

macOS, linux `autocrlf` 를 `input`으로 설정합니다.
```shell
git config --global core.autocrlf input
```

windows 에서는 `autocrlf` 를 `auto`으로 설정합니다.
```shell
git config --global core.autocrlf auto
```

참조 : https://developpaper.com/solution-to-delete-%E2%90%8Deslint-prettier-prettier-error/

# 3. 프로젝트 설정
## Install Tailwind CSS with Next.js
참조 : [공식문서 (Install Tailwind CSS with Next.js) ](https://tailwindcss.com/docs/guides/nextjs)