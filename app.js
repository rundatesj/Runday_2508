
document.addEventListener('DOMContentLoaded', () => {
    const crewMembers = { "JS Jeon": "우유", "goinggoing": "우유", "후다닭": "포도" };
    const memberSelect = document.getElementById('memberSelect');
    const teamDisplay = document.getElementById('teamDisplay');
    const historyList = document.getElementById('historyList');
    const teamATotal = document.getElementById('teamATotal');
    const teamBTotal = document.getElementById('teamBTotal');
    const records = [];
    
    for (const member in crewMembers) {
        const option = document.createElement('option');
        option.value = member;
        option.textContent = member;
        memberSelect.appendChild(option);
    }

    memberSelect.addEventListener('change', () => {
        const team = crewMembers[memberSelect.value] || '정보 없음';
        teamDisplay.textContent = team === '우유' ? '🥛 우유팀' : '🍇 포도팀';
    });

    document.getElementById('recordForm').addEventListener('submit', e => {
        e.preventDefault();
        const member = memberSelect.value;
        const distance = parseFloat(document.getElementById('distance').value);
        if (!member || !distance) return alert('모든 항목을 입력하세요.');
        records.push({ member, team: crewMembers[member], distance });
        updateDisplay();
    });

    function updateDisplay() {
        let milkSum = 0, grapeSum = 0;
        historyList.innerHTML = '';
        records.forEach(r => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.innerHTML = `<span>${r.team}팀 - ${r.member}</span><span>${r.distance}km</span>`;
            historyList.appendChild(div);
            if (r.team === '우유') milkSum += r.distance;
            else if (r.team === '포도') grapeSum += r.distance;
        });
        teamATotal.textContent = milkSum.toFixed(1);
        teamBTotal.textContent = grapeSum.toFixed(1);
    }
});
