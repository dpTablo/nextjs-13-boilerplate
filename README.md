이 프로젝트는 next13 App Routing 프로젝트 보일러 플레이트 입니다.

**문서 작성일 : 2023년 7월 14일**

# 1. 프로젝트 구성
## next.js 13.4.1
next.js 13 문서
https://nextjs.org/docs

## typescript
개발언어로 typescript 를 사용한다.

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

# 3. 개발 가이드 문서
아래 개발 가이드 문서를 참조하십시오.
- [기본 개발 가이드](document%2Fdevelop-guide.md)
- [인증 구현 개발 가이드](document%2Fauthentication-guide.md)
- [백엔드 API 서비스 계층 구현 가이드](document%2Fbackend-service-guide.md)
- [테스트 작성 가이드](document%2Ftesting-guide.md)
- [UI 및 Styling 가이드](document%2Fui-styling-guide.md)
- [배포 가이드](document%2Fdelivery-guide.md)
