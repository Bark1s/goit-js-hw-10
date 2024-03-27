import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



const dateTimeInput = document.querySelector("#datetime-picker");
const startButton = document.querySelector("button");
const timerDays = document.querySelector(".value[data-days]");
const timerHours = document.querySelector(".value[data-hours]");
const timerMinutes = document.querySelector(".value[data-minutes]");
const timerSeconds = document.querySelector(".value[data-seconds]");  
startButton.disabled = true;

let userSelectedDate;
let timerTime;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const dateToUnix = selectedDates[0].getTime();
        if (dateToUnix < Date.now()) {
            iziToast.show({
                title: 'Warning',
                message: 'Please choose a date in the future',
                color: 'red',
                position: 'topCenter',
            });
            startButton.disabled = true;
        } else {
            userSelectedDate = dateToUnix;
            startButton.disabled = false;
            timerTime = dateToUnix - Date.now();
        }
        console.log(selectedDates[0]);
  },
};

flatpickr(dateTimeInput, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startButton.addEventListener("click", () => {
    startButton.disabled = true;
    dateTimeInput.disabled = true;
    let startCount = setInterval(() => {
        if (timerTime > 1000) {
            timerTime = timerTime - 1000;
            let conv = convertMs(timerTime)
            timerDays.innerHTML = conv.days.toString().padStart(2, '0');
            timerHours.innerHTML = conv.hours.toString().padStart(2, '0');
            timerMinutes.innerHTML = conv.minutes.toString().padStart(2, '0');
            timerSeconds.innerHTML = conv.seconds.toString().padStart(2, '0');
        } else {
            return;
        }
    }, 1000)
}
)