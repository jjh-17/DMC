FROM nginx:latest


RUN mkdir /app
WORKDIR /app

RUN mkdir ./build
ADD ./build ./build

### nginx의 default.conf 삭제
RUN rm /etc/nginx/conf.d/default.conf

### host의 nginx.conf를 아래 경로에 복사
COPY ./nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]