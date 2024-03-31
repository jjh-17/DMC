use A607;


-- 네이버 정보를 가지지 않은 카페에 대하여 카카오 메뉴 정보 추가
TRUNCATE TABLE cafe_menu;
INSERT INTO 
    cafe_menu(cafe_seq, dessert_tag, image_url, name, price)
SELECT
    C.cafe_seq,
    K.dessert_tag,
    K.image_url,
    K.name,
    K.price
FROM
    kakao_cafe_menu AS K
    LEFT JOIN cafe_info AS C ON K.cafe_name = C.kakao_name
    WHERE 
        C.naver_name IS NULL AND
        C.cafe_seq IS NOT NULL AND
        K.name IS NOT NULL AND K.name!='NULL';


-- 네이버 정보를 가진 카페에 대하여 네이버 메뉴 정보 추가
INSERT INTO 
    cafe_menu(cafe_seq, dessert_tag, image_url, name, price)
SELECT
    C.cafe_seq,
    N.dessert_tag,
    N.image_url,
    N.name,
    N.price
FROM
    naver_cafe_menu AS N
    LEFT JOIN cafe_info AS C ON N.cafe_name = C.naver_name
    WHERE 
        C.naver_name IS NOT NULL AND
        C.cafe_seq IS NOT NULL AND
        N.name IS NOT NULL AND N.name!='NULL';

-- cafe_info에 cafe_seq를 Overwrite
CREATE TABLE new_cafe_menu AS
SELECT
    row_number() OVER () + 100 AS menu_seq,
    cafe_seq, 
    CASE WHEN dessert_tag = 'NULL' THEN NULL ELSE dessert_tag END,
    CASE WHEN image_url = 'NULL' THEN NULL ELSE image_url END,
    name, 
    CASE WHEN price = 'NULL' THEN NULL ELSE price END
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