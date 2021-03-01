function onSubmitBtnClick() {
    const inputDate = (<HTMLInputElement>document.getElementById("endtime")).value
    if (inputDate) {
        const dateArray = inputDate.split(":")
        sessionStorage.setItem("dateArr", JSON.stringify(dateArray))
    }
    location.href = "countdown.html";
}
