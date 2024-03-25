package com.ssafy.backend.global.util;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.backend.global.exception.BaseException;
import io.lettuce.core.ScriptOutputType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

import static com.ssafy.backend.global.response.BaseResponseStatus.NOT_VALID_PHOTO;
import static com.ssafy.backend.global.response.BaseResponseStatus.OOPS;

@Component
public class S3UploadUtil {

    @Autowired
    private AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String uploadProfileImg(MultipartFile multipartFile, Long memberSeq) throws IOException {
        StringBuffer sb = new StringBuffer();
        sb.append("profile/").append(memberSeq).append("/").append(UUID.randomUUID());
        return upload(multipartFile, sb.toString());
    }

    public String uploadReviewImage(MultipartFile multipartFile, Long reviewSeq) throws IOException {
        StringBuffer sb = new StringBuffer();
        sb.append("review/").append(reviewSeq).append("/").append(UUID.randomUUID());
        return upload(multipartFile, sb.toString());
    }

    public String upload(MultipartFile multipartFile, String filePath) throws IOException {
        String contentType = multipartFile.getContentType();

        verifyExtension(multipartFile);
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getSize());
        metadata.setContentType(multipartFile.getContentType());

        filePath = filePath + "." + contentType.substring(contentType.lastIndexOf('/') + 1);
        amazonS3.putObject(bucket, filePath, multipartFile.getInputStream(), metadata);
        return amazonS3.getUrl(bucket, filePath).toString();

    }

    public void deleteImg(String url) {
        String filePath = url.substring(50);
        amazonS3.deleteObject(bucket, filePath);
    }

    public void verifyExtension(MultipartFile multipartFile) {
        String contentType = multipartFile.getContentType();

        if (ObjectUtils.isEmpty(contentType) ||
                (!contentType.contains("image/jpeg")
                        && !contentType.contains("image/png")
                        && !contentType.contains("image/jpg"))) {
            throw new BaseException(NOT_VALID_PHOTO);
        }
    }
}
