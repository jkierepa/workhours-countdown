function onSubmitBtnClick() {
    var inputDate = document.getElementById("endtime").value;
    if (inputDate) {
        var dateArray = inputDate.split(":");
        sessionStorage.setItem("dateArr", JSON.stringify(dateArray));
    }
    location.href = "countdown.html";
}
