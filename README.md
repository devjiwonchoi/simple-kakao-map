# Simple Kakao Map

```
스크립트: https://cdn.jsdelivr.net/gh/devjiwonchoi/simple-kakao-map@main/skm.min.js
```

## Usage

```html
// ...

<!-- 이거 하나면 끝 -->
<div id="kakaoMap"></div>

// ...

<!-- skm.min.js 로드 -->
<script src="https://cdn.jsdelivr.net/gh/devjiwonchoi/simple-kakao-map@main/skm.min.js"></script>

<script>
    const appKey = 'KAKAO_APP_KEY'; // 발급 받은 카카오 API 앱 키
    const address = '제주특별자치도 제주시 첨단로 242'; // 입력할 주소
    const locationName = '카카오 본사'; // 출력할 이름 (디폴트: 입력한 주소의 빌딩이름)
    SimpleKakaoMap(appKey, address, locationName);
</script>
```
## Preview
