/**
 * @description 카카오맵을 렌더링하는 함수
 * @param mapContainerId {string} 카카오맵을 렌더링할 DOM의 id
 * @param latitude {number} 지도의 중심좌표로 설정될 위도
 * @param longtitude {number} 지도의 중심좌표로 설정될 경도
 * @param mapLevel {number} 지도의 확대, 축소 정도
 * @returns {kakao.maps.Map} 카카오맵 객체
 */
function renderKakaoMap(mapContainerId, latitude, longtitude, mapLevel) {
  const container = document.getElementById(mapContainerId); //지도를 담을 영역의 DOM 레퍼런스
  const options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(latitude, longtitude), //지도의 중심좌표.
    level: mapLevel, //지도의 레벨(확대, 축소 정도)
  };

  const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  return map;
}

/**
 * @description 카카오맵에 마커를 추가하는 함수
 * @param map {kakao.maps.Map} 카카오맵 객체
 * @param latitude {number} 마커가 추가될 위도
 * @param longtitude {number} 마커가 추가될 경도
 */
function renderMarker(map, latitude, longtitude) {
  const markerPosition = new kakao.maps.LatLng(latitude, longtitude); // 마커가 표시될 위치입니다
  // 마커를 생성합니다
  const marker = new kakao.maps.Marker({
    position: markerPosition,
  });
  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);
}

/**
 * @description 카카오맵의 중심좌표로 즉시 이동하는 함수
 * @param map {kakao.maps.Map} 카카오맵 객체
 * @param latitude {number} 지도의 중심좌표로 설정될 위도
 * @param longtitude {number} 지도의 중심좌표로 설정될 경도
 */
function setCenter(map, latitude, longtitude) {
  const moveLatLon = new kakao.maps.LatLng(latitude, longtitude);
  map.setCenter(moveLatLon);
}

/**
 * @description 카카오맵의 중심좌표로 부드럽게 이동하는 함수
 * @param map {kakao.maps.Map} 카카오맵 객체
 * @param latitude {number} 지도의 중심좌표로 설정될 위도
 * @param longtitude {number} 지도의 중심좌표로 설정될 경도
 */
function panTo(map, latitude, longtitude) {
  const moveLatLon = new kakao.maps.LatLng(latitude, longtitude);
  map.panTo(moveLatLon);
}

/**
 * @description 카카오맵의 지도 타입을 변경하는 함수
 * @param map {kakao.maps.Map} 카카오맵 객체
 * @param maptype {string} default 지도 타입 (roadmap, skyview)
 * @param roadmapButtonId {string} 지도 타입 변경 버튼의 id
 * @param skyviewButtonId {string} 지도 타입 변경 버튼의 id
 */
function setMapType(map, maptype, roadmapButtonId, skyviewButtonId) {
  const roadmapControl = document.getElementById(roadmapButtonId);
  const skyviewControl = document.getElementById(skyviewButtonId);
  if (maptype === 'roadmap') {
    map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
    roadmapControl.className = 'selected_btn';
    skyviewControl.className = 'btn';
  } else {
    map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
    skyviewControl.className = 'selected_btn';
    roadmapControl.className = 'btn';
  }
}

/**
 * @description 지도를 확대하는 함수입니다
 * @param map {kakao.maps.Map} 카카오맵 객체
 */
function zoomIn(map) {
  map.setLevel(map.getLevel() - 1);
}

/**
 * @description 지도를 축소하는 함수입니다
 * @param map {kakao.maps.Map} 카카오맵 객체
 */
function zoomOut(map) {
  map.setLevel(map.getLevel() + 1);
}