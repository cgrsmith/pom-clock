document.addEventListener("DOMContentLoaded", function() {
    let incBreak = document.getElementById("incBreak");
    let incWork = document.getElementById("incWork");
    let timer = document.getElementById("timer");
    let app = {
        "workTime" : 25,
        "breakTime" : 5,
        "remainTime" : 25,
        "state" : "workTime",
        "pause" : true
    } 

    setupIncrementor(incBreak, app, "breakTime", timer);
    setupIncrementor(incWork, app, "workTime", timer);
    setupTimer(timer, incBreak, incWork, app);
    let interval = setInterval(function() {
        tick(timer, app)}, 1000);

});

function tick(timer, app) {
    if (app.pause === false) {
        app.remainTime = Math.max(0, app.remainTime - 1);
        timer.querySelectorAll("#timerDisplay")[0].innerHTML = app.remainTime;
    }

}
function resetTimer(timer, app) {
    app.remainTime = app.workTime;
    timer.querySelectorAll("#timerDisplay")[0].innerHTML = app.workTime;
    timer.state = "workTime";
}

function setupIncrementor(incrementor, app, incType, timer) {
    let incrementorValue = app[incType];
    incrementor.querySelectorAll(".incButton")[0].addEventListener("click", function() {
        if (app.pause) {
            app[incType] = Math.max(0, app[incType] + 1);
            incrementor.querySelectorAll(".incValue")[0].innerHTML = app[incType];
            resetTimer(timer, app);
        }
    });
    incrementor.querySelectorAll(".decButton")[0].addEventListener("click", function() {
        if (app.pause) {
            app[incType] = Math.max(0, app[incType] - 1);
            incrementor.querySelectorAll(".incValue")[0].innerHTML = app[incType];
            resetTimer(timer, app);
        }
    });
    incrementor.querySelectorAll(".incValue")[0].innerHTML = app[incType];
}

function setupTimer(timer, incBreak, incWork, app) {
    timer.addEventListener("click", function() {
        app.pause = (app.pause === true) ? false : true;
    });
}