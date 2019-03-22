document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2254 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageCard = document.getElementById('image_card')
  const commentSection = document.getElementById('comments')
  const likeButton = document.getElementById('like_button')
  let commentInput = document.getElementById('comment_input')
  let count;
  // const submitButton = document.getElementById('submit_button')

  //fetching the information for that particular photo and then using render function to add to page
  function fetchImage() {
    fetch(`https://randopic.herokuapp.com/images/${imageId}`)
    .then(res => res.json())
    .then(image => renderImage(image))
  }

  //adds the one photo and info to the page
  function renderImage(image) {
    imageCard.innerHTML = `
        <img src="${image.url}" id="image" data-id="${image.id}"/>
        <h4 id="name">${image.name}</h4>
        <span>Likes:
          <span id="likes">${image.like_count}</span>
        </span>
        <button id="like_button">Like</button>
        <form id="comment_form">
          <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
          <input id ="submit_button" type="submit" value="Submit"/>
        </form>
    `
    getComments(image)
  }

  //getting the already posted comments from api to show on page

  function getComments(image) {
    // console.log('here')
    commentInput.innerHTML = ''
    //only one image so don't need to iterate over images to get to comments, but can have multiple comments so need to iterate over those
    image.comments.forEach(function(comment) {
      // console.log(comment)
      commentSection.innerHTML += `
      <li>${comment.content}</li>
      `
    })

  }

  //posting the likes on the backend and frontend

  function postLikes(image) {
    likeButton.addEventListener('click', function() {
      count = `${image.like_count}`.value;
      count++;
    return fetch('likeUrl', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({image_id: imageId})
    })
    renderImage(image)
    })
  }

  //submitting the comments on the backend

  function submitComments(image) {
    let commentInput = document.getElementById('comment_input').value
    submitButton.addEventListener('click', function(e) {
      e.preventDefault()
      return fetch('commentsUrl', {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({image_id: imageId, content: commentInput})
      })
    })
    renderImage(image)
  }







//invoking the fetch function so that the information is rendered
  fetchImage();

})
