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

const CafeFilterAndSort = (Cafes: Cafe[],
    Sort: string[],
    Tags: string[],
    Desserts: string[],
    ) => {
    let sortedCafe = [...Cafes];

    if (Tags.length > 0) {
        // 태그 포함한 카페만 filter
        sortedCafe = sortedCafe.filter((cafe) => {
            return Tags.every(tag => cafe.tag.includes(tag));
        })
    }

    if (Desserts.length > 0) {
        // 디저트 포함 카페만 filter
        sortedCafe = sortedCafe.filter((cafe) => {
            return Desserts.every(dessert => cafe.tag.includes(dessert));
        })
    }

    if (Sort.length > 0) {
        // 영업중
        if (Sort.includes("isOpen")) {
            sortedCafe = sortedCafe.filter((cafe) => {
                return cafe.isOpen;
            })
        }
        // 거리순
        if (Sort.includes("distance")) {
            sortedCafe.sort((cafeA, cafeB) => {
                return parseFloat(cafeA.distance) - parseFloat(cafeB.distance);
            })
        }
    }

    console.log(sortedCafe)

    return sortedCafe;


}

export default CafeFilterAndSort;