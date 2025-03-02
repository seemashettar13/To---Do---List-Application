document.addEventListener("DOMContentLoaded", function () {
    const inputBox = document.getElementById("input-btn");
    const listContainer = document.getElementById("list-container");
    const button = document.getElementById("user-btn");

    button.addEventListener("click", addTask);

    function addTask() {

        if (inputBox.value.trim() === '') {
            alert("You need to write something to add a task!");
        } 
        else {

            let li = document.createElement("li");
            li.innerHTML = inputBox.value;

            let deleteElement = document.createElement("span");
            deleteElement.innerHTML = `<i class="bx bxs-message-alt-x"></i>`;
            deleteElement.classList.add("deleteContainer");

            li.appendChild(deleteElement);
            listContainer.appendChild(li);

            //event listener for deleting task
            deleteElement.addEventListener("click", function () {
                li.remove();
                saveData();
            });

            //event listener for marking task as completed
            li.addEventListener("click", function () {
                li.classList.toggle("checked");
                saveData();
            });

            inputBox.value = "";
            saveData();
        }
    }

    function saveData() {
        localStorage.setItem("data", listContainer.innerHTML);
    }

    function displayTask() {
        listContainer.innerHTML = localStorage.getItem("data") || "";

        //reattaching event listeners after loading tasks from localStorage
        let tasks = listContainer.querySelectorAll("li");
        tasks.forEach((li) => {
            let deleteElement = li.querySelector(".deleteContainer");

            li.addEventListener("click", function () {
                li.classList.toggle("checked");
                saveData();
            });

            deleteElement.addEventListener("click", function () {
                li.remove();
                saveData();
            });
        });
    }

    displayTask();
});


