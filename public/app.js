$(document).ready(function() {
    const hourOfDay = new Date().getHours();
    const welcome = $(".welcome");

    sayHi(hourOfDay, welcome)

    setInterval(function(){
        $(".time").html(getTime())
    }, 1000);

})

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
    return `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
}