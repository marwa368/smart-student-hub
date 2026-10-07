// =========================
// TO-DO LIST
// =========================
 
const taskInput = document.getElementById("taskInput");
const taskButton = document.getElementById("taskButton");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
 
taskList.style.display = "none";
 
taskButton.addEventListener("click", function () {
 
    if (taskList.style.display === "none") {
        taskList.style.display = "block";
        taskButton.textContent = "Hide Tasks";
    } else {
        taskList.style.display = "none";
        taskButton.textContent = "View Tasks";
    }
 
});
 
addTaskButton.addEventListener("click", function () {
 
    const task = taskInput.value.trim();
 
    if (task === "") {
        alert("Please enter a task!");
        return;
    }
 
    const listItem = document.createElement("li");
 
    listItem.textContent = task;
 
  listItem.addEventListener("click", function () {
    listItem.classList.toggle("completed");
 
    localStorage.setItem(
        "tasks",
        taskList.innerHTML
    );
 
    updateDashboard();
});
 
 
    const deleteButton = document.createElement("button");
 
    deleteButton.textContent = "Delete";
 
    deleteButton.addEventListener("click", function (event) {
        event.stopPropagation();
        listItem.remove();
        updateDashboard();
 
        localStorage.setItem("tasks", taskList.innerHTML);
    });
 
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
 
    localStorage.setItem("tasks", taskList.innerHTML);
 
    taskInput.value = "";

    updateDashboard();
 
 
});
 
 
// =========================
// STUDY TIMER
// =========================
 
const timerButton = document.getElementById("timerButton");
const timerDisplay = document.getElementById("timerDisplay");
const resetTimerButton = document.getElementById("resetTimerButton");
 
let timeLeft = 25 * 60;
let timer = null;
 
timerButton.addEventListener("click", function () {
 
    if (timer) {
        return;
    }
 
    timer = setInterval(function () {
 
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
 
        timerDisplay.textContent =
            String(minutes).padStart(2, "0") + ":" +
            String(seconds).padStart(2, "0");
 
        timeLeft--;
 
        if (timeLeft < 0) {
 
            clearInterval(timer);
            timer = null;
 
            timerDisplay.textContent = "Time's up! 🎉";
        }
 
    }, 1000);
 
});
 
resetTimerButton.addEventListener("click", function () {
 
    clearInterval(timer);
 
    timer = null;
    timeLeft = 25 * 60;
 
    timerDisplay.textContent = "25:00";
 
});
 
 
// =========================
// NOTES
// =========================
 
const notesButton = document.getElementById("notesButton");
const notesSection = document.getElementById("notesSection");
 
notesButton.addEventListener("click", function () {
 
    if (notesSection.style.display === "none") {
 
        notesSection.style.display = "block";
        notesButton.textContent = "Hide Notes";
 
    } else {
 
        notesSection.style.display = "none";
        notesButton.textContent = "Open Notes";
 
    }
 
});
 
 
const noteTitle = document.getElementById("noteTitle");
const noteText = document.getElementById("noteText");
const addNoteButton = document.getElementById("addNoteButton");
const notesList = document.getElementById("notesList");
 
addNoteButton.addEventListener("click", function () {
 
    const title = noteTitle.value.trim();
    const text = noteText.value.trim();
 
    if (title === "" || text === "") {
        alert("Please enter a title and note!");
        return;
    }
 
    const note = document.createElement("div");
 
    const titleElement = document.createElement("h4");
    titleElement.textContent = title;
 
    const textElement = document.createElement("p");
    textElement.textContent = text;
 
    const deleteNoteButton = document.createElement("button");
 
    deleteNoteButton.textContent = "Delete";
    deleteNoteButton.className = "deleteNoteButton";
 
    deleteNoteButton.addEventListener("click", function () {
 
        note.remove();
 
        localStorage.setItem(
            "notes",
            notesList.innerHTML
        );
 
    });
 
    note.appendChild(titleElement);
    note.appendChild(textElement);
    note.appendChild(deleteNoteButton);
 
    notesList.appendChild(note);
    localStorage.setItem(
    "notes",
    notesList.innerHTML
);
updateDashboard();
 
    localStorage.setItem(
        "notes",
        notesList.innerHTML
    );
 
    noteTitle.value = "";
    noteText.value = "";
 
});
 
 
// =========================
// PROGRESS
// =========================
 
const subjectInput = document.getElementById("subjectInput");
const progressInput = document.getElementById("progressInput");
const progressButton = document.getElementById("progressButton");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
 
progressButton.addEventListener("click", function () {
 
    const subject = subjectInput.value.trim();
    const progress = Number(progressInput.value);
 
    if (
        subject === "" ||
        progress < 0 ||
        progress > 100
    ) {
 
        alert(
            "Please enter a subject and progress between 0 and 100!"
        );
 
        return;
    }
 
    progressText.textContent =
        subject + " Progress: " + progress + "%";
 
    progressFill.style.width = progress + "%";
    updateDashboard();
 
 
});
 
 
// =========================
// LOAD SAVED TASKS
// =========================
 
const savedTasks = localStorage.getItem("tasks");
 
if (savedTasks) {
 
    taskList.innerHTML = savedTasks;
 
    const savedTaskButtons =
        taskList.querySelectorAll("button");
 
    savedTaskButtons.forEach(function (button) {
 
        button.addEventListener("click", function (event) {
 
            event.stopPropagation();
 
            button.parentElement.remove();
 
            localStorage.setItem(
                "tasks",
                taskList.innerHTML
            );
 
        });
 
    });
 
}
 
 
// =========================
// LOAD SAVED NOTES
// =========================
 
const savedNotes = localStorage.getItem("notes");
 
if (savedNotes) {
 
    notesList.innerHTML = savedNotes;
 
    const savedNoteButtons =
        notesList.querySelectorAll(".deleteNoteButton");
 
    savedNoteButtons.forEach(function (button) {
 
        button.addEventListener("click", function () {
 
            button.parentElement.remove();
 
            localStorage.setItem(
                "notes",
                notesList.innerHTML
            );
 
        });
 
    });
 
}
 
 
// =========================
// DARK MODE
// =========================
function toggleDarkMode() {
 
 document.body.classList.toggle("dark-mode");
 
 const button = document.getElementById("darkModeButton");
 
 if (document.body.classList.contains("dark-mode")) {
 button.textContent = "☀️ Light Mode";
 } else {
 button.textContent = "🌙 Dark Mode";
 }
 
}
 // =========================
// DASHBOARD STATS
// =========================
 
const totalNotes = document.getElementById("totalNotes");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const dashboardProgress = document.getElementById("dashboardProgress");
 
function updateDashboard() {
 
    const notes = notesList.querySelectorAll(":scope > div").length;
    const tasks = taskList.querySelectorAll("li").length;
    const completed = taskList.querySelectorAll("li.completed").length;
 
    totalNotes.textContent = notes;
    totalTasks.textContent = tasks;
    completedTasks.textContent = completed;
 
    const currentProgress = progressFill.style.width || "0%";
    dashboardProgress.textContent = currentProgress;
}
 
updateDashboard();
 
 