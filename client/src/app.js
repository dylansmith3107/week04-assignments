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
  //renderComments();
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
  commentsContainer.innerHTML = "";
  for (let i = 0; i < commentData.length; i++) {
    const commentDiv = document.createElement("div");
    commentDiv.className = "comment-div";
    commentsContainer.appendChild(commentDiv);

    const userDiv = document.createElement("div");
    userDiv.className = "user-div";
    commentDiv.appendChild(userDiv);

    const userImg = document.createElement("img");
    userImg.src = "./public/images/user-img.png";
    userImg.alt =
      "Small user icon, illustrated by Kushal Mistri, taken from unsplash.com";
    userImg.className = "user-img";
    userDiv.appendChild(userImg);

    const name = document.createElement("p");
    name.textContent = commentData[i].name;
    userDiv.appendChild(name);

    const comment = document.createElement("p");
    comment.textContent = commentData[i].comment;
    commentDiv.appendChild(comment);
  }
}

async function renderComments() {
  const guestbookApi = await getGuestbookApi();
  createComments(guestbookApi);
}

renderComments();

const refreshBtn = document.getElementById("refresh-btn");

refreshBtn.addEventListener("click", () => {
  renderComments();
});
