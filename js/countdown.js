function calculateTimeDifference(endDate, startDate) {
    var milisecTimeDiff = endDate.getTime() - startDate.getTime();
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
function startCoundown(displayElementDiffTime, displayElementOvertime, dateTarget) {
    setInterval(function () {
        var dateCurr = new Date();
        var milis = calculateTimeDifference(dateTarget, dateCurr);
        var strDifference = parseMilisecToTime(milis);
        displayElementDiffTime.textContent = strDifference;
        if (milis <= 0) {
            displayElementDiffTime.textContent = "FINISHED!";
            milis = -1 * milis;
            var strDifference_1 = parseMilisecToTime(milis);
            if (milis >= 0) {
                var overtimeStr = "YOUR OVERTIME: " + strDifference_1;
                displayElementOvertime.textContent = overtimeStr;
            }
        }
    }, 1000);
}
function onCountdownLoad(dateTarget) {
    var dateArray = JSON.parse(sessionStorage.getItem('dateArr'));
    dateTarget.setHours(parseInt(dateArray[0]), parseInt(dateArray[1]), 0);
    var displayDiffTime = document.querySelector('#diffTime');
    var displayOvertime = document.querySelector('#overtime');
    startCoundown(displayDiffTime, displayOvertime, dateTarget);
}
var dateTarget = new Date();
dateTarget.setHours(16, 0, 0);
