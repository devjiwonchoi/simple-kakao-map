function appendKakaoMapStyle() {
  const style = document.createElement('style');
  style.innerHTML = `
  .map_wrap {
    position: relative;
    overflow: hidden;
    width: 50vw;
    height: 50vh;
  }
  
  #kakaoMap {
    width: 100%;
    height: 100%;
  }
  
  .radius_border {
    border: 1px solid #919191;
    border-radius: 5px;
  }
  
  .custom_typecontrol {
    position: absolute;
    top: 10px;
    right: 10px;
    overflow: hidden;
    width: 130px;
    height: 30px;
    margin: 0;
    padding: 0;
    z-index: 1;
    font-size: 12px;
    font-family: 'Malgun Gothic', '맑은 고딕', sans-serif;
  }
  
  .custom_typecontrol span {
    display: block;
    width: 65px;
    height: 30px;
    float: left;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    background: linear-gradient(#fff, #e6e6e6);
  }
  
  .custom_typecontrol .not_selected_btn {
    background: #fff;
    background: linear-gradient(#fff, #e6e6e6);
  }
  
  .custom_typecontrol .not_selected_btn:hover {
    background: #f5f5f5;
    background: linear-gradient(#f5f5f5, #e3e3e3);
  }
  
  .custom_typecontrol .not_selected_btn:active {
    background: #e6e6e6;
    background: linear-gradient(#e6e6e6, #fff);
  }
  
  .custom_typecontrol .selected_btn {
    color: #fff;
    background: #425470;
    background: linear-gradient(#425470, #5b6d8a);
  }
  
  .custom_typecontrol .selected_btn:hover {
    color: #fff;
  }
  
  .custom_zoomcontrol {
    position: absolute;
    top: 50px;
    right: 10px;
    width: 36px;
    height: 80px;
    overflow: hidden;
    z-index: 1;
    background-color: #f5f5f5;
  }
  
  .custom_zoomcontrol span {
    display: block;
    width: 36px;
    height: 40px;
    text-align: center;
    cursor: pointer;
  }
  
  .custom_zoomcontrol span img {
    width: 15px;
    height: 15px;
    padding: 12px 0;
    border: none;
  }
  
  .custom_zoomcontrol span:first-child {
    border-bottom: 1px solid #bfbfbf;
  }
  
  #moveToCenterBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 150px;
    right: 10px;
    width: 36px;
    height: 40px;
    overflow: hidden;
    border: 1px solid #919191;
    border-radius: 5px;
    background-color: #f5f5f5;
    cursor: pointer;
    z-index: 1;
  } 
  
  #moveToCenterBtn img {
    width: 20px;
    height: 20px;
  }

  #iw-custom-overlay-wrap{
    width: 100%;
    position: absolute;
    top: -80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  #iw-custom-overlay-wrap a{
    text-decoration: none;
  }
  
  .iw-txt{
    display: block;
    position: relative;
    z-index: 10;
    background-color: #fff;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 5px;
    padding: 10px;
    font-weight: 700;
    font-size: 0.875rem;
    line-height: 15px;
    background-color: #fff;
    color: #222;
    letter-spacing: -2px;
  }
  `;
  document.head.appendChild(style);
}

function SimpleKakaoMap(appKey, address, locationName = null) {
  appendKakaoMapStyle();
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?libraries=services&autoload=false&appkey=${appKey}`;
  script.onload = () => {
    kakao.maps.load(() => {
      const container = document.getElementById('kakaoMap');
      const wrapperDiv = document.createElement('div');
      wrapperDiv.classList.add('map_wrap', 'radius_border');
      container.parentNode.insertBefore(wrapperDiv, container);
      wrapperDiv.appendChild(container);

      container.insertAdjacentHTML(
        'afterend',
        `<div class="custom_typecontrol radius_border">
      <span id="btnRoadmap" class="selected_btn">지도</span>
      <span id="btnSkyview" class="not_selected_btn">스카이뷰</span>
    </div>

    <div class="custom_zoomcontrol radius_border">
      <span id="zoomIn">
        <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png" alt="확대"/>
      </span>
      <span id="zoomOut">
        <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png" alt="축소"/>
      </span>
    </div>

    <span id="moveToCenterBtn">
      <img src="https://icon2.cleanpng.com/20180203/jxe/kisspng-reset-button-icon-restart-png-photos5-5a7588a5446099.2178430315176521332801.jpg" alt="중심" />
    </span>`
      );

      const markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
      const options = {
        center: markerPosition,
        level: 3,
      };
      const map = new kakao.maps.Map(container, options);
      const geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          const marker = new kakao.maps.Marker({
            position: coords,
          });
          marker.setMap(map);

          const iwContent = `
          <div id="iw-custom-overlay-wrap">
            <a target="_blank" href="https://map.kakao.com/link/search/${locationName}">
              <span class="iw-txt" style="font-family: sans-serif;">
                ${locationName ?? result[0].road_address?.building_name}
              </span>
            </a>
          </div>`;
          const customOverlay = new kakao.maps.CustomOverlay({
            position: coords,
            content: iwContent,
          });

          customOverlay.setMap(map);
          map.setCenter(coords);

          const moveToCenterBtn = document.getElementById('moveToCenterBtn');
          moveToCenterBtn.onclick = () => {
            map.panTo(coords);
          };
        }
      });
      advancedKakaoMap(map);
    });
  };

  document.head.appendChild(script);
}

function advancedKakaoMap(map) {
  const zoomIn = document.getElementById('zoomIn');
  const zoomOut = document.getElementById('zoomOut');

  zoomIn.onclick = () => {
    map.setLevel(map.getLevel() - 1);
  };
  zoomOut.onclick = () => {
    map.setLevel(map.getLevel() + 1);
  };

  // 커스텀 컨트롤
  const roadmapControl = document.getElementById('btnRoadmap');
  const skyviewControl = document.getElementById('btnSkyview');

  roadmapControl.onclick = () => {
    map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
    roadmapControl.className = 'selected_btn';
    skyviewControl.className = 'not_selected_btn';
  };

  skyviewControl.onclick = () => {
    map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
    skyviewControl.className = 'selected_btn';
    roadmapControl.className = 'not_selected_btn';
  };
}
