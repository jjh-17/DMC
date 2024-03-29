-- hive -f /home/jjh/A607/sql/cafe_menu_init_data.sql

use A607;

-- 네이버 메뉴
INSERT INTO 
    cafe_menu(cafe_seq, name, price, image_url, dessert_tag)
SELECT
    cafe_seq, name, price, image_url, dessert_tag
FROM
    naver_cafe_menu AS N
    LEFT JOIN
    cafe_info AS C
    ON N.cafe_name = C.naver_name






SELECT
    C.cafe_seq, N.cafe_name, C.name, C.naver_name, N.name
FROM
    naver_cafe_menu AS N
    INNER JOIN cafe_info AS C ON N.cafe_name = C.naver_name
    WHERE C.naver_name IS NOT NULL;


-- 카카오 메뉴


-- 




SELECT name, COUNT(*)
FROM CAFE_INFO
GROUP BY name
HAVING COUNT(*) > 1;