use A607;

-- 카페 정보 테이블
DROP TABLE IF EXISTS cafe_info;
CREATE TABLE IF NOT EXISTS cafe_info  (
    is_deleted TINYINT,
    kakao_rating FLOAT,
    latitude DOUBLE,
    longitude DOUBLE,
    rating FLOAT,
    cafe_seq BIGINT DEFAULT 0L,
    tel VARCHAR(50),
    kakao_name VARCHAR(100),
    name VARCHAR(100),
    naver_name VARCHAR(100),
    opening_hour STRING,
    address VARCHAR(255),
    homepage_url STRING,
    image_url STRING,
    region_code VARCHAR(255),
    top_tag VARCHAR(255),
    updated_date VARCHAR(255)
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
STORED AS TEXTFILE;


-- 카페 메뉴 테이블
DROP TABLE IF EXISTS cafe_menu;
CREATE TABLE IF NOT EXISTS cafe_menu  (
    cafe_seq BIGINT DEFAULT 0L,
    menu_seq BIGINT DEFAULT 0L,
    price VARCHAR(50),
    name VARCHAR(100),
    dessert_tag VARCHAR(255),
    image_url STRING
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
STORED AS TEXTFILE;


-- 플랫폼 리뷰 테이블
DROP TABLE IF EXISTS platform_review;
CREATE TABLE IF NOT EXISTS platform_review  (
    platform CHAR(1),
    cafe_seq BIGINT DEFAULT 0L,
    review_seq BIGINT DEFAULT 0L,
    collected_date VARCHAR(15),
    content STRING,
    created_date VARCHAR(15),
    nickname VARCHAR(50),
    tag VARCHAR(255)
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
STORED AS TEXTFILE;