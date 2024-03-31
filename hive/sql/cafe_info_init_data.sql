use A607;


-- 네이버와 카카오 카페에서 겹치는 것 INSERT
TRUNCATE TABLE cafe_info;
INSERT INTO
    cafe_info(
        name, latitude, longitude, kakao_name, naver_name, 
        image_url, address, tel, rating, kakao_rating, opening_hour, 
        url, updated_date, top_tag, is_deleted
    )
SELECT
    T.naver_name AS name, T.latitude, T.longitude, T.kakao_name, T.naver_name,
    T.image_url, T.address, T.tel, NULL, T.kakao_rating, T.opening_hour,
    T.url, date_format(current_date(), 'yyyy-MM-dd'), NULL AS top_tag, 0 AS is_deleted
FROM(
    SELECT
        K.cafe_name AS kakao_name, 
        N.cafe_name AS naver_name, 
        N.image_url AS image_url, 
        K.rating AS kakao_rating, 
        N.latitude AS latitude, 
        N.longitude AS longitude, 
        N.address AS address, 
        N.tel AS tel, 
        N.opening_hour AS opening_hour, 
        N.homepage_url AS url
    FROM 
        naver_cafe_info AS N
        INNER JOIN
        kakao_cafe_info AS K
        ON(
            (
                ABS(K.latitude - N.latitude) < 0.0001   AND 
                ABS(K.longitude - N.longitude) < 0.0001 AND
                K.tel=N.tel                             AND 
                LEVENSHTEIN(K.cafe_name, N.cafe_name)<=10
            )
            OR
            LEVENSHTEIN(K.cafe_name, N.cafe_name)=0
        )
) AS T;


-- 통합 카페 정보에 없으면서 네이버 카페에 있는 것 INSERT
INSERT INTO
    cafe_info(
        name, latitude, longitude, kakao_name, naver_name, 
        image_url, address, tel, rating, kakao_rating, opening_hour, 
        url, updated_date, top_tag, is_deleted
    )
SELECT
    T.naver_name AS name, T.latitude, T.longitude, NULL, T.naver_name,
    T.image_url, T.address, T.tel, NULL, NULL, T.opening_hour,
    T.url, date_format(current_date(), 'yyyy-MM-dd'), NULL, 0
FROM(
    SELECT
        N.cafe_name AS naver_name, 
        N.image_url AS image_url,
        N.latitude AS latitude, 
        N.longitude AS longitude, 
        N.address AS address, 
        N.tel AS tel, 
        N.opening_hour AS opening_hour, 
        N.homepage_url AS url
    FROM naver_cafe_info AS N
    LEFT JOIN cafe_info AS C ON N.cafe_name = C.naver_name
    WHERE C.naver_name IS NULL
) AS T;


-- 통합 카페 정보에 없으면서 카카오 카페에 있는 것 INSERT
INSERT INTO
    cafe_info(
        name, latitude, longitude, kakao_name, naver_name, 
        image_url, address, tel, rating, kakao_rating, opening_hour, 
        url, updated_date, top_tag, is_deleted
    )
SELECT
    T.kakao_name AS name, T.latitude, T.longitude, T.kakao_name, NULL,
    T.image_url, T.address, T.tel, NULL, T.kakao_rating, T.opening_hour,
    T.url, date_format(current_date(), 'yyyy-MM-dd'), NULL, 0
FROM(
    SELECT 
        K.cafe_name AS kakao_name,
        K.image_url AS image_url, 
        K.rating AS kakao_rating, 
        K.latitude AS latitude, 
        K.longitude AS longitude, 
        K.address AS address, 
        K.tel AS tel, 
        K.opening_hour AS opening_hour, 
        K.homepage_url AS url
    FROM kakao_cafe_info AS K
    LEFT JOIN cafe_info AS C ON K.cafe_name = C.kakao_name
    WHERE C.kakao_name IS NULL
) AS T;


-- cafe_info에 cafe_seq를 Overwrite
CREATE TABLE new_cafe_info AS
SELECT
    row_number() OVER () - 1 AS cafe_seq,
    name,
    latitude,
    longitude,
    kakao_name,
    naver_name,
    image_url,
    address,
    tel,
    rating,
    kakao_rating,
    opening_hour,
    url,
    updated_date,
    top_tag,
    is_deleted
FROM cafe_info;

INSERT OVERWRITE TABLE cafe_info
SELECT * FROM new_cafe_info;


-- overwrite 하기 위한 임시 테이블 제거
DROP TABLE new_cafe_info;


-- export csv
INSERT OVERWRITE LOCAL DIRECTORY '/home/jjh/A607/data/output/cafe_info/'
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
SELECT * FROM cafe_info;