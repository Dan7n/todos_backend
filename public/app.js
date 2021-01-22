$(document).ready(function() {

    // $(".todo-item").on("click", changeAndSumbit)

})

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