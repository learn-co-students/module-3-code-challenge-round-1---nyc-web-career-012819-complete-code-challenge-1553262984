document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  //variables
  let imageId = 2262;

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  // const imageName = document.querySelector("#name");
  // const imageLikes = document.querySelector("#likes");
  // const imageUrl = document.querySelector("#image").getAttribute('src');
  const imageCardDiv = document.querySelector("#image_card");

  //functions
  function renderImage(image) {
    // imageName.innerText = `${image.name}`
    // imageLikes.innerText = `${image.like_count}`
    // imageURL.innerText = `${image.url}`
    imageCardDiv.innerHTML = `
    <img src="${image.url}" id="image" data-id="${image.id}"/>
    <h4 id="name">${image.name}</h4>
    <span>Likes:
      <span id="likes" data-like-id="${image.id}">${image.like_count}</span>
    </span>
    <button id="like_button" data-like-id="${image.id}">Like</button>
    <form id="comment_form">
      <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
      <input type="submit" value="Submit"/>
    </form>
    <ul id="comments">
    </ul>
    `
  };//end of this function

  function fetchImage() {
    fetch(`${imageURL}`)
    .then(response => response.json())
    .then(image => {
      renderImage(image)
    })
  };//end of this function

  function patchFetch(likeNumber) {
    fetch(`${imageURL}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        like_count: likeNumber
      }), // body data type must match "Content-Type" header
    })//end of this fetch
  }//end of this function

  //event listeners
  imageCardDiv.addEventListener('click', event => {
    const likeId = event.target.dataset.likeId;
    let likeDisplay = document.querySelector(`[data-like-id="${likeId}"]`)
    let likeNumber = parseInt(document.querySelector(`[data-like-id="${likeId}"]`).innerText);
    // console.log(likeId)
    // console.log(likeNumber)
    if (event.target.innerText === "Like") {
      // console.log(event)
      likeNumber+=1
      likeDisplay.innerHTML = likeNumber
      // console.log(likeDisplay=likeNumber)
      // console.log(imageURL)
      patchFetch(likeNumber);
    }
  });//end of this event listner

  fetchImage();
})//end of DOMContentLoaded
