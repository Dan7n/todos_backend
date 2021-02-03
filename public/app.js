$(document).ready(function() {

    //variables ----------------
    const hourOfDay = new Date().getHours();
    const welcome = $(".welcome");
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; //using this to print out todays date
    const whatDayIsIt = daysOfWeek[new Date().getDay()];
    const $ulElement = $("#ulElement")
    const ulChildren = $("ul").children().length;
    const nightModeToggle = $("#toggle");


    //check if darkmode is enabled
    const localStorageCheck = JSON.parse(localStorage.getItem("darkMode"))
    if (localStorageCheck && localStorageCheck !== null) {
        console.log(localStorageCheck)
        nightModeToggle.prop("checked", localStorageCheck)
    }
// if (localStorageCheck === "false") {
        //     toggleNightModeOn()
        //     $("#toggle").prop("checked", true)
        // } else if (localStorageCheck === "true") {
        //     toggleNightModeOff()
        //     $("#toggle").prop("checked", false)
        // }


    //display a live clock and date of year
    $(".time").html(getTime())
    $(".date").html(`${whatDayIsIt}, ${getDate()}`)


    //if no todos left in todo list
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

    //live clock
    setInterval(function(){
        $(".time").html(getTime())
    }, 1000);

    //darkmode toggle
    // $("#toggle").on("click", toggleNightMode)
    $("#toggle").on("click", function (){
        console.log($(this).prop("checked"), localStorageCheck)

        toggleNightMode($(this))
    })
})


// * --------------- functions ---------------

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


// !TODO fix this:
function toggleNightMode(element) {
    if (element.prop("checked") === true){
        document.body.style.setProperty("--gradient-from", "#ece9e6")
        document.body.style.setProperty("--gradient-to", "#ffffff")
        document.body.style.setProperty("--stroke-color", "#fee440")
        document.body.style.setProperty("--ul-bg-main", "#f4f5f5")
        document.body.style.setProperty("--font-color-main", "#202147")
        window.localStorage.setItem("darkMode", "false") } 
        
        else if (element.prop("checked") === false) {
            document.body.style.setProperty("--gradient-from", "#394265")
            document.body.style.setProperty("--gradient-to", "#928DAB")
            document.body.style.setProperty("--stroke-color", "#394265")
            document.body.style.setProperty("--ul-bg-main", "hsl(227.7,27.8%,29%)")
            document.body.style.setProperty("--font-color-main", "#f5d1ee")
            window.localStorage.setItem("darkMode", "true")    
        }
    }  


function toggleNightModeOn() {
    window.localStorage.setItem("darkMode", "true")
    document.body.style.setProperty("--gradient-from", "#394265")
    document.body.style.setProperty("--gradient-to", "#928DAB")
    document.body.style.setProperty("--stroke-color", "#394265")
    document.body.style.setProperty("--ul-bg-main", "hsl(227.7,27.8%,29%)")
    document.body.style.setProperty("--font-color-main", "#f5d1ee")
}

function toggleNightModeOff() {
    document.body.style.setProperty("--gradient-from", "#394265")
    document.body.style.setProperty("--gradient-to", "#928DAB")
    document.body.style.setProperty("--stroke-color", "#394265")
    document.body.style.setProperty("--ul-bg-main", "hsl(227.7,27.8%,29%)")
    document.body.style.setProperty("--font-color-main", "#f5d1ee")
    window.localStorage.setItem("darkMode", "true")
}