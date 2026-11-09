class DailyTask {
    constructor(name, status) {
        this.name = name;
        this.status = ["done", "in progress", "future"].includes(status) ? status : "not defined";
    }
}

function showHeader() {
    document.querySelector("header").innerHTML = "<h1>Список завдань на день</h1>";
}

function showTasks(obj) {
    for (let a of obj) {
        let task = new DailyTask(a.name, a.status);
        let listItem = document.createElement("li");
        listItem.textContent = task.name;

        if (task.status === "done") {
            document.getElementById("list-done").appendChild(listItem);
        } else if (task.status === "in progress") {
            document.getElementById("list-progress").appendChild(listItem);
        } else if (task.status === "future") {
            document.getElementById("list-future").appendChild(listItem);
        }
    }
}

async function populate() {
    const requestURL = "https://api.jsonbin.io/v3/b/6af0f9f0ac6210605a783df7";
    const request = new Request(requestURL);
    const response = await fetch(request);

    if (response.ok) {
        const data = await response.json();

        showHeader();
        showTasks(data.record);
    } else {
        alert("Помилка");
    }
}

populate();