
let subject = document.getElementById("subject");
let question = document.getElementById("question");
let submit = document.getElementById("submit");
let list = document.getElementById("list");
let submitForm = document.getElementById("submitForm");
let responseForm = document.getElementById("responseForm");
let responseSubject = document.getElementById("response_subject");
let responseQuestion = document.getElementById("response_question");
let responseSection = document.getElementById("response_section");
let searchQuestion = document.getElementById("searchQuestion");
let mainframe = document.getElementById("mainframe");

let selectedTaskId = null;
let selectedDiv = null;

let data = getTaskFromLocalStorage();
displayTasks();

mainframe.addEventListener("click", function (event) {
  if (event.target.closest("#submit")) {
    submitQuestion(event);
  }
  else if (event.target.closest(".favoriteBtn")) {
    favoriteQuestion(event);
  }
  else if (event.target.closest("#newQuestion")) {
    openNewQuestion(event);
  }
  else if (event.target.closest("#submit_response")) {
    submitResponseFunction(event);
  }
  else if (event.target.closest(".likeBtn")) {
    likeResponse(event);
  }
  else if (event.target.closest(".dislikeBtn")) {
    dislikeResponse(event);
  }
  else if (event.target.closest("#resolve")) {
    resolveQuestions(event);
  }
  else if (event.target.closest(".questionBox")) {
    openQuestion(event);
  }
})
searchQuestion.addEventListener("input", function () {
  let searchValue = searchQuestion.value.toLowerCase().trim();
  list.innerHTML = "";
  let filterData = data.filter(
    function (questionData) {
      let question = questionData.question.toLowerCase();
      let subject = questionData.subject.toLowerCase();
      return !questionData.resolved &&
        (subject.includes(searchValue) || question.includes(searchValue))

    }
  );
  filterData.forEach(function (filteredQuestion) {
    addTask(filteredQuestion, searchValue);
  }
  );
  if (filterData.length === 0) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("questionBox");
    newDiv.innerHTML = `
            <h3>NO MATCH FOUND</h3>
        `;
    list.appendChild(newDiv);
  }
});
function highlightText(text, searchValue) {
  if (searchValue === "") { return text; }
  let regex = new RegExp(searchValue, "gi");
  return text.replace(regex, "<mark>$&</mark>");
};
function submitQuestion(event) {
  event.preventDefault();
  let subjectValue = subject.value.trim();
  let questionValue = question.value.trim();
  if (subjectValue == "" || questionValue == "") {
    Swal.fire({
      title: "WARNING",
      text: "Enter Subject or Description",
      icon: "question"
    });
    return;
  }
  let id = Date.now()
  console.log(id);
  let newQuestion = {
    subject: subjectValue,
    question: questionValue,
    id: id,
    responses: [],
    favorite: false,
    resolved: false,
    createdAt: Date.now()
  };
  data.push(newQuestion);
  saveDataInLocalStorage(data);
  addTask(newQuestion);
  subject.value = "";
  question.value = "";
}
function favoriteQuestion(event) {

  event.stopPropagation();
  let favoriteBtn = event.target.closest(".favoriteBtn");

  let questionBox = favoriteBtn.closest(".questionBox");
  let taskId = Number(questionBox.dataset.id);
  let questionData = data.find(function (questionItem) {
    return questionItem.id === taskId;
  });
  if (!questionData) return;
  questionData.favorite = !questionData.favorite;
  favoriteBtn.textContent =
    questionData.favorite ? "★" : "☆";
  questionBox.classList.toggle(
    "favorite",
    questionData.favorite
  );
  saveDataInLocalStorage(data);
}
function openNewQuestion() {
  submitForm.style.display = "block";
  responseForm.style.display = "none";
}
function submitResponseFunction(event) {
  event.preventDefault();
  let name = responseSubject.value.trim();
  let comment = responseQuestion.value.trim();
  if (name == "" || comment == "") {
    Swal.fire({
      title: "WARNING",
      text: "Enter Name and Comment",
      icon: "warning"
    });

    return;
  }
  let selectedTask = data.find(function (task) {
    return task.id === selectedTaskId;
  });
  if (!selectedTask) return;

  let response = {
    name: name,
    comment: comment, likes: 0, dislikes: 0
  };
  selectedTask.responses.push(response);
  saveDataInLocalStorage(data);
  displayResponses(selectedTask);
  responseSubject.value = "";
  responseQuestion.value = "";
}
function likeResponse(event) {
  let likeButton = event.target.closest(".likeBtn");
  let responseBox = likeButton.closest(".responseBox");
  let responseIndex = Number(responseBox.dataset.responseIndex);
  let selectedTask = data.find(function (task) {
    return task.id === selectedTaskId;
  });
  if (!selectedTask) return;
  let response = selectedTask.responses[responseIndex];
  if (!response) return;
  response.likes = (response.likes || 0) + 1;
  saveDataInLocalStorage(data);
  displayResponses(selectedTask);

}
function dislikeResponse(event) {
  let dislikeButton = event.target.closest(".dislikeBtn");
  let responseBox = dislikeButton.closest(".responseBox");
  let responseIndex = Number(responseBox.dataset.responseIndex);
  let selectedTask = data.find(function (task) {
    return task.id === selectedTaskId;
  });
  if (!selectedTask) return;
  let response = selectedTask.responses[responseIndex];
  if (!response) return;
  response.dislikes = (response.dislikes || 0) + 1;
  saveDataInLocalStorage(data);
  displayResponses(selectedTask);

}
function addTask(questionData, searchValue = "") {
  let newDiv = document.createElement("div");
  newDiv.classList.add("questionBox");
  newDiv.dataset.id = questionData.id;
  newDiv.innerHTML = `
    <h3>${highlightText(questionData.subject, searchValue)}</h3>
    <h5>${highlightText(questionData.question, searchValue)}</h5>
     <button class="favoriteBtn">
            ${questionData.favorite ? "★" : "☆"}
        </button>
        <small class="time" data-id="${questionData.id}">${getTimeAgo(questionData.createdAt)}</small>
  `;
  list.appendChild(newDiv);

  if (questionData.favorite) {
    newDiv.classList.add("favorite");
  }

}
function openQuestion(event) {
  let questionBox = event.target.closest(".questionBox");
  if (!questionBox) return;

  let taskId = Number(questionBox.dataset.id);
  let task = data.find(function (task) {
    return task.id === taskId;
  });
  if (!task) {
    return;
  }
  selectedTaskId = task.id;
  console.log(selectedTaskId);
  selectedDiv = questionBox;
  console.log(selectedDiv);
  submitForm.style.display = "none";
  responseForm.style.display = "flex";

  let displayBox = document.getElementById("displayBox");
  displayBox.innerHTML = `
      <span>Question</span>
      <div style="
        background-color:gray;
        padding:3px;
        margin:3px 0px 3px 0px;
      ">
        <h3>${task.subject}</h3>
        <h5>${task.question}</h5>
      </div>
      <button id="resolve">Resolve</button>
    `;
  displayResponses(task);
};
function getTaskFromLocalStorage() {

  let tasksData = localStorage.getItem("data");
  if (!tasksData || tasksData === "undefined") {
    return [];
  }
  try {
    let parsedData = JSON.parse(tasksData);
    if (!Array.isArray(parsedData)) {
      return [];
    }

    return parsedData;
  } catch (error) {
    localStorage.removeItem("data");
    return [];
  }
}
function saveDataInLocalStorage(data) {
  localStorage.setItem("data", JSON.stringify(data));
}
function displayTasks() {

  data.forEach(function (task) {
    if (!task.responses) {
      task.responses = [];
    }
    if (task.favorite === undefined) {
      task.favorite = false;
    }
    if (task.resolved === undefined) {
      task.resolved = false;
    }
    if (!task.resolved) {
      addTask(task);
    }

  });
  saveDataInLocalStorage(data);
}
function displayResponses(task) {
  responseSection.innerHTML = `<span>Response</span>`;
  let sortedresponses = [...task.responses].sort(function (a, b) {
    return (b.likes || 0) - (a.likes || 0);
  });
  sortedresponses.forEach(function (response) {
    let responseIndex = task.responses.indexOf(response);
    let responseDiv = document.createElement("div");
    responseDiv.classList.add("responseBox");
    responseDiv.dataset.responseIndex = responseIndex;
    responseDiv.innerHTML = `
      <h3>${response.name}</h3>
      <span style="font-size:10px;margin:0px;">
        ${response.comment}
      </span>
    `;
    responseSection.appendChild(responseDiv);
    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("buttonContainer");
    let likeButton = document.createElement("button");
    likeButton.classList.add("likeBtn");
    likeButton.textContent = "LIKE:";
    let likeCount = document.createElement("span");
    likeCount.textContent = response.likes || 0;
    likeButton.appendChild(likeCount);
    let dislikeButton = document.createElement("button");
    dislikeButton.classList.add("dislikeBtn");
    dislikeButton.textContent = "DISLIKE:";
    let dislikeCount = document.createElement("span");
    dislikeCount.textContent = response.dislikes || 0;
    dislikeButton.appendChild(dislikeCount);
    buttonContainer.appendChild(likeButton);
    buttonContainer.appendChild(dislikeButton);
    responseDiv.appendChild(buttonContainer);
  });
}
function resolveQuestions() {

  // event.stopPropagation();
  let task = data.find(function (task) {
    return task.id === selectedTaskId;
  })
  if (!task) return;
  task.resolved = true;
  saveDataInLocalStorage(data);
  if (selectedDiv) {
    selectedDiv.remove();
  }

  responseForm.style.display = "none";
  submitForm.style.display = "block";
  selectedDiv = null;
  selectedTaskId = null;


}
function getTimeAgo(createdAt) {
  let currentTime = Date.now();
  let difference = currentTime - createdAt;
  let sec = Math.floor(difference / 1000);
  if (sec < 10) {
    return "few seconds ago";
  }
  if (sec < 60) {
    return sec + "seconds ago";
  }
  let min = Math.floor(sec / 60);
  if (min < 60) {
    return min + "minutes ago";
  }
  let hour = Math.floor(min / 60);
  if (hour < 24) {
    return hour + "hours ago";
  }
  let day = Math.floor(hour / 24);
  return day + "days ago";
}
setInterval(function () {
  document.querySelectorAll(".time").forEach(
    function (time) {
      let taskId = time.dataset.id;
      let task = data.find(function (task) {
        return taskId == task.id;
      })
      if (task) {
        time.textContent = getTimeAgo(task.createdAt);
      }
    }
  )
}, 1000);




