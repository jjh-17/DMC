export interface Cafe {
    cafeSeq: number;
    name: string;
    distance: string;
    address: string;
    tag: string[];
    isOpen: boolean;
    dessertTag: string[];
    imageUrl: string;
}

export interface CafeDetail {
    cafeSeq: number;
    name: string;
    distance: string;
    address: string;
    tag: string[];
    imageUrl: string;
    homepageUrl: string;
    rating: number;
    isBookmarked: boolean;
    updatedDate: string;
    openingHour: string;
}

export interface CafeMenu {
    name: string;
    price: number;
    imageUrl: string;
}

export interface infoProps {
    imgUrl: string,
    imgAlt: string,
    title: string,
    description: string
}

export interface History {
    index: number;
    keyword: string;
    datetime: Date;
}

export interface UserInfo {
    memberSeq: number,
    nickname: string, 
    profileImageUrl: string,
    title: string,
    titleList: string[],
    mileage: number,
    preferenceTag: string[],
    deleted: boolean,
}