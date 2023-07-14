# 기본 개발 가이드

이 문서는 프론트엔드의 전반적인 구현 과정에서 필요한 내용에 대해 설명합니다.

# 1. nextjs 실행에 관하여 

- dev-macos-msw / dev-windows-msw : msw 를 활성화하여 개발 모드로 nextjs 실행한다.
- dev : msw 가 비활성화된 개발 모드로 nextjs 실행한다.
- start : 운영 모드로 nextjs 를 실행한다.
- lint : 프로젝트 전체 linting 을 수행한다.
- test : 프로젝트 전체 테스트 케이스를 실행한다.
- cypress:open: cypress E2E 키가 
- build : nextjs 빌드를 수행한다.

# 2. ajv
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

# 라우팅 
nextjs 13 의 App Routing 을 사용한다.

## 라우팅 경로의 접근 제어
기본적으로 특정 라우팅 경로에 접근 제어를 구현할 때 middleware.js 를 사용한다. middleware.js는 src 하위 경로에 있다. 

`src/middleware` 경로에 접근제어의 목적마다 별도로 로직을 구현하고 이를 middleware.js 에 적용하는 형태로 작성한다.

# react component 구현
구현 react 컴포넌트 코드는 `src/components` 경로에 작성해야 한다.

# redux
redux, redux toolkit, redux-persist 를 적용하였다.
redux store 저장 방식은 localStorage 사용을 권장한다. 특별한 이유가 있는 경우 다른 방식도 허용된다.

# model
프로젝트에서 사용되는 모든 데이터 모델은 `src/model` 경로에 작성해야 한다.

# 커스텀 Error 클래스 구현
프로젝트에서 정의한 커스텀 Error 클래스는 `src/error` 경로에 작성해야 한다.

# Linting
프로젝트에는 ESLint, stylelint 가 적용되어 있으며 주요 사항은 다음과 같다.

## ESLint
aiabnb typescript linting rule 베이스가 된다. 주요 linting rule 사항은 다음과 같다.
- airbnb-typescript
- next
- prettier
- jest
- react-hooks

## stylelint
주요 linting rule 사항은 다음과 같다.
- standard
- scss