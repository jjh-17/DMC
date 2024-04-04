/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutableRefObject, useEffect, useRef } from 'react';

declare global {
    interface Window {
        kakao: any;
    }
}

interface Props {
    address: string;
    name: string,
}

function Map(Props: Props) {
    const mapRef = useRef<HTMLElement | null>(null);

    const initMap = () => {
        const container = document.getElementById('map');
        const options = {
            center: new window.kakao.maps.LatLng(37.483034, 126.902435),
            level: 4,
        };

        const map = new window.kakao.maps.Map(container as HTMLElement, options);

        (mapRef as MutableRefObject<any>).current = map;
        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(Props.address, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
                
                const coords = new kakao.maps.LatLng(parseFloat(result[0].y), parseFloat(result[0].x));

                const addMarker = (position:any) => {
                    const marker = new kakao.maps.Marker({
                        position: position
                    });
                    // 마커가 지도 위에 표시되도록 설정합니다
                    marker.setMap(map);
                }
                // 현재위치 (나중에)
                addMarker(new kakao.maps.LatLng(37.693145, 127.334982))
                addMarker(coords);
                map.setCenter(coords);

            }
        })
    };

    useEffect(() => {
        window.kakao.maps.load(() => initMap());
    }, [mapRef]);

    return <div id="map" className='w-[80lvw] h-[80lvw] md:w-[60lvw] md:h-[60lvw] lg:w-[40lvw] lg:h-[40lvw] mx-auto my-10'></div>;
}

export default Map;