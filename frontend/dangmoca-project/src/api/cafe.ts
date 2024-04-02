import { AxiosResponse } from "axios";
import { authAxios } from "./AuthCommon";

const latitude = localStorage.getItem('latitude') || 37.501271677039064;
const longitude = localStorage.getItem('longitude') || 127.03960465624748;
const END_POINT = '/cafes'

export const cafeAPI = {
    getCafeList(curPage: number): Promise<AxiosResponse> {
        return authAxios({
            method: 'GET',
            url: END_POINT + `?latitude=${latitude}&longitude=${longitude}&page=${curPage}`
        })
    },

    getCafeSearchList(curPage: number, keyword: string): Promise<AxiosResponse> {
        return authAxios({
            method: 'GET',
            url: END_POINT + `?keyword=${keyword}&longitude=${longitude}&latitude=${latitude}&page=${curPage}`
        })
    },

    getCafeRecommendList(): Promise<AxiosResponse> {
        return authAxios({
            method: 'GET',
            url: END_POINT + `?longitude=${longitude}&latitude=${latitude}`
        })
    },

    getCafeDetail(id: number): Promise<AxiosResponse> {
        return authAxios({
            method: 'GET',
            url: END_POINT + "/" + id
        })
    },

    getCafeMenu(id: number): Promise<AxiosResponse> {
        return authAxios({
            method: 'GET',
            url: END_POINT + "/" + id + '/menus'
        })
    },

    doBookmark(cafeId: number): Promise<AxiosResponse> {
        return authAxios({
            method: 'POST',
            url: END_POINT + "/" + cafeId + '/bookmark'
        })
    },

    deleteBookmark(cafeId: number): Promise<AxiosResponse> {
        return authAxios({
            method: 'DELETE',
            url: END_POINT + "/" + cafeId + '/bookmark'
        })
    },

    getBookmark(page: number): Promise<AxiosResponse> {
        return authAxios({
            method: 'GET',
            url: END_POINT + `/bookmark?page=${page}`
        })
    },

    getCafeByTag(): Promise<AxiosResponse> {
        return authAxios({
            method: 'GET',
            url: `${END_POINT}/mytag?latitude=${latitude}&longitude=${longitude}`
        });
    },

    getCafeByInfo(): Promise<AxiosResponse> {
        return authAxios({
            method: 'GET',
            url: `${END_POINT}/myinfo?latitude=${latitude}&longitude=${longitude}`
        });
    },
    
    getCafeByRating(): Promise<AxiosResponse> {
        return authAxios({
            method: 'GET',
            url: `${END_POINT}/myrating?latitude=${latitude}&longitude=${longitude}`
        });
    },
}