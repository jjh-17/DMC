/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import { authAxios } from "./AuthCommon";

const END_POINT = "members";

export const memberAPI = {
    getMemberInfo(memberId: number): Promise<AxiosResponse> {
        return authAxios({
            method: "GET",
            url: END_POINT + memberId,
        });
    },
    getMyInfo(): Promise<AxiosResponse> {
        return authAxios({
            method: "GET",
            url: END_POINT + 'mypage',
        });
    },
    checkMyNickname(nickname: string): Promise<AxiosResponse> {
        return authAxios({
            method: "POST",
            url: END_POINT + 'nickname',
            params: {
                "nickname": nickname
            }
        });
    },
    modifyMyNickname(nickname: string): Promise<AxiosResponse> {
        return authAxios({
            method: "GET",
            url: END_POINT + 'mypage',
            params: {
                "nickname": nickname,
                "able": true,
              },
        });
    },
    submitTestResult(tags: string[]): Promise<AxiosResponse> {
        return authAxios({
            method: "POST",
            url: END_POINT + 'test',
            data: {
                "resultTag": tags,
            }
        });
    },
    // changeMyProfilePic(ProfilePic:any): Promise<AxiosResponse> {
    //     return authAxios({
    //         method: "GET",
    //         url: END_POINT + 'mypage',
    //     });
    // },

}