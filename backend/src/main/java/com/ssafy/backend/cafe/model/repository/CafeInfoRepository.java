package com.ssafy.backend.cafe.model.repository;

import com.ssafy.backend.cafe.model.domain.CafeInfo;
import com.ssafy.backend.cafe.model.mapping.CafeBookmarkListMapping;
import com.ssafy.backend.cafe.model.mapping.CafeListMapping;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CafeInfoRepository extends JpaRepository<CafeInfo, Long> {

    String listDefaultQuery =
            "SELECT c.cafe_seq, c.name, c.address, c.image_url, c.opening_hour, c.top_tag, " +
                    "ST_DISTANCE_SPHERE(ST_GEOMFROMTEXT(CONCAT('POINT(', :latitude, ' ', :longitude, ')'), 4326), ST_GEOMFROMTEXT(CONCAT('POINT(', c.latitude, ' ', c.longitude, ')'), 4326)) as distance " +
                    "FROM cafe_info c ";

    String whereQuery = "WHERE ST_DISTANCE_SPHERE(ST_GEOMFROMTEXT(CONCAT('POINT(', :latitude, ' ', :longitude, ')'), 4326), ST_GEOMFROMTEXT(CONCAT('POINT(', c.latitude, ' ', c.longitude, ')'), 4326)) <= 500 " +
            "AND c.is_deleted = false ";

    String searchByNameQuery = "AND c.name LIKE :keyword ";

    String searchByAddrQuery = "AND c.address LIKE :keyword ";

    String orderQuery = "ORDER BY distance";

    @Query(nativeQuery = true, value = listDefaultQuery + whereQuery + orderQuery)
    Page<CafeListMapping> findAllIn500mOrderByDistance(@Param("latitude") double latitude, @Param("longitude") double longitude, Pageable pageable);

    @Query(nativeQuery = true, value = listDefaultQuery + whereQuery + searchByNameQuery + " UNION " + listDefaultQuery + searchByAddrQuery + orderQuery)
    Page<CafeListMapping> findAllIn500mLikeKeywordOrderByDistance(@Param("latitude") double latitude, @Param("longitude") double longitude, @Param("keyword") String keyword, Pageable pageable);

    CafeBookmarkListMapping findByCafeSeq(Long cafeSeq);

    @Query(nativeQuery = true, value = listDefaultQuery + whereQuery + orderQuery)
    List<CafeListMapping> findAllIn500mOrderByDistance(@Param("latitude") double latitude, @Param("longitude") double longitude);

    @Query(nativeQuery = true, value = listDefaultQuery + " WHERE c.cafe_seq = :cafeSeq AND c.is_deleted = false ")
    CafeListMapping findByCafeSeqAndDistance(@Param("cafeSeq") Long cafeSeq, @Param("latitude") double latitude, @Param("longitude") double longitude);

}
