use A607;


-- 네이버 정보를 가지지 않은 카페에 대하여 카카오 메뉴 정보 추가
TRUNCATE TABLE cafe_menu;
INSERT INTO 
    cafe_menu(
        cafe_seq, name, price, image_url, dessert_tag
    )
SELECT
    C.cafe_seq,
    K.name,
    K.price,
    K.image_url,
    K.dessert_tag
FROM
    kakao_cafe_menu AS K
    LEFT JOIN cafe_info AS C ON K.cafe_name = C.kakao_name
    WHERE C.naver_name IS NULL;


-- 네이버 정보를 가진 카페에 대하여 네이버 메뉴 정보 추가
INSERT INTO 
    cafe_menu(
        cafe_seq, name, price, image_url, dessert_tag
    )
SELECT
    C.cafe_seq,
    N.name,
    N.price,
    N.image_url,
    N.dessert_tag
FROM
    naver_cafe_menu AS N
    LEFT JOIN cafe_info AS C ON N.cafe_name = C.naver_name
    WHERE C.naver_name IS NOT NULL;


-- cafe_info에 cafe_seq를 Overwrite
CREATE TABLE new_cafe_menu AS
SELECT
    row_number() OVER () - 1 AS menu_seq,
    cafe_seq, 
    name, 
    price, 
    image_url, 
    dessert_tag
FROM cafe_menu;

INSERT OVERWRITE TABLE cafe_menu
SELECT * FROM new_cafe_menu;


-- overwrite 하기 위한 임시 테이블 제거
DROP TABLE new_cafe_menu;

-- export csv
INSERT OVERWRITE LOCAL DIRECTORY '/home/jjh/A607/data/output/cafe_menu/'
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
SELECT * FROM cafe_menu;