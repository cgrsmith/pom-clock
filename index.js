document.addEventListener("DOMContentLoaded", function() {
    let incBreak = document.getElementById("incBreak");
    let incWork = document.getElementById("incWork");
    let timer = document.getElementById("timer");
    //let canv = document.getElementById("timerCanvas");
    let app = {
        "workTime" : 60,
        "breakTime" : 60,
        "remainTime" : 60,
        "state" : "workTime",
        "pause" : true,
        "canvas" : document.getElementById("timerCanvas"),
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

//Temporal Functions
function tick(timer, app) {
    if (app.pause === false) {

        app.remainTime = Math.max(0, app.remainTime - 1);
        timer.querySelectorAll("h2")[0].innerHTML = (app.state === "workTime") ? "Work" : "Break";
        timer.querySelectorAll("#timerDisplay")[0].innerHTML = app.makeTimeString();
        
        //if (app.remainTime !== app[app.state]) {

        //}
        if (app.remainTime === 0) {
            app.state = (app.state === "workTime") ? "breakTime" : "workTime";
            app.remainTime = app[app.state] ;
        } 
        let arcRads = (app[app.state]-app.remainTime)/app[app.state]*2*Math.PI;
        drawCircleBar(app, arcRads)
    }

}

function drawCircleBar(app, endPointRads) {
    clearCanvas(app);
    let context = app.canvas.getContext("2d");
    let arcWidth = 10;
    context.beginPath();
    context.lineWidth=arcWidth;
    context.strokeStyle = "#675FDB";
    if (app.state === "workTime" && endPointRads !== 0) {
        context.arc(150, 150, 150 - arcWidth, 1.5*Math.PI, endPointRads - 0.5*Math.PI, false);
    } else if (app.state === "breakTime") {
        context.arc(150, 150, 150 - arcWidth, endPointRads - 0.5*Math.PI, 1.5*Math.PI, false);
    }
    context.stroke();
}

function resetTimer(timer, app, incType) {
    app.remainTime = app[incType];
    timer.querySelectorAll("#timerDisplay")[0].innerHTML = app.makeTimeString();
    clearCanvas(app);
}

function clearCanvas(app) {
    let context = app.canvas.getContext("2d");
    context.clearRect(0,0,app.canvas.width, app.canvas.height);
}

//Button Setups
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