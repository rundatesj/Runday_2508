
const crewMembers = {"goinggoing": "\uc6b0\uc720", "JS Jeon": "\uc6b0\uc720", "NJ_Run": "\uc6b0\uc720", "\uac70\ubd81\uc544\ub2ec\ub824": "\uc6b0\uc720", "\uac80\ub2e8\uc774\ubd09\uc8fc": "\uc6b0\uc720", "\uaca8\uc790\uc0c9\uc288\uc988": "\uc6b0\uc720", "\uad8c\ucd08\uac8c": "\ud3ec\ub3c4", "\ub3cc\uc544\uc628\ube75\uafb8": "\uc6b0\uc720", "\ub77c\uafb8\ub77c\uafb8\uc870\uae45": "\ud3ec\ub3c4", "\ub9c8\uc774\uc138\ud2b8": "\ud3ec\ub3c4", "\ub9c8\ucee4\uc2a4": "\uc6b0\uc720", "\uba15\uba10": "\uc6b0\uc720", "\ubb3c\ub0c9\uba85": "\uc6b0\uc720", "\ubb49\uacf5\uc8fc": "\ud3ec\ub3c4", "\ubc14\ub2e4": "\ud3ec\ub3c4", "\ubd09\ubb34\ub3d9\ub7ec\ub108": "\uc6b0\uc720", "\uc090\uc57d\ube44\uc57d": "\ud3ec\ub3c4", "\uc0bc\ub0a8\ub9e4\ub9d8": "\uc6b0\uc720", "\uc0c1\uc6b0\uc30d\uc6b0": "\uc6b0\uc720", "\uc138\ub3d9\uc774": "\uc6b0\uc720", "\uc218\ub2e4\ub9d8": "\ud3ec\ub3c4", "\uc220\uc6b0": "\ud3ec\ub3c4", "\uc2e0\uc6b1\uc7ac": "\uc6b0\uc720", "\uc5bc\uc464\uc57c": "\ud3ec\ub3c4", "\uc6b0\uc720\ud0a4": "\uc6b0\uc720", "\uc724\ud638\uadfc": "\ud3ec\ub3c4", "\uc774\uc751\ub0b4": "\ud3ec\ub3c4", "\uc790\ub2ec\ub9e4": "\ud3ec\ub3c4", "\uc815\uc601\uc900": "\ud3ec\ub3c4", "\ud558\ub298\uc740\ud3c9": "\ud3ec\ub3c4", "\ud558\ud558\ud558\uc591": "\ud3ec\ub3c4", "\ud574\ud53c\ub7ec\ub108": "\ud3ec\ub3c4", "\ud6c4\ub2c8": "\uc6b0\uc720", "\ud6c4\ub2e4\ub2ed": "\ud3ec\ub3c4"};
let records = [];

document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('memberSelect');
    select.innerHTML = '<option value="">크루원을 선택하세요</option>';
    Object.keys(crewMembers).forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        select.appendChild(option);
    });

    select.addEventListener('change', () => {
        const team = crewMembers[select.value] || '팀 정보 없음';
        document.getElementById('teamDisplay').textContent = team + '팀';
    });

    document.getElementById('recordForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = select.value;
        const team = crewMembers[name];
        const date = document.getElementById('dateInput').value;
        const distance = parseFloat(document.getElementById('distanceInput').value);
        if (!name || !team || !date || !distance) return alert('모든 항목을 입력하세요');
        const record = { name, team, date, distance };
        records.push(record);
        updateHistory();
        e.target.reset();
        document.getElementById('teamDisplay').textContent = '팀 정보 없음';
    });
});

function updateHistory() {
    const list = document.getElementById('historyList');
    list.innerHTML = '';
    records.slice(-10).reverse().forEach(r => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.textContent = `${r.date} - ${r.team}팀 ${r.name}: ${r.distance}km`;
        list.appendChild(div);
    });
}
