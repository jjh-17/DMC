use hive_db;

-- 스크래핑한 카카오 카페 정보 테이블
DROP TABLE IF EXISTS cafe_info;
CREATE TABLE IF NOT EXISTS cafe_info  (
    cafe_seq BIGINT,
    name VARCHAR(100),
    latitude DOUBLE,
    longitude DOUBLE,
    kakao_name VARCHAR(100),
    naver_name VARCHAR(100),
    image_url VARCHAR(255),
    address VARCHAR(255),
    tel VARCHAR(50),
    rating FLOAT,
    kakao_rating float,
    opening_hour STRING,
    url varchar(255),
    updated_date varchar(255),
    top_tag TINYINT,
    is_deleted TINYINT
)
ROW FORMAT DELIMITED
STORED AS TEXTFILE;


-- 스크래핑한 카카오 카페 메뉴 테이블
DROP TABLE IF EXISTS cafe_menu;
CREATE TABLE IF NOT EXISTS cafe_menu  (
    menu_seq BIGINT,
    cafe_seq BIGINT,
    name VARCHAR(100),
    price VARCHAR(50),
    image_url VARCHAR(255),
    dessert_tag VARCHAR(255)
)
ROW FORMAT DELIMITED
STORED AS TEXTFILE;

-- 스크래핑한 카카오 리뷰 테이블
DROP TABLE IF EXISTS platform_review;
CREATE TABLE IF NOT EXISTS platform_review  (
    review_seq BIGINT,
    cafe_seq BIGINT,
    nickname VARCHAR(50),
    content STRING,
    platform CHAR(1),
    created_date VARCHAR(15),
    collected_date VARCHAR(15)
)
ROW FORMAT DELIMITED
STORED AS TEXTFILE;