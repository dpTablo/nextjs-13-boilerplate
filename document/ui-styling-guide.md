# UI 및 Styling 가이드

# 기본 사항
3가지의 style 라이브러리가 적용되어 있다.
- scss
- styled-components
- tailwindCSS

# tailwindCSS와 다른 스타일 라이브러리와의 상호운용성
tailwindCSS 와 다른 스타일 라이브러리를 혼용하여 사용하는 경우에 CSS 주입 순서의 오류로 인하여 원하지 않는 렌더링 결과를 얻을 수 있다.

스타일 라이브러리의 특성마다 이 부분에 대하여 설정이 필요하다.

mui 라이브러리에 대해서는 아래 문서를 참조하여 이 부분을 해결하였다.

mui 가이드 문서

https://mui.com/material-ui/guides/interoperability/#tailwind-css

# stylelint
stylelint 가 적용되어 있으며 scss 에 대한 rule 표준이 작성되어 있다.

# Install Tailwind CSS with Next.js
참조 : [공식문서 (Install Tailwind CSS with Next.js) ](https://tailwindcss.com/docs/guides/nextjs)