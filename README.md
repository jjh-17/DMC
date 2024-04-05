# A607


# ![alt text](DMC.png)당모카 (당신의 모든 카페)

## 카페 리뷰 통합 서비스

- 여러 플랫폼의 카페 정보와 리뷰를 통합하여 보여주는 서비스
- 사용자 리뷰를 분석하여 광고 리뷰 여부를 판단
- 사용자의 선호 태그에 따라 카페 추천
- 사용자 리뷰 작성 성향에 따른 칭호

## 💡 UCC


## Member

| 팀원   |      역할       |
| :----- | :----------------: | 
| 지준호 | 데이터 |
| 김영진 | 인프라 |  
| 안수진 | FrontEnd | 
| 조용운 | FrontEnd | 
| 강민정 | Backend |  
| 김다나 | Backend | 

## 🚩 목차
1. 프로젝트 개요
2. 서비스 소개
3. 기능 소개
4. 시연
5. 기술 스택
6. 기타 산출물


## 📑 프로젝트 개요
#### 개요
 - 여러 플랫폼에 산재 되어있는 리뷰를 통합하여 사용자에게 신뢰성 있는 카페 리뷰를 전달
 - 리뷰의 신뢰성을 판단하여 사용자가 믿을만한 리뷰를 참고하여 의미 있는 소비를 할 수 있게 함
 - 개인 취향에 맞는 카페 추천해주는 사용자 맞춤형 서비스

#### 진행기간 
 - 2024.02.19 ~ 2024.04.04 (7주)

#### 목적
 - 카페에 대한 리뷰가 여러 플래폼에 산재되어 있으므로, 이를 통함하여 보여줌으로써 사용자 편의성 증진
 - 사용자가 느낀 카페의 특징을 한눈에 볼 수 있도록하여 리뷰를 보지 않아도 사용자의 
 - 많은 카페가 우후죽순 생겨난 현재, 사용자에게 적절한 카페를 추천

####  배경
 - AI 시대가 도래함에 따라 AI에 대체불가능한 인간의 역량을 발전시켜야 한다.
 - 이에 대한 역량으로는 소통력, 학습력, 비판적 사고력이 있다.
 - 수동적인 교육 시스템에 의해 스스로의 생각을 정리하고, 발화하는 등의 능동적인 학습에 익숙지 않은 현대인들에게 해당 역량의 향상은 매우 중요하다.
 - 한번에 학습력, 소통력, 비판적 사고력을 기를 수 있는 토론에 재미를 더해서 익숙지 않은 '토론'에 쉽게 접근
 - 실제 토론을 컨텐츠한 인터넷 방송이 엄청난 인기를 끌면서 해당 소재에 대한 사용자의 수요를 파악할 수 있었다.


## 🧮 서비스 소개
#### 페르소나
 - 모범생 : 자유롭게 토론하며 토론 역량 기르고 싶은 사람
 - 수강생 : 자유로운 토론을 보고 배우고 싶은 사람
 - 언변꾼 : 자신의 의견을 표현하고 설득하러 온 사람
 - 구경꾼 : 개판 5분 전 토론을 보면서 즐기고 싶은 사람

#### 서비스 간단 소개
 - Drwa는 webRTC를 기반으로 한 실시간 화상채팅을 이용한 토론 게임입니다. 자신이 토론하고 싶은 주제로 방을 생성하여 상대 토론자를 기다리세요 ! 게임이 시작되면 Drwa가 방설정 정보를 토대로 사회자 역할을 대신 해드립니다. 내 발언시간에 상대팀은 모두 '마이크 X' ! 자신의 의견을 주장해보아요. 배심원을 설득해 투표를 과반수 얻게되면 승리하여 포인트를 얻게 됩니다. 자신의 랭크 또한 확인해보세요 !


## 💡 기능 소개
####  1. 시스템 사회자
- 사용자가 방 생성 당시에 설정한 파트별 시간에 따라 자동으로 페이즈를 변경
- 각 페이즈의 발언권을 가진 사용자에게만 마이크를 허용하는 마이크 통제 기능

####  2. 재접속

####  3. Unsplash API를 이용한 썸네일 지정
- 토론방 생성 시에 썸네일로 설정할 이미지를 제시어 입력을 받아 실시간으로 이미지 목록을 추천

####  4. ElasticSearch를 이용한 검색 기능
- 방 제목 또는 방 제시어를 검색하여 검색어의 형태소와 일치하는 방 제목 또는 방 제시어를 가진 방 목록을 출력

####  5. 랭킹
- 통합 Top 20 랭킹 제공
- 카테고리별 Top20 랭킹 제공
- 닉네임 검색 시에 해당 닉네임 포함 상위, 하위 10위씩의 랭킹 제공(총 20개 순위)


## 시연


## 기술 스택

- ####  BackEnd
  - Openjdk17
  - SpringBoot 3.2.1
  - Spring Data JPA
  - Spring Security
  - QueryDSL
  - Swagger 3.0.0
  - jjwt 0.9.1

- ####  FrontEnd
  - Vue3
  - Axios
  - Quasar
  - Pinia
  -  

- ####  Database
  - MySQL 8.3.0
  - Redis 7.2.4

- ####  Infra
  - Docker 25.0.0
  - Jenkins 2.426.2
  - Nginx 1.18.0
  - AWS EC2

####  Project Architecture

![아키텍쳐](./documents/architecture/아키텍쳐.png)


## 기타 산출물

[기능 명세서](https://discovered-lemongrass-789.notion.site/2c04cab8ab864f1caf205112e58a76b2?v=c197501aa796455fabc3eb0a913ff680)

[API 명세서](https://discovered-lemongrass-789.notion.site/6085e93cfd0441028830c2de640f3f00?v=6d2c1d313382493a87cb396067ce9bdf&pvs=4)

[Convention](./documents/convention/convention.md)
