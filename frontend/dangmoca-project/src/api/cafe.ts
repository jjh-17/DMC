import { AxiosResponse } from "axios";
import { defaultAxios } from "./AuthCommon";

const latitude = 37.483034;
const longitude = 126.902435;
// TODO : getLocation 뺀뒤에 store로 관리
// const getLocation = () => navigator.geolocation.getCurrentPosition((position) => {
//     latitude = position.coords.latitude;
//     longitude = position.coords.longitude;
// });

const END_POINT = '/cafes'

export const cafeAPI = {
    getCafeList(curPage: number):Promise<AxiosResponse> {
        // getLocation(); 
        return defaultAxios({
            method: 'GET',
            url: END_POINT + `?latitude=${latitude}&longitude=${longitude}`
        })
    },

    getCafeSearchList(curPage: number, keyword: string):Promise<AxiosResponse> {
        // getLocation(); 
        return defaultAxios({
            method: 'GET',
            url: END_POINT + `?keyword=${keyword}&longitude=${longitude}&latitude=${latitude}&page=${curPage}`
        })
    },

    getCafeRecommendList():Promise<AxiosResponse> {
        // getLocation();
        return defaultAxios({
            method: 'GET',
            url: END_POINT + `?longitude=${longitude}&latitude=${latitude}`
        })
    },

    getCafeDetail(id: number):Promise<AxiosResponse> {
        return defaultAxios({
            method: 'GET',
            url: END_POINT + id
        })
    },

    getCafeMenu(id: number):Promise<AxiosResponse> {
        return defaultAxios({
            method: 'GET',
            url: END_POINT + id + '/menus'
        })
    },

    doBookmark(cafeId: number):Promise<AxiosResponse> {
        return defaultAxios({
            method: 'POST',
            url: END_POINT + cafeId + '/bookmarks'
        })
    },

    deleteBookmark(cafeId: number):Promise<AxiosResponse> {
        return defaultAxios({
            method: 'DELETE',
            url: END_POINT + cafeId + '/bookmarks'
        })
    },

    getBookmark(page: number):Promise<AxiosResponse> {
        return defaultAxios({
            method: 'POST',
            url: `bookmark?page=${page}`
        })
    },

    getCafeByTag():Promise<AxiosResponse> {
        return defaultAxios({
            method: 'GET',
            url: 'mytag'
        })
    },

    getCafeByInfo():Promise<AxiosResponse> {
        return defaultAxios({
            method: 'GET',
            url: 'myinfo'
        })
    },
    
    getCafeByRating():Promise<AxiosResponse> {
        return defaultAxios({
            method: 'GET',
            url: 'myrating'
        })
    },
}