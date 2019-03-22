document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  // givens
  let imageId = 2256; //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;

  const likeURL = `https://randopic.herokuapp.com/likes/`;

  const commentsURL = `https://randopic.herokuapp.com/comments/`;

  // variables
  const imagePlace = document.getElementById('image');
  const imageTitleh4 = document.getElementById('name');
  const likeButton = document.getElementById('like_button');
  // const commentSubmitBtn = document.getElementById('id')
  const likeInnerTextSpan = document.getElementById('likes');
  const commentsUl = document.getElementById('comments');

  // event listeners
  likeButton.addEventListener('click', increaseLike);
  document.addEventListener('click', submitComment);
  document.addEventListener('click', deleteComment); // for later

  // initiate
  getImageDataAPI().then(renderImage);

  // control functions
  function renderImage(image) {
    imagePlace.src = image.url;
    imageTitleh4.innerText = image.name + '~~~~~~~~~~~~~~~';
    likeInnerTextSpan.innerText = image.like_count;

    if (image.comments.length === 1) {
      commentsUl.innerHTML = `<div><li>${image.comments[0].content}</li><button class='delete-me'>X</button></div>`;

    } else if (image.comments.length > 1) {
      image.comments.forEach(comment => {
        commentsUl.innerHTML += `<div><li>${comment.content}</li><button class='delete-me'>X</button></div>`;
      });
    } else {
      commentsUl.innerHTML += `<div><li> Leave comments here!!!!!!!!!!</li></div>`;
    }
  }

  function increaseLike(e) {
    if (e.target.id === 'like_button') {
      console.log('like');
      // debugger;
      // if (!parseInt(likeInnerTextSpan)) {
      //   likeInnerTextSpan.innerText = 1;
      // } else if (parseInt(likeInnerTextSpan)) {
        ++likeInnerTextSpan.innerText;
      // }

      patchIncreaseLikeAPI(parseInt(likeInnerTextSpan.innerText));
    }
  }

  function submitComment(e) {
    e.preventDefault();
    if (e.target.value === 'Submit') {
      console.log('new comment');
      // debugger
      let commentInput = e.target.previousElementSibling.value;
      commentsUl.innerHTML += `<div><li>${commentInput}</li><button class='delete-me'>X</button></div>`;
      e.target.previousElementSibling.value = '';

      addNewCommentAPI(commentInput);
    }
  }

  function deleteComment(e) {
    if (e.target.className === 'delete-me') {
      console.log('delete');
      // debugger
      // destroyComment(...pass id in).then(e.target.parentElement.remove());
      // to remove comment, I can assign comment ids to each button,
      // but if optimistically rendering/submitting a comment, how should I assign a comment id?
    }
  }

  // fetch functions
  function getImageDataAPI() {
    return fetch(imageURL).then(r => r.json());
  }

  function patchIncreaseLikeAPI(likesNumber) {
    const likePatchConfig = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        like_count: likesNumber
      })
    };
    return fetch(likeURL, likePatchConfig);
    // .then(r => r.json())
    // .then(console.log)
  }

  function addNewCommentAPI(comment) {
    const commentPatchConfig = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: comment
      })
    };
    return fetch(commentsURL, commentPatchConfig);
  }

  function destroyComment(id) {
    const deleteConfig = {
      method: "DELETE",
      message: 'Comment Successfully Destroyed'
    };
    return fetch(commentsURL+`/${id}`, deleteConfig);
  }

})
