package com.ssafy.backend.cafe.service;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.cafe.model.domain.CafeInfo;
import com.ssafy.backend.cafe.model.dto.ListCafeDto;
import com.ssafy.backend.cafe.model.repository.CafeInfoRepository;
import com.ssafy.backend.cafe.model.repository.CafeMenuRepository;
import com.ssafy.backend.cafe.model.vo.ListCafeVo;
import com.ssafy.backend.global.exception.BaseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import static com.ssafy.backend.global.response.BaseResponseStatus.CONVERT_REGION_CODE_ERROR;

@Service
public class CafeServiceImpl implements CafeService {

    @Autowired
    CafeInfoRepository cafeInfoRepository;

    @Autowired
    CafeMenuRepository cafeMenuRepository;

    @Value("${kakao.restapi.key}")
    private String KAKAO_API_KEY;

    @Override
    public List<ListCafeVo> cafeList(ListCafeDto listCafeDto, Pageable pageable) {
        List<ListCafeVo> list = new ArrayList<>();

        String regionCode = coordToRegionCode(listCafeDto.getLatitude(), listCafeDto.getLongitude());

        System.out.println("regionCode = " + regionCode);

        if (regionCode.isEmpty()) {
            throw new BaseException(CONVERT_REGION_CODE_ERROR);
        }

        Page<CafeInfo> cafeInfoList = cafeInfoRepository.findAllByRegionCodeAndIsDeletedFalse(regionCode, pageable);
        for (CafeInfo cafeInfo : cafeInfoList) {
            // 현 위치에서 카페까지 거리 구해서 500m 초과하면 결과에 추가하지 않음
            double distance = calculateDistance(listCafeDto.getLatitude(), listCafeDto.getLongitude(), cafeInfo.getLatitude(), cafeInfo.getLongitude());
            if (distance > 0.5) {
                continue;
            }

            // Todo : 상위 3개 태그 리스트랑 디저트 리스트 추가하기
            List<String> tagList = new ArrayList<>();
            List<String> dessertTag = new ArrayList<>();

            // Todo : 영업 시간 보고 영업 중 여부 계산해서 넣기(영업시간 없으면 null로 return)
            Boolean isOpen = null;

            ListCafeVo listCafeVo = new ListCafeVo(cafeInfo.getCafeSeq(), cafeInfo.getName(), cafeInfo.getAddress(), cafeInfo.getImageUrl(), distance, tagList, dessertTag, isOpen);

            list.add(listCafeVo);
        }

        return list;
    }

    // 위경도로 법정동코드 불러오는 메소드
    private String coordToRegionCode(double latitude, double longitude) {
        String url = "https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=" + longitude + "&y=" + latitude;
        try {
            return getCodeForRegionType(getJSONData(url));
        } catch (Exception e) {
            throw new BaseException(CONVERT_REGION_CODE_ERROR);
        }
    }

    // 법정동 코드 불러오는 api 호출 후 response json을 string으로 반환하는 메소드
    private String getJSONData(String apiUrl) throws Exception {
        HttpURLConnection conn = null;
        StringBuilder response = new StringBuilder();

        //인증키
        String auth = "KakaoAK " + KAKAO_API_KEY;

        //URL 설정
        URL url = new URL(apiUrl);

        conn = (HttpURLConnection) url.openConnection();

        //Request 형식 설정
        conn.setRequestMethod("GET");
        conn.setRequestProperty("X-Requested-With", "curl");
        conn.setRequestProperty("Authorization", auth);

        //request에 JSON data 준비
        conn.setDoOutput(true);

        //보내고 결과값 받기
        int responseCode = conn.getResponseCode();
        if (responseCode == 200) { // 성공 후 응답 JSON 데이터받기
            Charset charset = StandardCharsets.UTF_8;
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), charset));

            String inputLine;
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
        } else {
            throw new BaseException(CONVERT_REGION_CODE_ERROR);
        }

        return response.toString();
    }

    // json string에서 법정동 코드만 뽑는 메소드
    private String getCodeForRegionType(String jsonString) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(jsonString);

            JsonNode documentsNode = rootNode.path("documents");
            for (JsonNode documentNode : documentsNode) {
                String regionType = documentNode.path("region_type").asText();
                if ("B".equals(regionType)) {
                    return documentNode.path("code").asText();
                }
            }
        } catch (Exception e) {
            throw new BaseException(CONVERT_REGION_CODE_ERROR);
        }
        return null;
    }

    // 두 점의 위경도를 받아서 거리를 계산
    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        double EARTH_RADIUS_KM = 6371.0;

        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return Math.round(EARTH_RADIUS_KM * c * 100.0) / 100.0; // 소수점 두자리까지만
    }
}
