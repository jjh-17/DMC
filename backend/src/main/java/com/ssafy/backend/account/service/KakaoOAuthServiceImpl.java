package com.ssafy.backend.account.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.ssafy.backend.global.exception.BaseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

import static com.ssafy.backend.global.response.BaseResponseStatus.LOGIN_FAIL;
import static com.ssafy.backend.global.response.BaseResponseStatus.OOPS;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class KakaoOAuthServiceImpl implements OAuthService {
    @Value("${kakao.rest-api-key}")
    private String REST_API_KEY;

    @Value("${kakao.redirect.url}")
    private String redirectURL;

    @Override
    public String getToken(String code) {
        String access_Token = "";
        String refresh_Token = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";
        log.info("2 kakao oauth service 들어옴");

        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id="); // TODO REST_API_KEY 입력
            sb.append(REST_API_KEY);
            sb.append("&redirect_uri="); // TODO 인가코드 받은 redirect_uri 입력
            sb.append(redirectURL);
            sb.append("&code=" + code);
            bw.write(sb.toString());
            bw.flush();

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();

            if (responseCode != 200) {
                throw new BaseException(LOGIN_FAIL);
            }

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            access_Token = element.getAsJsonObject().get("access_token").getAsString();
            refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();

            br.close();
            bw.close();
        } catch (IOException e) {
            throw new BaseException(OOPS);
        }

        return access_Token;
    }

    @Override
    public String getUser(String token) {

        String reqURL = "https://kapi.kakao.com/v2/user/me";

        //access_token을 이용하여 사용자 정보 조회
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + token); //전송할 header 작성, access_token전송

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();

            if (responseCode != 200) {
                throw new BaseException(LOGIN_FAIL);
            }

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }

            //Gson 라이브러리로 JSON파싱
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            String id = element.getAsJsonObject().get("id").getAsString();

            br.close();

            return id;

        } catch (IOException e) {
            throw new BaseException(OOPS);
        }
    }
}
