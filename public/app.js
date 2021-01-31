$(document).ready(function() {

    //check if darkmode is enabled
    const localStorageCheck = localStorage.getItem("darkMode")
    if (localStorageCheck && localStorageCheck !== null) {
        localStorageCheck === "false" ? $("#toggle").prop("checked", true) : $("#toggle").prop("checked", false)
    }

    const hourOfDay = new Date().getHours();
    const welcome = $(".welcome");
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; //using this to print out todays date
    const whatDayIsIt = daysOfWeek[new Date().getDay()];
    const $ulElement = $("#ulElement")
    const ulChildren = $("ul").children().length;

    $(".time").html(getTime())
    $(".date").html(`${whatDayIsIt}, ${getDate()}`)

    if (ulChildren <= 0) {
        const $header = $("<h1>").text("Wohoo! Looks like it's time to sit back and relax for now!").fadeIn(300)
        const $newImg = $("<img>").attr("src", "./../assets/chillin.svg").attr("alt", "A relaxed cat").fadeIn(300)
        $ulElement.append($header).append($newImg);

        if ($ulElement.has("li") && $ulElement.has("h1")) {
            $ulElement.remove($header).remove($newImg)
        }
    
    } 


    //print out personalized welcome message based on the time of day
    sayHi(hourOfDay, welcome)

    setInterval(function(){
        $(".time").html(getTime())
    }, 1000);

    //darkmode toggle
    $("#toggle").on("click", function() {
        if (!$(this).prop("checked")) {

            document.body.style.setProperty("--gradient-from", "#394265")
            document.body.style.setProperty("--gradient-to", "#928DAB")
            document.body.style.setProperty("--stroke-color", "#394265")
            document.body.style.setProperty("--ul-bg-main", "hsl(227.7,27.8%,29%)")
            document.body.style.setProperty("--font-color-main", "#f5d1ee")
            window.localStorage.setItem("darkMode", "true")
        } else {
            document.body.style.setProperty("--gradient-from", "#ece9e6")
            document.body.style.setProperty("--gradient-to", "#ffffff")
            document.body.style.setProperty("--stroke-color", "#fee440")
            document.body.style.setProperty("--ul-bg-main", "#f4f5f5")
            document.body.style.setProperty("--font-color-main", "#202147")
            window.localStorage.setItem("darkMode", "false")
                }
    })
})
// -------- functions

const sayHi = (time, element) => {
    if (time >= 0 && time < 12) {
        element.html("Good morning!");
    } else if (time >= 12 && time <= 17) {
        element.html("Good afternoon!");
    } else if (time >= 17 && time <= 23) {
        element.html("Good evening!");
    } else {
        console.log("error")
    }
}


function getTime() {
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    
    return `${hours}:${minutes}:${seconds}`;
}

function getDate() {
    return `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
}
