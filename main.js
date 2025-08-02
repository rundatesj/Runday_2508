
const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbytyVGj_B1zveR3DgtRGKAygazAwAd9_CitBRBRH2td3q6krWiKRs4Ue0E5zVxuhTry/exec';

document.addEventListener('DOMContentLoaded', () => {
    loadData();
});

async function loadData() {
    const res = await fetch(SHEET_API_URL);
    const data = await res.json();
    console.log('불러온 데이터:', data);
    document.getElementById('dashboard').innerHTML = '<p>팀별 대시보드 표시 영역</p>';
    document.getElementById('input-form').innerHTML = '<p>기록 입력폼 표시 영역</p>';
    document.getElementById('charts').innerHTML = '<p>차트 영역</p>';
}
