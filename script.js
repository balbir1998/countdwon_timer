const giveawayInfo = document.querySelector(".giveaway-info");
const timerContainer = document.querySelector(".countdwon-timer-container");
const daysCount = document.querySelector(".days-count");
const hoursCount = document.querySelector(".hours-count");
const minutesCount = document.querySelector(".min-count");
const secondsCount = document.querySelector(".sec-count");

let dateObj = JSON.parse(localStorage.getItem("giveawayDate"));

if (!dateObj) {
    console.log("okay");
    let currentDate = new Date();

    dateObj = {
        tempYear: currentDate.getFullYear(),
        tempMonth: currentDate.getMonth(),
        tempDate: currentDate.getDate() + 10,
    }

    localStorage.setItem("giveawayDate", JSON.stringify(dateObj));
}


const futureDate = new Date(dateObj.tempYear, dateObj.tempMonth, dateObj.tempDate, 11, 30, 0);
const [day, date, month, year, hour, minute, format] = formatDateAndTime(futureDate);
giveawayInfo.innerText = `giveaway ends on ${day}, ${date} ${month} ${year}, ${hour}:${minute}${format}`;
let id = setInterval(() => counter(futureDate, id), 1000);

function counter(futureDate, id) {
    let milliseconds = futureDate.getTime() - Date.now();
    if (milliseconds < 0) {
        clearInterval(id);
        timerContainer.innerHTML = `<h4 class="expired">Sorry, this giveaway has expired!</h4>`;
        localStorage.removeItem("giveawayDate");;
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
    const dateObj = date.toLocaleDateString('en-IN', { dateStyle: "full" }).split(" ");
    dateObj.forEach((el, idx) => {
        if (el.includes(",")) {
            dateObj[idx] = el.replace(",", "");
        }
    });

    let hour = date.getHours();
    let minute = date.getMinutes();
    let format = "am";
    if (hour >= 12) {
        format = "pm";
        if (hour > 12) hour -= 12;
    }
    if (hour === 0) hour = 12;
    if (hour < 10) hour = `0${hour}`;
    if (minute < 10) minute = `0${minute}`;


    return [...dateObj, hour, minute, format];
}