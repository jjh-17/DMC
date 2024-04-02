export const sort: { [key: string]: string | number }[] = 
[{ "거리순": "distance" }, { "영업중": "isOpen" }];

export const tags: { [key: string]: string | number }[] = [
    { "공부": "cagong" },
    { "데이트": "date" },
    { "SNS픽": "snspick" },
    { "가성비": "reasonable" },
    { "대형카페": "large" },
    { "아기자기": "petit" },
    { "커피": "coffee" }, 
    { "디저트": "dessert" },
    { "조용한": "calm" },
    { "야외": "outdoor" },
    { "분위기": "mood" },
    { "귀여운": "cute" },
    { "편안한": "cozy" },
    { "뷰": "view" },
];

export const questionForTags: { [key: string]: string | number }[] = [
    { "공부하기 좋은 카페": "cagong" },
    { "데이트하고 싶은 카페": "date" },
    { "SNS픽 카페": "snspick" },
    { "가성비 좋은 카페": "reasonable" },
    { "넓고 큰 카페": "large" },
    { "작은 개인 카페": "petit" },
    { "커피가 맛있는 카페": "coffee" },
    { "디저트가 맛있는 카페": "dessert" },
    { "조용한 카페": "calm" },
    { "분위기 있는 카페": "mood" },
    { "야외가 있는 카페": "outdoor" },
    { "귀여운 분위기의 카페": "cute" },
    { "편안한 동네 카페": "cozy" },
    { "전망이 멋진 카페": "view" },
];


// 추후 수정가능
export const desserts = [
    { "마카롱": "macaron" },
    { "케이크": "cake" },
    { "브라우니" : "brownie"},
    { "크레페" : "crape"},
    { "치즈케이크" : "cheesecake" },
];

const tagMap = new Map();
tags.map((tag) => {
    tagMap.set(Object.values(tag)[0], Object.keys(tag)[0])
})

export const tagMapper = tagMap;

