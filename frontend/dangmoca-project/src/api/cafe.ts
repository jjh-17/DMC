import { AxiosResponse } from "axios";
import { defaultAxios } from "./AuthCommon";

let latitude = 0;
let longitude = 0;
// TODO : getLocation 뺀뒤에 store로 관리
const getLocation = () => navigator.geolocation.getCurrentPosition((position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
});

const END_POINT = '/cafes'

const cafeAPI = {
    getCafeList():Promise<AxiosResponse> {
        getLocation(); 
        return defaultAxios({
            method: 'GET',
            url: END_POINT + `?longitude=${longitude}&latitude=${latitude}`
        })
    },

    getCafeRecommendList():Promise<AxiosResponse> {
        getLocation();
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

export default cafeAPI;