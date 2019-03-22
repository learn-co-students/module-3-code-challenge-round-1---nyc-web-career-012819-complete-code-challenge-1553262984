document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2259 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageCardDiv = document.querySelector('#image_card')
  const imageName = document.querySelector('#name')
  const imageSource = document.querySelector('#image')
  const imageLikes = document.querySelector('#likes')
  const imageComments = document.querySelector('#comments')

  const likeButton = document.querySelector('#like_button')
  const likes = document.querySelector('#likes')

  const submitButton = document.querySelector('#submit_button')
  const commentInput = document.querySelector('#comment_input')

  //START FOR FETCH IMAGE
  function fetchImage() {
    fetch (imageURL)
    .then (res => res.json())
    .then (image => renderImage(image))
  }
  //END FOR FETCH IMAGE


  //START FOR RENDERING IMAGE
  function renderImage(image) {
    // debugger;
    imageName.innerText = image.name
    imageSource.src = image.url
    imageLikes.innerText = image.like_count
    imageComments.innerHTML = ''

    image.comments.forEach(function (comment) {
      imageComments.innerHTML += `
      <li> ${comment.content} </li>
      <button type="button" id = "delete_button" data-id = ${comment.id}> Delete </button>
      `
    })

    // start for delete comment (only be able to delete when there is any comment)
    if (image.comments.length > 0) {
      imageComments.addEventListener('click', deleteComment)

      function deleteComment(event) {
        if (event.target.id === "delete_button"){
          let commentId = event.target.dataset.id

          fetch (`${commentsURL}${commentId}`, {
            method: "DELETE"
          }).then (res => fetchImage())
        }
      }
    }
  }
  //END FOR RENDER IMAGE

  //START FOR LIKES
  likeButton.addEventListener('click', increaseNoOfLikes)

  function increaseNoOfLikes() {
    let currentLikes = parseInt(likes.innerText)
    ++currentLikes
    likes.innerText = currentLikes

    fetch (likeURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image_id: imageId
      })
    })
  }
  //END FOR LIKES


  //START FOR COMMENT
  submitButton.addEventListener('click', postAComment)

  function postAComment(event) {
    event.preventDefault()
    let comment = commentInput.value
    imageComments.innerHTML += `
    <li> ${comment} </li>
    `

    fetch (commentsURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image_id: imageId,
        content: comment
      })
    }).then (res => fetchImage())
  }
  //END FOR COMMENT

  fetchImage(); //fetch the image and content as soon as the page loads

})
