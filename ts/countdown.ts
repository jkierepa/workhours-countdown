function calculateTimeDifference(endDate: Date, startDate: Date): number{
    const milisecTimeDiff = endDate.getTime() - startDate.getTime();
    return milisecTimeDiff
}

function parseMilisecToTime(milisecTime: number): string{
    const milisInHour = 3600000;
    const milisInMin = 60000;
    const milisInSec = 1000;

    let hoursLeft = Math.floor(milisecTime / milisInHour);
    milisecTime -= hoursLeft * milisInHour;

    let minutesLeft = Math.floor(milisecTime / milisInMin);
    milisecTime -= minutesLeft * milisInMin;

    let secondsLeft = Math.floor(milisecTime / milisInSec);

    let result = hoursLeft + ":" + minutesLeft + ":" + secondsLeft;
    return result
}

function startCoundown(displayElementDiffTime: Element, displayElementOvertime: Element, dateTarget: Date): void {
    setInterval(function() {
        const dateCurr = new Date();

        let milis = calculateTimeDifference(dateTarget, dateCurr);
        const strDifference = parseMilisecToTime(milis);
        displayElementDiffTime.textContent = strDifference;
        
        if (milis <= 0) {
            displayElementDiffTime.textContent = "FINISHED!";
            milis = -1 * milis
            const strDifference = parseMilisecToTime(milis)
            
            if (milis >= 0) {
                const overtimeStr = "YOUR OVERTIME: " + strDifference;
                displayElementOvertime.textContent = overtimeStr;
            }
        }
    }, 1000)
}

function onCountdownLoad(dateTarget: Date):void {
    const dateArray = JSON.parse(sessionStorage.getItem('dateArr'))
    dateTarget.setHours(parseInt(dateArray[0]), parseInt(dateArray[1]), 0)

    const displayDiffTime = document.querySelector('#diffTime');
    const displayOvertime = document.querySelector('#overtime');
    startCoundown(displayDiffTime, displayOvertime, dateTarget);
}

const dateTarget = new Date();
dateTarget.setHours(16, 0, 0)
