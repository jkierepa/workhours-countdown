function calculateTimeDifference(endDate: Date, startDate: Date): number{
    let milisecTimeDiff: number;
    milisecTimeDiff = endDate.getTime() - startDate.getTime()
    return milisecTimeDiff
}

function parseMilisecToTime(milisecTime: number): string{
    let milisInHour = 3600000
    let milisInMin = 60000
    let milisInSec = 1000

    let hoursLeft = Math.floor(milisecTime / milisInHour)
    milisecTime -= hoursLeft * milisInHour

    let minutesLeft = Math.floor(milisecTime / milisInMin)
    milisecTime -= minutesLeft * milisInMin

    let secondsLeft = Math.floor(milisecTime / milisInSec)

    let result = hoursLeft + ":" + minutesLeft + ":" + secondsLeft
    return result
}

function startCoundown(displayElement: Element, dateTarget: Date): void {
    setInterval(function() {
        let dateCurr = new Date();

        let milis = calculateTimeDifference(dateTarget, dateCurr)
        let strDifference = parseMilisecToTime(milis)
        displayElement.textContent = strDifference
        
        if (milis <= 0) {
            displayElement.textContent = "FINISHED!"
        }
    }, 1000)
}

function startOvertimeCountdown(displayElement: Element, dateTarget: Date): void {
    setInterval(function() {
        let dateCurr = new Date();

        let milis = calculateTimeDifference(dateTarget, dateCurr)
        milis = -1 * milis
        let strDifference = parseMilisecToTime(milis)
        
        if (milis >= 0) {
            let overtimeStr = "YOUR OVERTIME: " + strDifference;
            displayElement.textContent = overtimeStr;
        }
    }, 1000)
}

function onCountdownLoad() {
    let dateArray = JSON.parse(sessionStorage.getItem('dateArr'))
    dateTarget.setHours(parseInt(dateArray[0]), parseInt(dateArray[1]), 0)
    let displayDiffTime = document.querySelector('#diffTime');
    startCoundown(displayDiffTime, dateTarget);
    let displayOvertime = document.querySelector('#overtime');
    startOvertimeCountdown(displayOvertime, dateTarget);
}

function onSubmitBtnClick() {
    let inputDate = (<HTMLInputElement>document.getElementById("endtime")).value
    let inputString = String(inputDate)
    if (inputString) {
        let dateArray = inputString.split(":")
        sessionStorage.setItem("dateArr", JSON.stringify(dateArray))
    }
    location.href = "countdown.html";
}

var dateTarget = new Date();
dateTarget.setHours(16, 0, 0)
