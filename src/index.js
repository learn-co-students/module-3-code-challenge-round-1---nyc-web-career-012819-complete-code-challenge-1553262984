document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2266 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const imageCard = document.getElementById("image_card")
  const imageLikes = document.getElementById("likes").value

  fetchImage()

  function fetchImage() {
    fetch(imageURL)
    .then(res => res.json())
    .then(json => {
      renderImage(json)
    })
  }

  function renderImage(image) {
    imageCard.innerHTML =
    `<img src="${image.url}" id="image" data-id="${image.id}"/>
    <h4 id="name">${image.name}</h4>
    <span>Likes:
      <span id="likes">${image.like_count}</span>
    </span>
    <button id="like_button">Like</button>
    <form id="comment_form">
      <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
      <input type="submit" value="Submit"/>
    </form>
    <ul id="comments">
    </ul>`
    const commentForm = document.getElementById("comment_form")
    const formInput = document.getElementById("comment_input")
    const formUl = document.getElementById("comments")
    image.comments.forEach(comment => {
      let formLi = document.createElement('li')
      formLi.innerText = comment.content
      formUl.appendChild(formLi)
    })

    const likeButton = document.getElementById("like_button")
    const likeCount = document.getElementById("likes")
    likeButton.addEventListener("click", (event) => {
      event.preventDefault()
      numOfLikes = parseInt(likeCount.innerText)
      likeCount.innerText = `${++numOfLikes}`

      fetch(likeURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: imageId,
          like_count: numOfLikes
        })
      })
    })

    commentForm.addEventListener("submit", (event) => {
      event.preventDefault()

      fetch(commentsURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: formInput.value,
          image_id: imageId
        })
      })
      .then(fetchImage())
    })
  }
})
