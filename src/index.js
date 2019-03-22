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


  function fetchImage() {
    fetch (imageURL)
    .then (res => res.json())
    .then (image => renderImage(image))
  }

  function renderImage(image) {
    // debugger;
    imageName.innerText = image.name
    imageSource.src = image.url
    imageLikes.innerText = image.like_count
    imageComments.innerHTML = ''

    image.comments.forEach(function (comment) {
      imageComments.innerHTML += `
      <li> ${comment.content} </li>
      `
    })
  }

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
    })
  }

  fetchImage();

})
