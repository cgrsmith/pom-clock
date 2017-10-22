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
    setupTimer(timer, app);
    let interval = setInterval(function() {
        tick(timer, app)}, 1000);

});

function tick(timer, app) {
    if (app.pause === false) {
        if (app.remainTime === 0) {
            app.state = (app.state === "workTime") ? "breakTime" : "workTime";
            app.remainTime = app[app.state] + 1;
        }
        app.remainTime = Math.max(0, app.remainTime - 1);
        timer.querySelectorAll("h2")[0].innerHTML = app.state;
        timer.querySelectorAll("#timerDisplay")[0].innerHTML = app.remainTime;
    }

}
function resetTimer(timer, app, incType) {
    app.remainTime = app[incType];
    timer.querySelectorAll("#timerDisplay")[0].innerHTML = app.remainTime;
}

function setupIncrementor(incrementor, app, incType, timer) {
    let incrementorValue = app[incType];
    incrementor.querySelectorAll(".incButton")[0].addEventListener("click", function() {
        if (app.pause) {
            app[incType] = Math.max(0, app[incType] + 1);
            incrementor.querySelectorAll(".incValue")[0].innerHTML = app[incType];
            if (app.state === incType) {
                resetTimer(timer, app, incType);
            }
        }
    });
    incrementor.querySelectorAll(".decButton")[0].addEventListener("click", function() {
        if (app.pause) {
            app[incType] = Math.max(0, app[incType] - 1);
            incrementor.querySelectorAll(".incValue")[0].innerHTML = app[incType];
            if (app.state === incType) {
                resetTimer(timer, app, incType);
            }
        }
    });
    incrementor.querySelectorAll(".incValue")[0].innerHTML = app[incType];
}

function setupTimer(timer, app) {
    timer.addEventListener("click", function() {
        app.pause = (app.pause === true) ? false : true;
    });
}