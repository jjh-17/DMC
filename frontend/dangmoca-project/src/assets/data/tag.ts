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
    { "공부하기 좋은 한적한 카페": "cagong" },
    { "데이트하기 좋은 식당": "date" },
    { "SNS에서 인기 많은 장소": "snspick" },
    { "가성비 좋은 음식점": "reasonable" },
    { "대규모 모임에 적합한 장소": "large" },
    { "아늑하고 독특한 분위기의 카페": "petit" },
    { "퀄리티 높은 커피 제공": "coffee" },
    { "다양하고 맛있는 디저트": "dessert" },
    { "조용하고 평화로운 분위기": "calm" },
    { "분위기 있는 장소": "mood" },
    { "야외에서 즐길 수 있는 장소": "outdoor" },
    { "귀여운 분위기의 장소": "cute" },
    { "편안하고 아늑한 분위기": "cozy" },
    { "환상적인 전망을 감상할 수 있는 장소": "view" },
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

