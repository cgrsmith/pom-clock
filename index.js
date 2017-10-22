document.addEventListener("DOMContentLoaded", function() {
    let incBreak = document.getElementById("incBreak");
    let incWork = document.getElementById("incWork");
    let timer = document.getElementById("timer");
    setupIncrementor(incBreak,5);
    setupIncrementor(incWork,25);
    setupTimer(timer, incBreak, incWork);
});

function setupIncrementor(incrementor, initialVal) {
    let incrementorValue = initialVal;
    incrementor.querySelectorAll(".incButton")[0].addEventListener("click", function() {
        incrementorValue = Math.max(0, incrementorValue + 1);
        incrementor.querySelectorAll(".incValue")[0].innerHTML = incrementorValue;
    });
    incrementor.querySelectorAll(".decButton")[0].addEventListener("click", function() {
        incrementorValue = Math.max(0, incrementorValue - 1);
        incrementor.querySelectorAll(".incValue")[0].innerHTML = incrementorValue;
    });
    incrementor.querySelectorAll(".incValue")[0].innerHTML = initialVal;
}

function setupTimer(timer, incBreak, incWork) {

}