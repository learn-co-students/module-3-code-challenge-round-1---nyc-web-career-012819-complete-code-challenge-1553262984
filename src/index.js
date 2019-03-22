document.addEventListener('DOMContentLoaded', () => {
  let imageId = 2253 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const imgTitle = document.getElementById('name')
  const imgHolder = document.getElementById('image')
  const imgLikes = document.getElementById('likes')
  const imgComments = document.getElementById('comments')
  const likeButton = document.getElementById('like_button')
  const commentInput = document.getElementById('comment_input')
  const commentForm = document.getElementById('comment_form')

  // fetch all
  // convert to json
  // call render fcn
  function fetchImage() {
    fetch(imageURL)
    .then(function(nonJsonPic) {
      return nonJsonPic.json()
    }).then(function(jsonPic) {
      // console.log(jsonPic)
      renderPic(jsonPic)
    })
  }

  // clear out data that is already on the page
  // append inner text/url/any other data based on current API status
  function renderPic(jsonPic) {
    clearCurrent()
    // then append current data
    imgTitle.innerText = jsonPic.name
    imgHolder.src = jsonPic.url
    imgLikes.innerText = jsonPic.like_count
    const comments = jsonPic.comments
    // iterate through comments, create list item/delete button for each, and append to unordered list
    comments.forEach(function(comment) {
      let li = document.createElement('li')
      li.innerText = comment.content
      imgComments.append(li)
      let deleteButton = document.createElement('button')
      deleteButton.innerText = 'DELETE ME'
      deleteButton.setAttribute('id', comment.id)
      li.append(deleteButton)
    })
  }

  // clear title, holder, likes and comments
  function clearCurrent() {
    imgTitle.innerText = ''
    imgHolder.src = ''
    imgLikes.innerText = ''
    imgComments.innerHTML = ''
  }

  // add event listener to the like button
  // when clicked, find current likes, change from str to number
  // increase by one
  // update likes in front end
  likeButton.addEventListener('click', function(e) {
    // STEP 2 IN README
    let currentLikes = parseInt(imgLikes.innerText)
    currentLikes++
    imgLikes.innerText = currentLikes
    // STEP 3 IN README
    // post to /likes, send image id in body, and set like count to the current likes
    fetch('https://randopic.herokuapp.com/likes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        like_count: currentLikes
      })
    }).then(function(resp) {
      return resp.json()
    }).then(function(jsonResp) {
      console.log(jsonResp)
      // console.log to make sure this matches the readme
    })
  })

  // add event listener to comment form
  // when submitted, get input, add as li to ul
  // clear out input field
  commentForm.addEventListener('submit', function(e) {
    // prevent default so it won't submit
    e.preventDefault()
    // STEP 4 IN README
    let commentText = commentInput.value
    imgComments.innerHTML += `
    <li>${commentText} <button id='deletebutton'>DELETE ME</button></li>
    `
    commentInput.value = ''
    // STEP 5 IN README
    // fetch and post to specific image id and send the comment text
    fetch('https://randopic.herokuapp.com/comments', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: commentText
      })
    }).then(function(resp) {
      return resp.json()
    }).then(function(jsonResp) {
      // console.log to make sure this matches the readme
      // add id to button here so we have access to the comment ID just created
      let deleteButton = document.getElementById('deletebutton')
      deleteButton.setAttribute('id', jsonResp.id)
    })
  })

  // add event listener to the unordered list
  // when a delete button is clicked, grab the ID from the button
  // send delete request to that id
  // only render image again once the fetch returns
  imgComments.addEventListener('click', function(e) {
    if (e.target.nodeName === 'BUTTON') {
      let wantedId = parseInt(e.target.id)
      fetch(`https://randopic.herokuapp.com/comments/${wantedId}`, {
        method: 'DELETE'
      }).then(function(resp) {
        return resp.json()
      }).then(function(jsonResp) {
        console.log(jsonResp)
        console.log('Comment Successfully Destroyed')
        fetchImage()
      })
    }
  })

  // call fetchImage to fetch and subsequently render
  fetchImage()
})
