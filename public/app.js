$(document).ready(function() {
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
    const minutes = new Date().getMinutes() > 10 ? new Date().getMinutes().toString() : "0"+new Date().getMinutes();
    //minutes > 10 ? "0" + minutes.toString() : minutes.toString()
    return `${new Date().getHours()}:${minutes}:${new Date().getSeconds()}`;
}

function getDate() {
    return `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
}
