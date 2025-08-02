
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbytyVGj_B1zveR3DgtRGKAygazAwAd9_CitBRBRH2td3q6krWiKRs4Ue0E5zVxuhTry/exec';

function updateDashboard() {
    const dashboard = document.getElementById('dashboard');
    const milkTotal = records.filter(r => r.team === '우유').reduce((sum, r) => sum + parseFloat(r.distance), 0);
    const grapeTotal = records.filter(r => r.team === '포도').reduce((sum, r) => sum + parseFloat(r.distance), 0);
    dashboard.innerHTML = \`
        <div>🥛 우유팀: \${milkTotal} km</div>
        <div>🍇 포도팀: \${grapeTotal} km</div>
    \`;
}

function renderForm() {
    const form = document.getElementById('form-section');
    const memberOptions = Object.keys(crewMembers).map(name => \`<option value="\${name}">\${name}</option>\`).join('');
    form.innerHTML = \`
        <select id="memberSelect">\${memberOptions}</select>
        <span id="teamDisplay">팀 정보 없음</span>
        <input type="date" id="dateInput">
        <input type="number" id="distanceInput" placeholder="거리 (km)">
        <button onclick="addRecord()">기록 추가</button>
    \`;
    document.getElementById('memberSelect').addEventListener('change', function() {
        const team = crewMembers[this.value] || '팀 정보 없음';
        document.getElementById('teamDisplay').innerText = team + '팀';
    });
}

function addRecord() {
    const name = document.getElementById('memberSelect').value;
    const date = document.getElementById('dateInput').value;
    const distance = document.getElementById('distanceInput').value;
    if (!name || !date || !distance) return alert('모든 항목을 입력하세요.');
    const record = { name, team: crewMembers[name], date, distance };
    records.push(record);
    updateDashboard();
    updateHistory();
    saveRecordToGoogleSheets(record);
}

function updateHistory() {
    const history = document.getElementById('history-section');
    const items = records.slice(-10).map(r => \`<div>\${r.date} - \${r.team}팀 \${r.name}: \${r.distance}km</div>\`).join('');
    history.innerHTML = '<h2>최근 기록</h2>' + items;
}

async function loadRecordsFromGoogleSheets() {
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL);
        const data = await response.json();
        if (data && Array.isArray(data.records)) {
            records = data.records;
            updateDashboard();
            updateHistory();
        }
    } catch (error) {
        console.error('로드 실패', error);
    }
}

async function saveRecordToGoogleSheets(record) {
    try {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(record)
        });
    } catch (error) {
        console.error('저장 실패', error);
    }
}

window.onload = function() {
    renderForm();
    loadRecordsFromGoogleSheets();
};
