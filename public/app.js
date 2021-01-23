$(document).ready(function() {
    const hourOfDay = new Date().getHours();
    const welcome = $(".welcome");



    sayHi(hourOfDay, welcome)


    // $(".todo-item").on("click", changeAndSumbit)

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

function changeAndSumbit() {
    const $element = $(this);
    const $inputTag = $("<form>").attr("action", "/edit").attr("method", "post").attr("id", "editTodo").val(`
        <input type="text" value="<%=elementToBeEdited.name%>" />
        <input type="text" value="<%=elementToBeEdited._id%>" hidden />`);
    $element.replaceWith($inputTag)

    const saveChanges = function() {
        $element.text($inputTag.val());
        $inputTag.replaceWith($element);
    }

    $inputTag.one("blur", saveChanges)
}