DROP TABLE IF EXISTS kakao_cafe_info;
DROP TABLE IF EXISTS kakao_platform_review;
DROP TABLE IF EXISTS kakao_cafe_menu;
DROP TABLE IF EXISTS naver_cafe_info;
DROP TABLE IF EXISTS naver_platform_review;
DROP TABLE IF EXISTS naver_cafe_menu;

CREATE TABLE IF NOT EXISTS kakao_cafe_info  (
    column1 STRING,
    column2 INT,
    column3 DOUBLE
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
STORED AS TEXTFILE;