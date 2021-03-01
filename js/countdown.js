function calculateTimeDifference(endDate, startDate) {
    var milisecTimeDiff;
    milisecTimeDiff = endDate.getTime() - startDate.getTime();
    return milisecTimeDiff;
}
function parseMilisecToTime(milisecTime) {
    var milisInHour = 3600000;
    var milisInMin = 60000;
    var milisInSec = 1000;
    var hoursLeft = Math.floor(milisecTime / milisInHour);
    milisecTime -= hoursLeft * milisInHour;
    var minutesLeft = Math.floor(milisecTime / milisInMin);
    milisecTime -= minutesLeft * milisInMin;
    var secondsLeft = Math.floor(milisecTime / milisInSec);
    var result = hoursLeft + ":" + minutesLeft + ":" + secondsLeft;
    return result;
}
function startCoundown(displayElement, dateTarget) {
    setInterval(function () {
        var dateCurr = new Date();
        var milis = calculateTimeDifference(dateTarget, dateCurr);
        var strDifference = parseMilisecToTime(milis);
        displayElement.textContent = strDifference;
        if (milis <= 0) {
            displayElement.textContent = "FINISHED!";
        }
    }, 1000);
}
function startOvertimeCountdown(displayElement, dateTarget) {
    setInterval(function () {
        var dateCurr = new Date();
        var milis = calculateTimeDifference(dateTarget, dateCurr);
        milis = -1 * milis;
        var strDifference = parseMilisecToTime(milis);
        if (milis >= 0) {
            var overtimeStr = "YOUR OVERTIME: " + strDifference;
            displayElement.textContent = overtimeStr;
        }
    }, 1000);
}
function onCountdownLoad() {
    var dateArray = JSON.parse(sessionStorage.getItem('dateArr'));
    dateTarget.setHours(parseInt(dateArray[0]), parseInt(dateArray[1]), 0);
    var displayDiffTime = document.querySelector('#diffTime');
    startCoundown(displayDiffTime, dateTarget);
    var displayOvertime = document.querySelector('#overtime');
    startOvertimeCountdown(displayOvertime, dateTarget);
}
function onSubmitBtnClick() {
    var inputDate = document.getElementById("endtime").value;
    var inputString = String(inputDate);
    if (inputString) {
        var dateArray = inputString.split(":");
        sessionStorage.setItem("dateArr", JSON.stringify(dateArray));
    }
    location.href = "countdown.html";
}
var dateTarget = new Date();
dateTarget.setHours(16, 0, 0);
