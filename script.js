const trigger = document.getElementById('dateTrigger');
const calendar = document.getElementById('calendar');
const viewLabel = document.getElementById('viewLabel');
const daysView = document.getElementById('daysView');
const monthsView = document.getElementById('monthsView');
const yearsView = document.getElementById('yearsView');

let date = new Date();
let currMonth = date.getMonth();
let currYear = date.getFullYear();
let selectedDate = null;
let currentMode = 'days';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function render() {
    if (currentMode === 'days') renderDays();
    else if (currentMode === 'months') renderMonths();
    else renderYears();
}

function renderDays() {
    daysView.innerHTML = "";
    daysView.classList.remove('hidden');
    monthsView.classList.add('hidden');
    yearsView.classList.add('hidden');
    viewLabel.innerText = `${monthNames[currMonth]} ${currYear}`;

    ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].forEach(d => {
        const el = document.createElement('div');
        el.className = 'day-name';
        el.innerText = d;
        daysView.appendChild(el);
    });

    const firstDay = new Date(currYear, currMonth, 1).getDay();
    const lastDate = new Date(currYear, currMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const el = document.createElement('div');
        el.className = 'cell empty';
        daysView.appendChild(el);
    }

    for (let i = 1; i <= lastDate; i++) {
        const el = document.createElement('div');
        el.className = 'cell';
        el.innerText = i;
        if (i === new Date().getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear()) el.classList.add('today');
        el.onclick = () => {
            selectedDate = new Date(currYear, currMonth, i);
            document.getElementById('displayText').innerText = selectedDate.toDateString();
            calendar.style.display = 'none';
        };
        daysView.appendChild(el);
    }
}

function renderMonths() {
    monthsView.innerHTML = "";
    daysView.classList.add('hidden');
    monthsView.classList.remove('hidden');
    yearsView.classList.add('hidden');
    viewLabel.innerText = currYear;

    monthNames.forEach((m, i) => {
        const el = document.createElement('div');
        el.className = 'cell';
        el.innerText = m;
        el.onclick = () => { currMonth = i; currentMode = 'days'; render(); };
        monthsView.appendChild(el);
    });
}

function renderYears() {
    yearsView.innerHTML = "";
    daysView.classList.add('hidden');
    monthsView.classList.add('hidden');
    yearsView.classList.remove('hidden');
    let start = currYear - 5;
    viewLabel.innerText = `${start} - ${start + 11}`;
    for (let i = start; i < start + 12; i++) {
        const el = document.createElement('div');
        el.className = 'cell';
        el.innerText = i;
        el.onclick = () => { currYear = i; currentMode = 'months'; render(); };
        yearsView.appendChild(el);
    }
}

document.getElementById('prevBtn').onclick = (e) => {
    e.stopPropagation();
    if (currentMode === 'days') currMonth--;
    else if (currentMode === 'months') currYear--;
    else currYear -= 12;
    if (currMonth < 0) { currMonth = 11; currYear--; }
    render();
};

document.getElementById('nextBtn').onclick = (e) => {
    e.stopPropagation();
    if (currentMode === 'days') currMonth++;
    else if (currentMode === 'months') currYear++;
    else currYear += 12;
    if (currMonth > 11) { currMonth = 0; currYear++; }
    render();
};

viewLabel.onclick = () => {
    if (currentMode === 'days') currentMode = 'months';
    else if (currentMode === 'months') currentMode = 'years';
    render();
};

trigger.onclick = () => {
    calendar.style.display = (calendar.style.display === 'block') ? 'none' : 'block';
    if (calendar.style.display === 'block') render();
};

render();