/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import { authAxios } from "./AuthCommon";

const END_POINT = "members";

export const memberAPI = {
    getMemberInfo(memberId: number): Promise<AxiosResponse> {
        return authAxios({
            method: "GET",
            url: `${END_POINT}/${memberId}`,
        });
    },
    getMyInfo(): Promise<AxiosResponse> {
        return authAxios({
            method: "GET",
            url: `${END_POINT}/mypage`,
        });
    },
    checkMyNickname(nickname: string): Promise<AxiosResponse> {
        return authAxios({
            method: "POST",
            url: `${END_POINT}/nickname`,
            data: {
                "nickname": nickname
            }
        });
    },
    modifyMyNickname(nickname: string, able:boolean): Promise<AxiosResponse> {
        return authAxios({
            method: "PATCH",
            url: `${END_POINT}/nickname`,
            data: {
                "nickname": nickname,
                "able": able,
              },
        });
    },
    submitTestResult(tags: string[]): Promise<AxiosResponse> {
        return authAxios({
            method: "POST",
            url: `${END_POINT}/test`,
            data: {
                "resultTag": tags,
            }
        });
    },
    changeMyProfilePic(updatedFormdata:any): Promise<AxiosResponse> {
        return authAxios({
            method: "PATCH",
            url: `${END_POINT}/profile`,
            data: updatedFormdata,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    changeMyTitle(title:string): Promise<AxiosResponse> {
        return authAxios({
            method: "PATCH",
            url: `${END_POINT}/achievement`,
            data: {
                "title" : title
            }
            
        });
    },
}