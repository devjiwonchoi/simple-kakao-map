# Simple Kakao Map

```
스타일: https://cdn.jsdelivr.net/gh/devjiwonchoi/simple-kakao-map@main/simple-kakao-map.min.css

스크립트: https://cdn.jsdelivr.net/gh/devjiwonchoi/simple-kakao-map@main/simple-kakao-map.min.js
```

## Usage

```html
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devjiwonchoi/simple-kakao-map@main/skm.min.css">
</head>

<div class="map_wrap radius_border">
  <div id="kakaoMap"></div>
</div>

<script src="//dapi.kakao.com/v2/maps/sdk.js?libraries=services&appkey=KAKAO_APP_KEY"></script>
<script src="https://cdn.jsdelivr.net/gh/devjiwonchoi/simple-kakao-map@main/skm.min.js"></script>

<script>
    const address = '제주특별자치도 제주시 첨단로 242'; // 카카오 본사 주소
    simpleKakaoMap(address);
</script>
```
## Preview
