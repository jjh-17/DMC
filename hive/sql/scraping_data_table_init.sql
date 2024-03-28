DROP TABLE IF EXISTS kakao_cafe_info;
DROP TABLE IF EXISTS kakao_platform_review;
DROP TABLE IF EXISTS kakao_cafe_menu;
DROP TABLE IF EXISTS naver_cafe_info;
DROP TABLE IF EXISTS naver_platform_review;
DROP TABLE IF EXISTS naver_cafe_menu;

-- 스크래핑한 카카오 카페 정보 테이블
CREATE TABLE IF NOT EXISTS kakao_cafe_info  (
    name VARCHAR(100),
    latitude DOUBLE,
    longitude DOUBLE,
    image_url VARCHAR(255),
    address VARCHAR(255),
    tel VARCHAR(25),
    rating FLOAT,
    opening_hour VARCHAR(255),
    homepage_url VARCHAR(255)
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
STORED AS TEXTFILE;