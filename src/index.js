document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2263 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/2263`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

//my code starts here

  let myImage;
//fetch my custom image
  function fetchImage(){
    fetch(imageURL)
    .then(res => res.json())
    .then(image => {
      console.log('this be my image', image)
      myImage = image
      renderImage(myImage)
    })
  }
//display image, title, etc...
const imageCard = document.querySelector('#image_card')

  function renderImage(myImage){

    imageCard.innerHTML = `
    <div id="image_card" class="card col-md-4">
        <img src="${myImage.url}" id="image" data-id=""/>
        <h4 id="name">${myImage.name}</h4>
        <span>Likes:
          <span id="likes">${myImage.like_count}</span>
        </span>
        <button id="like_button">Like</button>
        <form id="comment_form">
          <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
          <input type="submit" value="Submit"/>
        </form>
        <ul id="comments">
             ${myImage.comments.map(function(comment){
               return `<li>${comment.content}</li>`
             }).join("")}
        </ul>
      </div>
    `
  }

//add likes feature
  imageCard.addEventListener('click', function(e){
    // console.log(e.target)
    // debugger
    // let likeButton = document.querySelector('#like_button')
    if(e.target.id == 'like_button'){
      // debugger
      let like = e.target.previousElementSibling
      let likeCount = e.target.previousElementSibling.innerText
      like.innerText = `${++likeCount}`


    fetch(likeURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId
      })
    }) //end of fetch
    .then(res => res.json())
    fetchImage(console.log('added a like!'))
}//end of if stmt
  })//end of imageCard addEventListener

//add comment feature
  const commentForm = document.querySelector('#comment_form')

  commentForm.addEventListener('submit', function(e){
    const input = document.querySelector('#comment_input')

    fetch(commentsURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: `${e.target.comment.value}`
        //e.target.name.value
        //input.value
      })
    }) //end of fetch
    .then(res => res.json())
    fetchImage(console.log('added a comment!'))


    //e.target.name.value
  })// end of comment addEventListener


//delete feature
//add html delete button in the innerhtml where you renderImage
//then event listener when you click delete const config = {method: "DELETE"}




fetchImage();

}) //end of dom content Loader
