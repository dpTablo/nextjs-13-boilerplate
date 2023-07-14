# 배포 가이드
프로젝트 루트 경로의 docker 디렉토리 하위에 배포를 위한 파일이 작성되어 있다.

Nextjs 는 [PM2](https://www.npmjs.com/package/pm2) 프로세스 매니저를 통해 실행되도록 구성되어 있다. 2개의 docker 이미지를 생성하여 배포한다.
- application : nextjs + pm2 복합 구성
- nginx : nginx 웹서버의 reverse proxy 역할

`docker/dev` 경로에는 개발서버 배포용을 의미하며, `docker/production` 경로에는 운영서버 배포용을 의미한다.

# Nextjs 배포

`Dockerfile-pm2-dev` 에 docker build가 정의되어 있다.

# Nginx 배포

`Dockerfile-nginx-dev` 에 docker build가 정의되어 있다.

`nginx.conf`, `nginx-app.conf` 파일은 nginx docker 이미지 빌드 시 적용된다.

# jenkins

ci/cd 를 위한 jenkins 파이프라인 스크립트가 작성되어 있다. 배포 파이프라인은 아래의 과정을 수행한다.
1. git 저장소 clone
2. 빌드 서버의 빌드될 예정의 docker image 삭제
3. docker build
4. docker save
5. 배포대상 서버에 docker image file 업로드
6. 배포대상 서버의 생성된 구버전의 docker 컨테이너 및 이미지 삭제
7. 신규 docker image load 및 컨테이너 생성
