use A607;


-- 네이버와 카카오 카페에서 겹치는 것 INSERT(네이버 우선)
TRUNCATE TABLE cafe_info;
INSERT INTO
    cafe_info(
        address, homepage_url, image_url, is_deleted,
        kakao_name, kakao_rating, latitude, longitude, name, naver_name,
        opening_hour, rating, region_code, tel, top_tag, updated_date
    )
SELECT
    T.address, 
    T.homepage_url, 
    T.image_url, 
    0 AS is_deleted,
    T.kakao_name, 
    T.kakao_rating, 
    T.latitude, 
    T.longitude, 
    T.naver_name AS name, 
    T.naver_name,
    T.opening_hour, 
    NULL AS rating, 
    NULL AS region_code, 
    T.tel, 
    NULL AS top_tag, 
    date_format(current_date(), 'yyyy-MM-dd') AS updated_date
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
        N.homepage_url AS homepage_url
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
        WHERE 
            K.cafe_name IS NOT NULL AND K.cafe_name!='NULL' AND
            N.cafe_name IS NOT NULL AND N.cafe_name!='NULL' AND
            N.latitude IS NOT NULL AND N.latitude!=-1 AND
            N.longitude IS NOT NULL AND N.longitude!=-1 AND
            N.address IS NOT NULL AND N.address!='NULL'
) AS T;


-- 통합 카페 정보에 없으면서 네이버 카페에 있는 것 INSERT
INSERT INTO
    cafe_info(
        address, homepage_url, image_url, is_deleted,
        kakao_name, kakao_rating, latitude, longitude, name, naver_name,
        opening_hour, rating, region_code, tel, top_tag, updated_date
    )
SELECT
    T.address, 
    T.homepage_url, 
    T.image_url, 
    0 AS is_deleted,
    NULL AS kakao_name, 
    NULL AS kakao_rating, 
    T.latitude, 
    T.longitude, 
    T.naver_name AS name, 
    T.naver_name,
    T.opening_hour, 
    NULL AS rating, 
    NULL AS region_code, 
    T.tel, 
    NULL AS top_tag, 
    date_format(current_date(), 'yyyy-MM-dd') AS updated_date
FROM(
    SELECT
        N.cafe_name AS naver_name, 
        N.image_url AS image_url,
        N.latitude AS latitude, 
        N.longitude AS longitude, 
        N.address AS address, 
        N.tel AS tel, 
        N.opening_hour AS opening_hour, 
        N.homepage_url AS homepage_url
    FROM naver_cafe_info AS N
    LEFT JOIN cafe_info AS C ON N.cafe_name = C.naver_name
    WHERE 
        C.naver_name IS NULL AND
        N.cafe_name IS NOT NULL AND N.cafe_name!='NULL' AND
        N.latitude IS NOT NULL AND N.latitude!=-1 AND
        N.longitude IS NOT NULL AND N.longitude!=-1 AND
        N.address IS NOT NULL AND N.address!='NULL'
) AS T;


-- 통합 카페 정보에 없으면서 카카오 카페에 있는 것 INSERT
INSERT INTO
    cafe_info(
        address, homepage_url, image_url, is_deleted,
        kakao_name, kakao_rating, latitude, longitude, name, naver_name,
        opening_hour, rating, region_code, tel, top_tag, updated_date
    )
SELECT
    T.address, 
    T.homepage_url, 
    T.image_url, 
    0 AS is_deleted,
    T.kakao_name,
    T.kakao_rating,
    T.latitude, 
    T.longitude, 
    T.kakao_name AS name, 
    NULL AS naver_name,
    T.opening_hour, 
    NULL AS rating, 
    NULL AS region_code, 
    T.tel, 
    NULL AS top_tag, 
    date_format(current_date(), 'yyyy-MM-dd') AS updated_date
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
        K.homepage_url AS homepage_url
    FROM kakao_cafe_info AS K
    LEFT JOIN cafe_info AS C ON K.cafe_name = C.kakao_name
    WHERE 
        C.kakao_name IS NULL AND
        K.cafe_name IS NOT NULL AND K.cafe_name!='NULL' AND
        K.latitude IS NOT NULL AND K.latitude!=-1 AND
        K.longitude IS NOT NULL AND K.longitude!=-1 AND
        K.address IS NOT NULL AND K.address!='NULL'
) AS T;


-- cafe_info에 cafe_seq를 Overwrite
CREATE TABLE new_cafe_info AS
SELECT
    row_number() OVER () + 100 AS cafe_seq,
    address, 
    CASE WHEN homepage_url = 'NULL' THEN NULL ELSE homepage_url END,
    CASE WHEN image_url = 'NULL' THEN NULL ELSE image_url END,
    is_deleted,
    CASE WHEN kakao_name = 'NULL' THEN NULL ELSE kakao_name END,
    CASE WHEN kakao_rating = 'NULL' THEN NULL ELSE kakao_rating END,
    latitude, 
    longitude, 
    CASE WHEN name = 'NULL' THEN NULL ELSE name END,
    CASE WHEN naver_name = 'NULL' THEN NULL ELSE naver_name END,
    CASE WHEN opening_hour = 'NULL' THEN NULL ELSE opening_hour END,
    rating, 
    region_code, 
    CASE WHEN tel = 'NULL' THEN NULL ELSE tel END,
    top_tag,
    updated_date
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