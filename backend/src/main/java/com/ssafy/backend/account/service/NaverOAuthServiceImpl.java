package com.ssafy.backend.account.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.ssafy.backend.global.exception.BaseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

import static com.ssafy.backend.global.response.BaseResponseStatus.OOPS;

@Service
public class NaverOAuthServiceImpl implements OAuthService {
    @Value("${naver.client-id}")
    private String CLIENT_ID;

    @Value("${naver.client-secret}")
    private String CLIENT_SECRET;

    @Value("${naver.redirect.url}")
    private String redirectURL;

    @Value("${naver.state}")
    private String state;

    @Override
    public String getToken(String code) {
        String accessToken = "";
        String refreshToken = "";
        String reqUrl = "https://nid.naver.com/oauth2.0/token?";

        try {
            URL url = new URL(reqUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=");
            sb.append(CLIENT_ID);
            sb.append("&client_secret=");
            sb.append(CLIENT_SECRET);
            sb.append("&redirect_uri=");
            sb.append("&code=");
            sb.append(code);
            sb.append("&state=");
            sb.append(state);
            bw.write(sb.toString());
            bw.flush();

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
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

            accessToken = element.getAsJsonObject().get("access_token").getAsString();
            refreshToken = element.getAsJsonObject().get("refresh_token").getAsString();

            br.close();
            bw.close();
        } catch (IOException e) {
            throw new BaseException(OOPS);
        }

        return accessToken;
    }

    @Override
    public String getUser(String accessToken) {
        String reqUrl = "https://openapi.naver.com/v1/nid/me";

        //access_token을 이용하여 사용자 정보 조회
        try {
            URL url = new URL(reqUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + accessToken); //전송할 header 작성, access_token전송

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();

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

            String id = element.getAsJsonObject().get("response").getAsJsonObject().get("id").getAsString();

            br.close();

            return id;
        } catch (IOException e) {
            throw new BaseException(OOPS);
        }
    }
}
