
let records = [];

document.addEventListener('DOMContentLoaded', () => {
    populateMemberSelect();
    document.getElementById('recordForm').addEventListener('submit', addRecord);
});

function populateMemberSelect() {
    const select = document.getElementById('memberSelect');
    for (let member in crewMembers) {
        const option = document.createElement('option');
        option.value = member;
        option.textContent = member;
        select.appendChild(option);
    }
}

function addRecord(e) {
    e.preventDefault();
    const name = document.getElementById('memberSelect').value;
    const date = document.getElementById('dateInput').value;
    const distance = parseFloat(document.getElementById('distanceInput').value);
    const team = crewMembers[name];

    if (!name || !date || !distance) {
        alert('모든 정보를 입력하세요.');
        return;
    }

    const record = { name, date, distance, team };
    records.push(record);
    updateDisplay();
    document.getElementById('recordForm').reset();
}

function updateDisplay() {
    updateHistory();
    updateTeamTotals();
    updateCharts();
}

function updateHistory() {
    const list = document.getElementById('historyList');
    list.innerHTML = '';
    const recent = records.slice(-10).reverse();
    recent.forEach(r => {
        const li = document.createElement('li');
        li.textContent = `${r.date} - ${r.team}팀 ${r.name}: ${r.distance}km`;
        list.appendChild(li);
    });
}

function updateTeamTotals() {
    const teamASum = records.filter(r => r.team === '우유').reduce((sum, r) => sum + r.distance, 0);
    const teamBSum = records.filter(r => r.team === '포도').reduce((sum, r) => sum + r.distance, 0);
    document.getElementById('teamATotal').textContent = teamASum.toFixed(1);
    document.getElementById('teamBTotal').textContent = teamBSum.toFixed(1);
}

let teamChart, personalChart;

function updateCharts() {
    const teamSum = {
        '우유': records.filter(r => r.team === '우유').reduce((sum, r) => sum + r.distance, 0),
        '포도': records.filter(r => r.team === '포도').reduce((sum, r) => sum + r.distance, 0)
    };

    const personalSum = {};
    records.forEach(r => {
        personalSum[r.name] = (personalSum[r.name] || 0) + r.distance;
    });

    const ctxTeam = document.getElementById('teamChart').getContext('2d');
    if (teamChart) teamChart.destroy();
    teamChart = new Chart(ctxTeam, {
        type: 'doughnut',
        data: {
            labels: ['우유팀', '포도팀'],
            datasets: [{
                data: [teamSum['우유'], teamSum['포도']],
                backgroundColor: ['#FF6B35', '#4ECDC4']
            }]
        }
    });

    const ctxPersonal = document.getElementById('personalChart').getContext('2d');
    if (personalChart) personalChart.destroy();
    personalChart = new Chart(ctxPersonal, {
        type: 'bar',
        data: {
            labels: Object.keys(personalSum),
            datasets: [{
                label: '누적 거리 (km)',
                data: Object.values(personalSum),
                backgroundColor: '#667eea'
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}
