import { defaultAxios } from "./AuthCommon";
// import { authAxios } from "./AuthCommon";

interface Cafe {
    cafeSeq: number;
    name: string;
    distance: string;
    address: string;
    tag: string[];
    isOpen: boolean;
    dessertTag: string[];
    imageUrl: string;
}

let latitude = 0;
let longitude = 0;

const getLocation = () => navigator.geolocation.getCurrentPosition((position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
});

export const getCafeList = async () => {
    getLocation(); 
    try {
        const response = await defaultAxios.get(`/cafes?longitude=${longitude}&latitude=${latitude}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cafe list:', error);
        return [];
    }
};

export const getCafeRecommendList = async () => {
    getLocation();
    try {
        const response = await defaultAxios.get(`/cafes?longitude=${longitude}&latitude=${latitude}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getCafeDetail = async (id: number) => {
    try {
        const response = await defaultAxios.get(`/cafes/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
