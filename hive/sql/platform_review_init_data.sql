use A607;


-- 카카오 리뷰 추가
TRUNCATE TABLE platform_review;
INSERT INTO
    platform_review(
        cafe_seq, collected_date, content, 
        created_date, nickname, platform, tag
    )
SELECT
    C.cafe_seq,
    K.collected_date,
    K.content,
    K.created_date,
    K.nickname,
    'K' AS platform,
    NULL AS tag
FROM
    kakao_platform_review AS K
    LEFT JOIN cafe_info AS C ON K.cafe_name = C.kakao_name
    WHERE 
        C.cafe_seq IS NOT NULL AND
        K.nickname IS NOT NULL AND K.nickname!='NULL' AND
        K.content IS NOT NULL AND K.content!='NULL' AND
        K.created_date IS NOT NULL AND K.created_date!='NULL' AND
        K.collected_date IS NOT NULL AND K.collected_date!='NULL';


-- 네이버 리뷰 추가
INSERT INTO
    platform_review(
        cafe_seq, collected_date, content, 
        created_date, nickname, platform, tag
    )
SELECT
    C.cafe_seq,
    N.collected_date,
    N.content,
    N.created_date,
    N.nickname,
    'N' AS platform,
    NULL AS tag
FROM
    naver_platform_review AS N
    LEFT JOIN cafe_info AS C ON N.cafe_name = C.naver_name
    WHERE 
        C.cafe_seq IS NOT NULL AND 
        N.nickname IS NOT NULL AND N.nickname!='NULL' AND
        N.content IS NOT NULL AND N.content!='NULL' AND
        N.created_date IS NOT NULL AND N.created_date!='NULL' AND
        N.collected_date IS NOT NULL AND N.collected_date!='NULL';

-- platform_review에 cafe_seq를 Overwrite
CREATE TABLE new_platform_review AS
SELECT
    platform, 
    cafe_seq, 
    row_number() OVER () + 100 AS menu_seq,
    collected_date,
    content, 
    created_date, 
    nickname, 
    tag
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
