-- hdfs dfs -put /home/jjh/hive_code/data/* /hive/input/
-- hive -f /home/jjh/hive_code/sql/scraping_table_init.sql

use hive_db;

-- 스크래핑한 카카오 카페 정보 테이블
DROP TABLE IF EXISTS kakao_cafe_info;
CREATE TABLE IF NOT EXISTS kakao_cafe_info  (
    cafe_name VARCHAR(100),
    image_url VARCHAR(255),
    rating FLOAT,
    latitude DOUBLE,
    longitude DOUBLE,
    address VARCHAR(255),
    tel VARCHAR(25),
    opening_hour STRING,
    homepage_url VARCHAR(255)
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
STORED AS TEXTFILE
TBLPROPERTIES ('skip.header.line.count'='1');
LOAD DATA INPATH '/hive/input/kakao_cafe.csv' INTO TABLE kakao_cafe_info;


-- 스크래핑한 카카오 카페 메뉴 테이블
DROP TABLE IF EXISTS kakao_cafe_menu;
CREATE TABLE IF NOT EXISTS kakao_cafe_menu  (
    cafe_name VARCHAR(100),
    name VARCHAR(100),
    dessert_tag VARCHAR(255),
    price VARCHAR(50),
    image_url VARCHAR(255)
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
STORED AS TEXTFILE
TBLPROPERTIES ('skip.header.line.count'='1');
LOAD DATA INPATH '/hive/input/kakao_menu.csv' INTO TABLE kakao_cafe_menu;

-- 스크래핑한 카카오 리뷰 테이블
DROP TABLE IF EXISTS kakao_platform_review;
CREATE TABLE IF NOT EXISTS kakao_platform_review  (
    cafe_name VARCHAR(100),
    nickname VARCHAR(50),
    rating FLOAT,
    content STRING,
    profile VARCHAR(255),
    created_date VARCHAR(15),
    collected_date VARCHAR(15)
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
STORED AS TEXTFILE
TBLPROPERTIES ('skip.header.line.count'='1');
LOAD DATA INPATH '/hive/input/kakao_review.csv' INTO TABLE kakao_platform_review;

-- 스크래핑한 네이버 카페 정보 테이블
DROP TABLE IF EXISTS naver_cafe_info;
CREATE TABLE IF NOT EXISTS naver_cafe_info  (
    cafe_name VARCHAR(100),
    image_url VARCHAR(255),
    rating FLOAT,
    latitude DOUBLE,
    longitude DOUBLE,
    address VARCHAR(255),
    tel VARCHAR(25),
    opening_hour STRING,
    homepage_url VARCHAR(255)
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
STORED AS TEXTFILE
TBLPROPERTIES ('skip.header.line.count'='1');
LOAD DATA INPATH '/hive/input/naver_cafe.csv' INTO TABLE naver_cafe_info;

-- 스크래핑한 네이버 카페 메뉴 테이블
DROP TABLE IF EXISTS naver_cafe_menu;
CREATE TABLE IF NOT EXISTS naver_cafe_menu  (
    cafe_name VARCHAR(100),
    name VARCHAR(100),
    dessert_tag VARCHAR(255),
    price VARCHAR(50),
    image_url VARCHAR(255)
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
STORED AS TEXTFILE
TBLPROPERTIES ('skip.header.line.count'='1');
LOAD DATA INPATH '/hive/input/naver_menu.csv' INTO TABLE naver_cafe_menu;

-- 스크래핑한 네이버 리뷰 테이블
DROP TABLE IF EXISTS naver_platform_review;
CREATE TABLE IF NOT EXISTS naver_platform_review  (
    cafe_name VARCHAR(100),
    nickname VARCHAR(50),
    rating FLOAT,
    content STRING,
    profile VARCHAR(255),
    created_date VARCHAR(15),
    collected_date VARCHAR(15)
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
STORED AS TEXTFILE
TBLPROPERTIES ('skip.header.line.count'='1');
LOAD DATA INPATH '/hive/input/naver_review.csv' INTO TABLE naver_platform_review;