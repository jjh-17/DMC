use A607;

-- 카페 정보 테이블
DROP TABLE IF EXISTS cafe_info;
CREATE TABLE IF NOT EXISTS cafe_info  (
    cafe_seq BIGINT DEFAULT 0L,
    address VARCHAR(255),
    homepage_url STRING,
    image_url STRING,
    is_deleted TINYINT,
    kakao_name VARCHAR(100),
    kakao_rating FLOAT,
    latitude DOUBLE,
    longitude DOUBLE,
    name VARCHAR(100),
    naver_name VARCHAR(100),
    opening_hour STRING,
    rating FLOAT,
    region_code VARCHAR(255),
    tel VARCHAR(50),
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
    menu_seq BIGINT DEFAULT 0L,
    cafe_seq BIGINT DEFAULT 0L,
    dessert_tag VARCHAR(255),
    image_url STRING,
    name VARCHAR(100),
    price VARCHAR(50)
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
STORED AS TEXTFILE;


-- 플랫폼 리뷰 테이블
DROP TABLE IF EXISTS platform_review;
CREATE TABLE IF NOT EXISTS platform_review  (
    review_seq BIGINT DEFAULT 0L,
    cafe_seq BIGINT DEFAULT 0L,
    collected_date VARCHAR(15),
    content STRING,
    created_date VARCHAR(15),
    nickname VARCHAR(50),
    platform CHAR(1),
    tag VARCHAR(255)
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
STORED AS TEXTFILE;