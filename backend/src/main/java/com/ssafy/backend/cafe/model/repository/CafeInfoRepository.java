package com.ssafy.backend.cafe.model.repository;

import com.ssafy.backend.cafe.model.domain.CafeInfo;
import com.ssafy.backend.cafe.model.mapping.ListCafeMapping;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CafeInfoRepository extends JpaRepository<CafeInfo, Long> {

    String listDefaultQuery =
            "SELECT c.cafe_seq, c.name, c.address, c.image_url, c.opening_hour, " +
                    "ST_DISTANCE_SPHERE(ST_GEOMFROMTEXT(CONCAT('POINT(', :latitude, ' ', :longitude, ')'), 4326), ST_GEOMFROMTEXT(CONCAT('POINT(', c.latitude, ' ', c.longitude, ')'), 4326)) as distance " +
                    "FROM cafe_info c " +
                    "WHERE ST_DISTANCE_SPHERE(ST_GEOMFROMTEXT(CONCAT('POINT(', :latitude, ' ', :longitude, ')'), 4326), ST_GEOMFROMTEXT(CONCAT('POINT(', c.latitude, ' ', c.longitude, ')'), 4326)) <= 500 " +
                    "AND c.is_deleted = false " +
                    "ORDER BY distance";

    @Query(nativeQuery = true, value = listDefaultQuery)
    Page<ListCafeMapping> findAllIn500mOrderByDistance(@Param("latitude") double latitude, @Param("longitude") double longitude, Pageable pageable);

}
