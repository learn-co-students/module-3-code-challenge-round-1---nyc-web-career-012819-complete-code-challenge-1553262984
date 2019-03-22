document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  //API variables

  let imageId = 2267

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  // dom variables


  const image = document.getElementById("image_card")
  const imageCard = image.querySelector("#image")
  const imageName = image.querySelector("#name")
  const likesSpan = image.querySelector("span")
  const commentsUL = document.querySelector("#comments")
  const likeButton = document.getElementById("like_button")
  const commentInput = document.getElementById("comment_input")
  const submitButton = document.getElementById("comment_form").lastElementChild
  let likes;


// fetch and render functions

  function fetchData(){
    fetch(imageURL)
    .then(res => res.json())
    .then(renderData)
  }

  function renderData(data){
    imageCard.src = data.url
    imageName.innerText = data.name
    likes = data.like_count
    likesSpan.innerText = likes
    data.comments.forEach(function(comment){
      commentsUL.innerHTML += `<li data-id = ${comment.id}>${comment.content}</li>   <button data-id=${comment.id} type="button">Delete Comment</button>`
    })
  }

  function postLikes(){
    fetch(likeURL,{
      method: 'POST',
      headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
      body: JSON.stringify({
        image_id: imageId
      })
    })
  }

  function postComment(comment){
    fetch(commentsURL,{
      method: 'POST',
      headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
      body: JSON.stringify({
        image_id: imageId,
        content: comment
      })
    })
  }

  function deleteComment(commentId){
    fetch(commentsURL+`/${commentId}`,{
      method: 'DELETE'
    })
  }

  // event listeners

  //Listener to add a like to the users likes
  likeButton.addEventListener("click", function(e){
    console.log(likes)
    likes++
    likesSpan.innerHTML = `${likes}`
    postLikes()
  })

  // Listener to submit the comment input value via the submit likeButton
  submitButton.addEventListener("click", function(e){
    e.preventDefault()
    let comment = commentInput.value
    console.log(comment)
    commentsUL.innerHTML+=`
    <li>${commentInput.value}</li>  <button type="button">Delete Comment</button>`

    postComment(comment)
    commentInput.value = ''
  })

  commentsUL.addEventListener("click", function(e){
    if (e.target.innerText === 'Delete Comment'){
      let commentId = e.target.dataset.id
      deleteComment(commentId)

    }
  })

  fetchData()

})
