let date = new Date();
let selectedDate = "";

function renderCalendar(){

const monthYear = document.getElementById("monthYear");
const days = document.getElementById("calendarDays");

days.innerHTML = "";

const month = date.getMonth();
const year = date.getFullYear();

monthYear.innerText = date.toLocaleString("default",{month:"long"}) + " " + year;

// FIRST DAY OF MONTH (0=Sun, 1=Mon...)
const firstDay = new Date(year, month, 1).getDay();

// LAST DATE OF MONTH
const lastDay = new Date(year, month + 1, 0).getDate();

// ADD BLANK CELLS BEFORE FIRST DATE
for(let i = 0; i < firstDay; i++){
let blank = document.createElement("div");
days.appendChild(blank);
}

// ADD ACTUAL DATES
for(let i = 1; i <= lastDay; i++){

let day = document.createElement("div");
day.classList.add("day");
day.innerText = i;

// highlight today's date
let today = new Date();

if(
i === today.getDate() &&
month === today.getMonth() &&
year === today.getFullYear()
){
day.classList.add("today");
}

day.onclick = function(){

selectedDate = year + "-" + (month + 1) + "-" + i;

loadTasks();

}

days.appendChild(day);

}

}

renderCalendar();

document.getElementById("prev").onclick = function(){

date.setMonth(date.getMonth() - 1);
renderCalendar();

}

document.getElementById("next").onclick = function(){

date.setMonth(date.getMonth() + 1);
renderCalendar();

}

function addTask(){

let task = document.getElementById("taskInput").value;
let time = document.getElementById("taskTime").value;

let tasks = JSON.parse(localStorage.getItem(selectedDate)) || [];

tasks.push({task,time});

localStorage.setItem(selectedDate, JSON.stringify(tasks));

loadTasks();

}

function loadTasks(){

let list = document.getElementById("taskList");

list.innerHTML = "";

let tasks = JSON.parse(localStorage.getItem(selectedDate)) || [];

tasks.forEach((t,index)=>{

let li = document.createElement("li");

li.innerHTML = t.task + " ⏰ " + t.time +
`<button onclick="deleteTask(${index})">❌</button>`;

list.appendChild(li);

});

}

function deleteTask(index){

let tasks = JSON.parse(localStorage.getItem(selectedDate));

tasks.splice(index,1);

localStorage.setItem(selectedDate, JSON.stringify(tasks));

loadTasks();

}

/* Theme Switcher */

function setTheme(theme){

document.body.className = theme;

}
