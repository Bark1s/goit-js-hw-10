import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", event => {
    event.preventDefault();
    const inputDelay = event.currentTarget.elements.delay.value;
    const choice = event.currentTarget.elements.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (choice === "fulfilled") {
                resolve();
            } else {
                reject();
            }
        }, inputDelay);
    });

    promise
        .then(value => {
            iziToast.show({
                message: `✅ Fulfilled promise in ${inputDelay}ms`,
                color: 'green',
                position: 'topCenter',
            })
        })
        .catch(error => {
        iziToast.show({
                message: `❌ Rejected promise in ${inputDelay}ms`,
                color: 'red',
                position: 'topCenter',
            })
    })
});

