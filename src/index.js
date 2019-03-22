document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2261

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const likeButton = document.getElementById('like_button')
  const pictureTitle = document.getElementById('name')
  const pictureImage = document.getElementById('image')
  const commentSubmitButton = document.getElementById('comment_submit')
  const commentForm = document.getElementById('comment_form')
  const page = document.getElementById('image_card')
  let pictureLikes = document.getElementById('likes')
  let pictureComments = document.getElementById('comments')


//DELIVERABLE: GET to random picture and render to DOM

//GET to my random picture //Parse and pass through to a function to render to the page
  function getMyPicture() {
    fetch('https://randopic.herokuapp.com/images/2261')
    .then(res => res.json())
    .then(myPicture => renderPicturePage(myPicture))
  }

//Render the image and all of its details
  function renderPicturePage(myPicture) {

    pictureTitle.innerText = `${myPicture.name}`
    pictureImage.src = `${myPicture.url}`
    pictureLikes.innerText = `${myPicture.like_count}`
    pictureComments.innerHTML = ''

    myPicture.comments.map(function(comment) {
      pictureComments.innerHTML += `
        <li>${comment.content}</li>
      `
    })

  }

  getMyPicture();

//DELIVERABLE: clicking 'like' button should increment likes by one each click

//POST to persist likes to the database
  function addLikeToDatabase() {
    fetch('https://randopic.herokuapp.com/likes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId
      })
    })
  }


//Add event listener to like like_button //on every click, adds 1 like to like_count
  likeButton.addEventListener('click', (e) => {
    pictureLikes.innerText = ++pictureLikes.innerText //optimistically renders the like

    addLikeToDatabase()
  })


//DELIVERABLE: optimistically render comments to page

//POST to add new comment to database
  function addCommentToDatabase(newComment) {
    fetch('https://randopic.herokuapp.com/comments', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: newComment
      })
    })
  }


//add event listener to comment submit button
  commentSubmitButton.addEventListener('click', (e) => {
    e.preventDefault()

    let newComment = document.getElementById('comment_input').value

//optimistically renders comment

    pictureComments.innerHTML += `
        <li>${newComment}</li>
      `
//clears form and invokes POST to database
    commentForm.reset()
    addCommentToDatabase(newComment)
  })

//DELIVERABLE: add absurdly large delete buttons and make them work
  //add a delete button for each comment
  //add event delegation looking for a click on any delete button
  //DELETE to the api .... needs to be persisted in order to have an id to delete...

  image.addEventListener('click', (e) => {
    if (e.target.type === "delete") {
      console.log('clicked a delete button!')
    }
  })

//deleted delete buttons before submitting because they were crazy so scratch that










})
