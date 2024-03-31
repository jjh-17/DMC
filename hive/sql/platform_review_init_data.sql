use A607;


-- 카카오 리뷰 추가
TRUNCATE TABLE platform_review;
INSERT INTO
    platform_review(
        cafe_seq, nickname, content, platform, created_date, collected_date
    )
SELECT
    C.cafe_seq,
    K.nickname,
    K.content,
    'K' AS platform,
    K.created_date,
    K.collected_date
FROM
    kakao_platform_review AS K
    LEFT JOIN cafe_info AS C ON K.cafe_name = C.kakao_name;


-- 네이버 리뷰 추가
INSERT INTO
    platform_review(
        cafe_seq, nickname, content, platform, created_date, collected_date
    )
SELECT
    C.cafe_seq,
    N.nickname,
    N.content,
    'N' AS platform,
    N.created_date,
    N.collected_date
FROM
    naver_platform_review AS N
    LEFT JOIN cafe_info AS C ON N.cafe_name = C.naver_name;


-- platform_review에 cafe_seq를 Overwrite
CREATE TABLE new_platform_review AS
SELECT
    row_number() OVER () - 1 AS menu_seq,
    cafe_seq, 
    nickname, 
    content, 
    platform, 
    created_date, 
    collected_date
FROM platform_review;

INSERT OVERWRITE TABLE platform_review
SELECT * FROM new_platform_review;


-- overwrite 하기 위한 임시 테이블 제거
DROP TABLE new_platform_review;


-- export csv
INSERT OVERWRITE LOCAL DIRECTORY '/home/jjh/A607/data/output/platform_review/'
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
SELECT * FROM platform_review;