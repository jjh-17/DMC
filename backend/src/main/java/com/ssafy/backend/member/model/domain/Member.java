package com.ssafy.backend.member.model.domain;

import com.ssafy.backend.global.util.GlobalUtil;
import com.ssafy.backend.member.model.vo.GetMemberInformationVo;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Builder
@Getter
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    Long memberSeq;

    @Column
    String memberCode;

    @Column
    Character type;

    @Column
    @Nullable
    @Setter
    String imageUrl;

    @Column
    @Setter
    String nickname;

    @Column
    Integer mileage;

    @Column
    @Nullable
    @Setter
    String preferenceTag;

    @Column
    @Nullable
    @Setter
    String title;

    @Column
    @ColumnDefault("0")
    long adCount;

    @Column
    @Setter
    boolean isDeleted;

    public Member() {
    }

    public Member(Long memberSeq, String memberCode, Character type, @Nullable String imageUrl, String nickname, Integer mileage, @Nullable String preferenceTag, @Nullable String title, long adCount, boolean isDeleted) {
        this.memberSeq = memberSeq;
        this.memberCode = memberCode;
        this.type = type;
        this.imageUrl = imageUrl;
        this.nickname = nickname;
        this.mileage = mileage;
        this.preferenceTag = preferenceTag;
        this.title = title;
        this.adCount = adCount;
        this.isDeleted = isDeleted;
    }

    public GetMemberInformationVo toInformationVo() {
        return new GetMemberInformationVo(this.memberSeq, this.nickname, this.imageUrl, this.title, GlobalUtil.tagsToList(this.preferenceTag), this.mileage, this.isDeleted);
    }

    public Member addAdCount(){
        this.adCount += 1;
        return this;
    }
}
