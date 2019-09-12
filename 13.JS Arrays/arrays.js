//primitive task manager

window.setTimeout(function () {

    var taskList = [];
    do {
        var choice = prompt("Select an option");

        if (choice !== "new" && choice !== "list" && choice !== "delete" && choice !== "quit") {
            alert("invalide option, please enter again");
        } else if (choice === "new") {
            addItem(taskList);
        } else if (choice === "list") {
            listItems(taskList);
        } else if (choice === "delete") {
            deleteItem(taskList);
        } else {
            alert("thank you for using our software");
        }
    } while (choice !== "quit");

}, 500);

function addItem(taskList) {
    var input = prompt("enter new task");
    taskList.push(input);
    alert("you have " + taskList.length + " tasks");
}

function listItems(taskList) {
    console.log("**********");
    for (var i = 0; i < taskList.length; i++) {
        console.log(i + ": " + taskList[i]);
    }
    console.log("**********");
}

function deleteItem(taskList) {
    var index = prompt("Please select To Do index");
    taskList.splice(index, 1);
    listItems(taskList);
}