document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2264;
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
  const likeURL = `https://randopic.herokuapp.com/likes/`;
  const commentsURL = `https://randopic.herokuapp.com/comments/`;

  const imageTag = document.getElementById('image');
  const imageTitle = document.getElementById('name');
  const imageLikes = document.getElementById('likes');
  const likeBtn = document.getElementById('like_button');
  const commentsUl = document.getElementById('comments');
  const commentsForm = document.querySelector('#comment_input');
  const commentsBtn = document.querySelector('input[type="submit"]');

// ----------------Fetch Requests------------------//

  function fetchImage(){
    return fetch(imageURL)
    .then(resp => resp.json())
  };

  function deleteComment(id){
    return fetch(`${commentsURL}/${id}`, {
      method: "DELETE"
    }).then(resp => resp.json())
  };

  function postComment(input){
    fetch(commentsURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: input
      })
    }).then(resp => resp.json())
    .then((comment) => {
      return comment.id
    })
  }

  function renderImage(){
    commentsUl.innerHTML = '';
    fetchImage()
    .then(image => {
      imageTag.src = image.url;
      imageTitle.innerText = image.name;
      image.comments.forEach(comment => {
        commentsUl.innerHTML += `
        <li data-comment-id=${comment.id} data-image-id=${image.id}>${comment.content}<button>Delete Comment</button></li>
        `
      })
      imageLikes.innerText = image.like_count;
    });
  };

// ----------------Event Listeners------------------//

  likeBtn.addEventListener('click', (e) => {
    let currentCount = imageLikes.innerText++;
    fetch(likeURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId
      })
    })
  });


  commentsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let input = commentsForm.value
    let comment = document.createElement('li');

    comment.innerText = input;
    comment.innerHTML += `
    <button>Delete Comment</button>
    `;
    commentsUl.append(comment);
    postComment(input);

    commentsForm.value = "";
  })


  commentsUl.addEventListener('click', (e) => {
    if(e.target.textContent === "Delete Comment"){
      let comment = e.target.parentElement
      let commentId = comment.dataset.commentId;
      deleteComment(commentId)
      .then(function(){
        comment.remove();
      });
    }
  })

  renderImage();

});
