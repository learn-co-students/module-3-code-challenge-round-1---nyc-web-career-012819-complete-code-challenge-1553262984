document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2265 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const imageContainer = document.querySelector("#image")
  const imageNameDiv = document.querySelector("#name")
  const imagelikesDiv = document.querySelector("#likes")
  const imageCommentsUl = document.querySelector("#comments")
  const likeBtn = document.querySelector("#like_button")
  const commentBtn = document.querySelector("#submitBtn")
  const commentTextField = document.querySelector("#comment_input")
  const deleteBaseURL = 'https://randopic.herokuapp.com/comments/'

  // ================ Event Listeners =============

  imageCommentsUl.addEventListener("click", e => {
    if(e.target.className === "deleteBtn"){
      removeComment(e.target.parentNode)
      let targetComment = e.target.dataset.commentId
      deleteCommentFetch(targetComment)
    }
  })

  // --------- Like Btn -------
  likeBtn.addEventListener("click", e => {
    likeImage()
    patchLikeFetch()
  })

  // --------- Submit Btn -------
  submitBtn.addEventListener("click", e => {
    e.preventDefault()
    addComment()
    let comment = commentTextField.value
    postCommentFetch(comment)
    commentTextField.value = ""
  })

  // ============= Functions Section ==============

  function removeComment(target){
    target.remove()
  }

  function addComment(){
    let comment = commentTextField.value
    displayComment(comment)
  }

  // --------------- Like a Picture ----------
  function likeImage(){
    let likeCount = parseInt(imagelikesDiv.innerText)
    likeCount++
    imagelikesDiv.innerText = likeCount
  }

  // ------------- Display A Comment ---------
  function displayComment(comment){
    if (typeof(comment) == "object"){
      imageCommentsUl.innerHTML +=
      `
        <li>${comment.content} <button class="deleteBtn" data-comment-id=${comment.id} type="button">Delete</button></li>
      `
    }else {
      imageCommentsUl.innerHTML +=
      `
        <li>${comment} <button type="button">Delete</button></li>
      `
    }

  }

  // ------------- Display Image ----------
  function displayImage(image){
    imageContainer.src = image.url
    imageNameDiv.innerText = image.name
    imagelikesDiv.innerText = image.like_count
    // imageCommentsUl.
  }

  // =============== Fetch Section ==========

  // ------------------ DELETE Comment ---------

  function deleteCommentFetch(commentId){
    let deleteURL = `${deleteBaseURL}/${commentId}`
    let config =
    {
      method: "DELETE"
    }
    fetch(deleteURL, config)
  }

  // --------------- POST Comment ----------

  function postCommentFetch(comment){
    let data = {image_id: imageId, content: comment}
    let config =
    {
      method: "POST",
      headers:
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch(commentsURL, config)
    .then(resp => console.log(resp))
  }

  // ---------------- POST Like --------------

  function postLikeFetch(){

    let data = {image_id: imageId}
    let config =
    {
      method: "POST",
      headers:
      {
          'Accept': 'application/json',
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
  }
  fetch(likeURL, config)
  .then(resp => console.log(resp))
}

  // --------- Fetch Initial Image ----------
  fetch (imageURL)
  .then(resp => resp.json())
  .then(image => {
    let comments = image.comments;
    displayImage(image)
    comments.forEach(comment => displayComment(comment))
  })

})
