const giveawayInfo = document.querySelector(".giveaway-info");
const timerContainer = document.querySelector(".countdwon-timer-container");
const daysCount = document.querySelector(".days-count");
const hoursCount = document.querySelector(".hours-count");
const minutesCount = document.querySelector(".min-count");
const secondsCount = document.querySelector(".sec-count");

let timeStamp = parseInt(localStorage.getItem("timestamp"));

if (!timeStamp) {
    // 10 days from now
    const tenDays = 10 * 24 * 60 * 60 * 1000;
    const milliseconds = Date.now() + tenDays;

    let newDate = new Date(milliseconds);
    newDate.setHours(11, 30, 0, 0);

    timeStamp = newDate.getTime();
    localStorage.setItem("timestamp", timeStamp);
}


const futureDate = new Date(timeStamp);
const [day, date, month, year, hour, minute, format] = formatDateAndTime(futureDate);
giveawayInfo.innerText = `giveaway ends on ${day}, ${date} ${month} ${year}, ${hour}:${minute}${format}`;
let id = setInterval(() => counter(futureDate, id), 1000);

function counter(futureDate, id) {
    let milliseconds = futureDate.getTime() - Date.now();
    if (milliseconds < 0) {
        clearInterval(id);
        timerContainer.innerHTML = `<h4 class="expired">Sorry, this giveaway has expired!</h4>`;
        localStorage.removeItem("timestamp");;
        return;
    }

    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    let days = Math.floor(milliseconds / oneDay)
    let hours = Math.floor((milliseconds % oneDay) / oneHour);
    let minutes = Math.floor((milliseconds % oneHour) / oneMinute);
    let seconds = Math.floor((milliseconds % oneMinute) / 1000);

    daysCount.innerText = formatText(days);
    hoursCount.innerText = formatText(hours);
    minutesCount.innerText = formatText(minutes);
    secondsCount.innerText = formatText(seconds);

    if (!document.body.classList.contains("loaded")) document.body.classList.add("loaded");
}

function formatText(value) {
    return (value < 10) ? `0${value}` : value;
}

function formatDateAndTime(date) {
    const formatedDate = date.toLocaleDateString('en-IN', { dateStyle: "full" }).replaceAll(",", "").split(" ");
    const formatedTime = date.toLocaleTimeString('en-IN', { timeStyle: "short" }).replaceAll(":", " ").split(" ");

    return [...formatedDate, ...formatedTime];
}