# A607 당모카

## GitLab
* URL : https://lab.ssafy.com/s10-bigdata-dist-sub2/S10P22A607.git
* Personal Access Token
	* A607 : 9dx4xy-XxZq_9itKT988
* Project Access Tokens
	* GitLab API token
		* jenkins : LxCpawe9yU79zVC-A8xo
## AWS EC2
* main
	* ssh -i J10A607T.pem ubuntu@j10a607.p.ssafy.io
* sub
	* ssh -i J10A607T.pem ubuntu@j10a607a.p.ssafy.io
## AWS S#
* AWS_ACCESSKEY=AKIA2UC3FYPCSV4VUAGB
* AWS_SECRETKEY=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
* AWS_S3_BUCKET=ssafy-dmc

## Linux
### ufw
* using : 22, 80, 3306, 8080, 8081, 8082, 50000

## MYSQL
* url : j10a607.p.ssafy.io
* port : 3306:3306
* username : root
* password : !dmcA607?
* table : dangmoca

## IDE Environment variables
* environment variables.txt 참고

## Docker

### Jenkins

#### Plugins
* GitLab, NodeJS, Docker, Mattermost Notification

#### Tools
* JDK : zulu_jdk17.0.10 / Install automatically - Extract *.zip/*.tar.gz
	* Download URL for binary archive : https://cdn.azul.com/zulu/bin/zulu17.48.15-ca-jdk17.0.10-linux_x64.tar.gz?_gl=1*1x2hmho*_ga*MjEwNzM0MTExOS4xNzAxMDU4MDk2*_ga_42DEGWGYD5*MTcxMDY5NzM0NS4zLjEuMTcxMDY5Nzk5Ni41Mi4wLjA.
	* Subdirectory of extracted archive : zulu17.48.15-ca-jdk17.0.10-linux_x64
* Git installations : GitDefault
* Gradle installations : Gradle 8.6
* NodeJS : NodeJS 20.12.0
* Docker : DockerDefault

#### Docker Container
* openjdk:17, node:20.12.0-alpine3.18, Nginx:latest

### BE
* JDK : zulu_jdk17.0.10
* Spring boot 3.2.3
* Spring Dependency-management 1.1.4
* dependencies : spring-boot-starter, spring-boot-devtools, spring-boot-starter-test, spring-boot-starter-web, spring-boot-starter-data-jpa, lombok, mysql-connector-j
		* JWT : gson, jjwt, jaxb-api, jaxb-core, jaxb-impl
		* Redis : spring-boot-starter-data-redis, spring-session-data-redis 
		* S3 : spring-cloud-starter-aws
		* Logger : slf4j-api

### FE
* NodeJS : NodeJS 20.12.0
* yarn, React ,Typescript
* dependencies : 
	* axios: ^1.6.8
	* framer-motion: ^11.0.24
	* react: ^18.2.0
	* react-dom: ^18.2.0
	* react-router-dom: ^6.22.3
	* react-use-measure: ^2.1.1
	* react-wordcloud: ^1.2.7
	* sweetalert2: ^11.10.7
	* zustand: ^4.5.2
* devDependencies : 
	* @tsconfig/vite-react: ^3.0.2
	* @types/react: ^18.2.56
	* @types/react-dom: ^18.2.19
	* @typescript-eslint/eslint-plugin: ^7.0.2
	* @typescript-eslint/parser: ^7.0.2
	* @vitejs/plugin-react: ^4.2.1
	* autoprefixer: ^10.4.18
	* eslint: ^8.56.0
	* eslint-plugin-react-hooks: ^4.6.0
	* eslint-plugin-react-refresh: ^0.4.5
	* kakao.maps.d.ts: ^0.1.39
	* postcss: ^8.4.35
	* tailwindcss: ^3.4.1
	* typescript: ^5.2.2
	* vite: ^5.1.4
	* vite-plugin-svgr: ^4.2.0