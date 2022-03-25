const authorInput = document.querySelector(".authorBox");
const commentInput = document.querySelector(".commentBox");
const postButton = document.querySelector(".submit");
const comments = [];
let activeId = null;
let editComment = null;

postButton.addEventListener("click", postComment);

function postComment() {
  const author = authorInput.value;
  const comment = commentInput.value;

  if (author.trim().length == 0 || comment.trim().length == 0) return;
  const date = new Date();
  const time = `${date.toLocaleDateString()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const commentObj = {
    id: editComment ? editComment.id : uid(),
    author,
    comment,
    time,
    children: editComment ? editComment.children : [],
  };

  if (activeId) {
    findByIdAndAdd(comments, commentObj, activeId);
    activeId = null;
    const pTag = document.querySelector(".alert");
    pTag.classList.add("hide");
  } else if (editComment) {
    console.log(editComment);
    findByIdAndUpdate(comments, commentObj);
    editComment = null;
    const pTag = document.querySelector(".alert");
    pTag.classList.add("hide");
  } else {
    comments.push(commentObj);
  }
  authorInput.value = "";
  commentInput.value = "";

  const commentFragment = generateUI(comments, 0);
  const commentContainer = document.querySelector(".comments");
  removeAllChildNodes(commentContainer);
  commentContainer.appendChild(commentFragment);
}

function generateUI(comments, level) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < comments.length; i++) {
    const commentObj = comments[i];

    const childCommentBlock = generateUI(commentObj.children, level + 1);

    const commentBlock = createCommentBlock(commentObj, level);

    fragment.appendChild(commentBlock);
    fragment.appendChild(childCommentBlock);
  }

  return fragment;
}

function createCommentBlock(commentObj, level) {
  const commentBlock = document.createElement("div");
  commentBlock.classList.add("comment");
  commentBlock.setAttribute("id", commentObj.id);
  commentBlock.style.marginLeft = `${level * 2}rem`;

  const info = document.createElement("div");
  info.classList.add("info");
  info.innerHTML = `<span class="author">${commentObj.author}</span>
    <span class="time">${commentObj.time}</span>`;

  const comment = document.createElement("div");
  comment.innerText = commentObj.comment;

  commentBlock.appendChild(info);
  commentBlock.appendChild(comment);
  commentBlock.appendChild(document.createElement("hr"));

  const options = document.createElement("div");
  options.classList.add("options");
  const replyBtn = document.createElement("p");
  replyBtn.innerText = "Reply";
  replyBtn.setAttribute("id", commentObj.id);
  const EditBtn = document.createElement("p");
  EditBtn.innerText = "Edit";
  EditBtn.setAttribute("id", commentObj.id);
  const deleteBtn = document.createElement("p");
  deleteBtn.innerText = "Delete";
  deleteBtn.setAttribute("id", commentObj.id);

  replyBtn.addEventListener("click", prepareForReply);
  EditBtn.addEventListener("click", prepareForEdit);
  deleteBtn.addEventListener("click", prepareForDelete);

  options.appendChild(replyBtn);
  options.appendChild(EditBtn);
  options.appendChild(deleteBtn);

  commentBlock.appendChild(options);

  return commentBlock;
}

function prepareForReply(e) {
  activeId = e.target.id;
  const pTag = document.querySelector(".alert");
  pTag.innerText = "You are replying to " + activeId;
  pTag.classList.remove("hide");
  authorInput.focus();
}

function prepareForEdit(e) {
  editComment = findCommentToEdit(comments, e.target.id);
  console.log("1", editComment)
  const pTag = document.querySelector(".alert");
  pTag.innerText = e.target.id + " is editing the comment";
  pTag.classList.remove("hide");
  authorInput.value = editComment.author;
  commentInput.value = editComment.comment;
  authorInput.focus();
}

function prepareForDelete(e) {
  let commentToDelete = e.target.id;
  findByIdAndDelete(comments, commentToDelete);
  const commentFragment = generateUI(comments, 0);
  const commentContainer = document.querySelector(".comments");
  removeAllChildNodes(commentContainer);
  commentContainer.appendChild(commentFragment);
  alert("comment with id " + commentToDelete + " is successfully deleted");
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function findByIdAndAdd(comments, commentObj, activeId) {
  for (let i = 0; i < comments.length; i++) {
    let commentInfo = comments[i];
    if (commentInfo.id == activeId) {
      commentInfo.children.push(commentObj);
      return;
    }else if (commentInfo.children.length != 0){
      findByIdAndAdd(commentInfo.children, commentObj, activeId);
    }
  }
}

function findCommentToEdit(comments, commentId) {
  console.log(commentId, comments);
  for (let i = 0; i < comments.length; i++) {
    let commentInfo = comments[i];
    console.log(commentInfo.id, commentId)
    if (commentInfo.id == commentId) {
      return commentInfo;
    }else if (commentInfo.children.length != 0){
      return findCommentToEdit(commentInfo.children, commentId)
    }
  }
}

function findByIdAndUpdate(comments, updatedComment) {
  for (let i = 0; i < comments.length; i++) {
    let commentInfo = comments[i];
    if (commentInfo.id == updatedComment.id) {
      comments[i] = updatedComment;
      return;
    }else if (commentInfo.children.length != 0){
      findByIdAndUpdate(commentInfo.children, updatedComment)
    }
  }
}

function findByIdAndDelete(comments, id) {
  for (let i = 0; i < comments.length; i++) {
    let commentInfo = comments[i];
    if (commentInfo.id == id) {
      comments.splice(i, 1);
      return;
    }else if (commentInfo.children.length != 0){
      findByIdAndDelete(commentInfo.children, id);
    }
  }
}
