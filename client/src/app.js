//==================================================================
//Submissions

const guestbookForm = document.getElementById("guestbook-form");

async function handleGuestbookSubmit(event) {
  event.preventDefault();
  const formDataTemplate = new FormData(guestbookForm);
  const formValues = Object.fromEntries(formDataTemplate);
  console.log(formValues);

  await fetch("http://localhost:8080/guestbook", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formValues }),
  });
}

guestbookForm.addEventListener("submit", handleGuestbookSubmit);

//===================================================================
//Rendered Comments

async function getGuestbookApi() {
  const response = await fetch("http://localhost:8080/guestbook");

  const data = await response.json();
  console.log(data);
  return data;
}

const commentsContainer = document.getElementById("comments-container");

function createComments(commentData) {
  for (let i = 0; i < commentData.length; i++) {
    const div = document.createElement("div");
    div.className = "comment-div";
    commentsContainer.appendChild(div);

    const name = document.createElement("p");
    name.textContent = `Name: ${commentData[i].name}`;
    div.appendChild(name);

    const comment = document.createElement("p");
    comment.textContent = `Comment: ${commentData[i].comment}`;
    div.appendChild(comment);
  }
}

async function renderComments() {
  const guestbookApi = await getGuestbookApi();
  createComments(guestbookApi);
}

renderComments();
