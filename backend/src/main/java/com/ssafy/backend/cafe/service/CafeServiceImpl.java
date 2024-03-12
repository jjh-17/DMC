package com.ssafy.backend.cafe.service;


import com.ssafy.backend.cafe.model.domain.TagCount;
import com.ssafy.backend.cafe.model.dto.ListCafeDto;
import com.ssafy.backend.cafe.model.mapping.DessertTagMapping;
import com.ssafy.backend.cafe.model.mapping.ListCafeMapping;
import com.ssafy.backend.cafe.model.repository.CafeInfoRepository;
import com.ssafy.backend.cafe.model.repository.CafeMenuRepository;
import com.ssafy.backend.cafe.model.repository.TagCountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CafeServiceImpl implements CafeService {

    @Autowired
    CafeInfoRepository cafeInfoRepository;

    @Autowired
    CafeMenuRepository cafeMenuRepository;

    @Autowired
    TagCountRepository tagCountRepository;

    @Override
    public Page<ListCafeMapping> cafeList(ListCafeDto listCafeDto, Pageable pageable) {
        return cafeInfoRepository.findAllIn500mOrderByDistance(listCafeDto.getLatitude(), listCafeDto.getLongitude(), pageable);
    }

    @Override
    public List<String> getDessertTag(Long cafeSeq) {
        List<DessertTagMapping> dessertTagMappingList = cafeMenuRepository.findAllDistinctDessertTagByCafeSeq(cafeSeq);

        if (dessertTagMappingList.isEmpty()) {
            return null;
        }

        return dessertTagMappingList.stream()
                .map(DessertTagMapping::getDessertTag)
                .toList();
    }

    @Override
    public List<String> getCafeTag(Long cafeSeq) {
        TagCount dmcTagCount = tagCountRepository.findByCafeSeqAndOwn(cafeSeq, true);

        if (dmcTagCount == null) {
            return null;
        }

        Map<String, Integer> tagCount = new HashMap<>();

        tagCount.put("tag1", Integer.parseInt(dmcTagCount.getTag1()));
        tagCount.put("tag2", Integer.parseInt(dmcTagCount.getTag2()));
        tagCount.put("tag3", Integer.parseInt(dmcTagCount.getTag3()));
        tagCount.put("tag4", Integer.parseInt(dmcTagCount.getTag4()));

        // Map의 값을 내림차순으로 정렬하고 상위 3개의 키를 추출한 List
        return tagCount.entrySet()
                .stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                .limit(3)
                .map(Map.Entry::getKey)
                .toList();
    }

}
