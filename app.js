
let records = [];
let teamChart, personalChart;

document.addEventListener('DOMContentLoaded', () => {
    const memberSelect = document.getElementById('memberSelect');
    const teamDisplay = document.getElementById('teamDisplay');

    for (let member in crewMembers) {
        const option = document.createElement('option');
        option.value = member;
        option.textContent = member;
        memberSelect.appendChild(option);
    }

    memberSelect.addEventListener('change', function() {
        const team = crewMembers[this.value];
        teamDisplay.textContent = team ? team + '팀' : '팀 정보 없음';
    });

    document.getElementById('recordForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const member = memberSelect.value;
        const team = crewMembers[member];
        const date = document.getElementById('dateInput').value;
        const distance = parseFloat(document.getElementById('distanceInput').value);

        if (!member || !team || !date || !distance) {
            alert('모든 정보를 입력해주세요.');
            return;
        }

        records.push({ member, team, date, distance });
        updateDisplay();
        this.reset();
        teamDisplay.textContent = '팀 정보 없음';
    });

    updateDisplay();
});

function updateDisplay() {
    const teamASum = records.filter(r => r.team === '우유').reduce((sum, r) => sum + r.distance, 0);
    const teamBSum = records.filter(r => r.team === '포도').reduce((sum, r) => sum + r.distance, 0);

    document.getElementById('teamATotal').textContent = teamASum.toFixed(1) + ' km';
    document.getElementById('teamBTotal').textContent = teamBSum.toFixed(1) + ' km';

    updateMemberList('teamAMembers', '우유');
    updateMemberList('teamBMembers', '포도');
    updateHistory();
    updateCharts();
}

function updateMemberList(elementId, team) {
    const members = {};
    records.filter(r => r.team === team).forEach(r => {
        if (!members[r.member]) members[r.member] = 0;
        members[r.member] += r.distance;
    });

    const container = document.getElementById(elementId);
    if (Object.keys(members).length === 0) {
        container.textContent = '아직 기록이 없습니다';
        return;
    }

    container.innerHTML = '';
    for (let member in members) {
        const div = document.createElement('div');
        div.textContent = `${member}: ${members[member].toFixed(1)} km`;
        container.appendChild(div);
    }
}

function updateHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    records.slice().reverse().forEach(record => {
        const div = document.createElement('div');
        div.textContent = `${record.date} - ${record.team}팀 ${record.member}: ${record.distance}km`;
        historyList.appendChild(div);
    });
}

function updateCharts() {
    const teamASum = records.filter(r => r.team === '우유').reduce((sum, r) => sum + r.distance, 0);
    const teamBSum = records.filter(r => r.team === '포도').reduce((sum, r) => sum + r.distance, 0);

    const ctxTeam = document.getElementById('teamChart').getContext('2d');
    if (teamChart) teamChart.destroy();
    teamChart = new Chart(ctxTeam, {
        type: 'doughnut',
        data: {
            labels: ['우유팀', '포도팀'],
            datasets: [{
                data: [teamASum, teamBSum],
                backgroundColor: ['#FF6B35', '#4ECDC4']
            }]
        }
    });

    const personalSums = {};
    records.forEach(r => {
        if (!personalSums[r.member]) personalSums[r.member] = 0;
        personalSums[r.member] += r.distance;
    });

    const sortedMembers = Object.entries(personalSums).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const ctxPersonal = document.getElementById('personalChart').getContext('2d');
    if (personalChart) personalChart.destroy();
    personalChart = new Chart(ctxPersonal, {
        type: 'bar',
        data: {
            labels: sortedMembers.map(m => m[0]),
            datasets: [{
                data: sortedMembers.map(m => m[1]),
                backgroundColor: '#667eea'
            }]
        }
    });
}
