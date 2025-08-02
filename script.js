
let records = [];

document.addEventListener('DOMContentLoaded', () => {
    const memberSelect = document.getElementById('memberSelect');
    const teamDisplay = document.getElementById('teamDisplay');

    Object.keys(crewMembers).forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        memberSelect.appendChild(option);
    });

    memberSelect.addEventListener('change', () => {
        const selected = memberSelect.value;
        teamDisplay.textContent = selected ? `${crewMembers[selected]}팀` : '팀 정보 없음';
    });

    document.getElementById('recordForm').addEventListener('submit', e => {
        e.preventDefault();
        const name = memberSelect.value;
        const date = document.getElementById('dateInput').value;
        const distance = parseFloat(document.getElementById('distanceInput').value);
        if (!name || !date || !distance) return alert('모든 정보를 입력해주세요!');
        
        const record = { name, date, distance, team: crewMembers[name] };
        records.push(record);
        updateDisplay();
    });
});

function updateDisplay() {
    const totalA = records.filter(r => r.team === '우유').reduce((sum, r) => sum + r.distance, 0);
    const totalB = records.filter(r => r.team === '포도').reduce((sum, r) => sum + r.distance, 0);
    document.getElementById('totalA').textContent = totalA.toFixed(1);
    document.getElementById('totalB').textContent = totalB.toFixed(1);

    const historyList = document.getElementById('historyList');
    historyList.innerHTML = records.map(r => `${r.date} - ${r.team}팀 ${r.name}: ${r.distance}km`).join('<br>');

    // Charts update logic (Chart.js)
}
