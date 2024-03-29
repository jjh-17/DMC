import { AxiosResponse } from "axios";
import { defaultAxios } from "./AuthCommon";

const latitude = 37.501271677039064;
const longitude = 127.03960465624748;
// TODO : getLocation 뺀뒤에 store로 관리
// const getLocation = () => navigator.geolocation.getCurrentPosition((position) => {
//     latitude = position.coords.latitude;
//     longitude = position.coords.longitude;
// });

const END_POINT = '/cafes'

export const cafeAPI = {
    getCafeList(curPage: number): Promise<AxiosResponse> {
        // getLocation(); 
        return defaultAxios({
            method: 'GET',
            url: END_POINT + `?latitude=${latitude}&longitude=${longitude}&page=${curPage}`
        })
    },

    getCafeSearchList(curPage: number, keyword: string): Promise<AxiosResponse> {
        // getLocation(); 
        return defaultAxios({
            method: 'GET',
            url: END_POINT + `?keyword=${keyword}&longitude=${longitude}&latitude=${latitude}&page=${curPage}`
        })
    },

    getCafeRecommendList(): Promise<AxiosResponse> {
        // getLocation();
        return defaultAxios({
            method: 'GET',
            url: END_POINT + `?longitude=${longitude}&latitude=${latitude}`
        })
    },

    getCafeDetail(id: number): Promise<AxiosResponse> {
        return defaultAxios({
            method: 'GET',
            url: END_POINT + "/" + id
        })
    },

    getCafeMenu(id: number): Promise<AxiosResponse> {
        return defaultAxios({
            method: 'GET',
            url: END_POINT + "/" + id + '/menus'
        })
    },

    doBookmark(cafeId: number): Promise<AxiosResponse> {
        return defaultAxios({
            method: 'POST',
            url: END_POINT + "/" + cafeId + '/bookmark'
        })
    },

    deleteBookmark(cafeId: number): Promise<AxiosResponse> {
        return defaultAxios({
            method: 'DELETE',
            url: END_POINT + "/" + cafeId + '/bookmark'
        })
    },

    getBookmark(page: number): Promise<AxiosResponse> {
        return defaultAxios({
            method: 'GET',
            url: END_POINT + `/bookmark?page=${page}`
        })
    },

    getCafeByTag(): Promise<AxiosResponse> {
        return defaultAxios({
            method: 'GET',
            url: `${END_POINT}/mytag?latitude=${latitude}&longitude=${longitude}`
        });
    },

    getCafeByInfo(): Promise<AxiosResponse> {
        return defaultAxios({
            method: 'GET',
            url: `${END_POINT}/myinfo?latitude=${latitude}&longitude=${longitude}`
        });
    },
    
    getCafeByRating(): Promise<AxiosResponse> {
        return defaultAxios({
            method: 'GET',
            url: `${END_POINT}/myrating?latitude=${latitude}&longitude=${longitude}`
        });
    },
}