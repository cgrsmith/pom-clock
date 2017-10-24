document.addEventListener("DOMContentLoaded", function() {
    let incBreak = document.getElementById("incBreak");
    let incWork = document.getElementById("incWork");
    let timer = document.getElementById("timer");
    let app = {
        "workTime" : 60,
        "breakTime" : 60,
        "remainTime" : 60,
        "state" : "workTime",
        "pause" : true,
        makeTimeString() {
            let minuteString = String(Math.floor(this.remainTime/60));
            let secondString = String(this.remainTime%60);
            secondString = (secondString.length === 1) ? "0" + secondString : secondString;
            return minuteString + ":" + secondString;
        }
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
        timer.querySelectorAll("h2")[0].innerHTML = (app.state === "workTime") ? "Session Time" : "Break Time";
        timer.querySelectorAll("#timerDisplay")[0].innerHTML = app.makeTimeString();
    }

}



function resetTimer(timer, app, incType) {
    app.remainTime = app[incType];
    timer.querySelectorAll("#timerDisplay")[0].innerHTML = app.makeTimeString();
}

function setupIncrementor(incrementor, app, incType, timer) {
    let incrementorValue = app[incType];
    incrementor.querySelectorAll(".incButton")[0].addEventListener("click", function() {
        if (app.pause) {
            app[incType] = Math.max(0, app[incType] + 60);
            incrementor.querySelectorAll(".incValue")[0].innerHTML = Math.floor(app[incType]/60);
            if (app.state === incType) {
                resetTimer(timer, app, incType);
            }
        }
    });
    incrementor.querySelectorAll(".decButton")[0].addEventListener("click", function() {
        if (app.pause) {
            app[incType] = Math.max(0, app[incType] - 60);
            incrementor.querySelectorAll(".incValue")[0].innerHTML = Math.floor(app[incType]/60);
            if (app.state === incType) {
                resetTimer(timer, app, incType);
            }
        }
    });
    incrementor.querySelectorAll(".incValue")[0].innerHTML = Math.floor(app[incType]/60);
}

function setupTimer(timer, app) {
    timer.addEventListener("click", function() {
        app.pause = (app.pause === true) ? false : true;
    });
}