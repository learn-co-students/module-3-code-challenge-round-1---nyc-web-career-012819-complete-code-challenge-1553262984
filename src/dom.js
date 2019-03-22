class Dom {
  constructor() {
    this.imageTag = document.getElementById('image');
    this.imageHeader = document.getElementById('name');
    this.likesSpan = document.getElementById('likes');
    this.likeButton = document.getElementById('like_button');
    this.commentsList = document.getElementById('comments');
    this.commentInput = document.getElementById('comment_input');
    this.commentForm = document.getElementById('comment_form');
  }

  addAllEventListeners() {
    this.likeButton.addEventListener('click', this.handleLike.bind(this));
    this.commentForm.lastElementChild.addEventListener('click', this.handleAddComment.bind(this));
    this.commentsList.addEventListener('click', this.handleCommentsListClick.bind(this));
  }

  handleLike(event) {
    this.likesSpan.innerText = parseInt(this.likesSpan.innerText) + 1;
    adapter.incrementLikeCount(this.imageTag.dataset.id);
  }

  handleAddComment(event) {
    event.preventDefault();

    // Optimistic rendering
    // Id is initially blank
    const stopgapComment = { content: this.commentInput.value, id: ''};
    this.commentsList.appendChild(this.createCommentElement(stopgapComment));

    // Post the comment
    // Then make a call to the database to get the commentId
    // Place that value in the delete button's data-id attribute
    // This could all be avoided if we rendered the new comments pessimistically from the start
    adapter.postComment(
      {
        image_id: this.imageTag.dataset.id, 
        content: this.commentInput.value
      }
    ).then(() => {
        adapter.fetchImage()
          .then(function(attributes) {
            const lastCommentId = attributes.comments.pop().id;
            this.commentsList.lastElementChild.lastElementChild.setAttribute('data-id', lastCommentId);
          }.bind(this));
      });
  }

  handleCommentsListClick(event) {
    if (event.target.tagName === "BUTTON") {
      adapter.deleteComment(event.target.dataset.id)
        .then(function(response) {
          if (response.ok) {
            this.commentsList.removeChild(event.target.parentElement);
          }
        }.bind(this));
    }
  }

  renderImage(image) {
    this.imageTag.src = image.url;
    this.imageTag.setAttribute('data-id', image.id);
    this.imageHeader.innerText = image.name;
    this.likesSpan.innerText = image.likesCount;
    this.renderComments(Comment.all);
  }

  renderComments(comments) {
    this.commentsList.innerHTML = '';

    comments.forEach(comment => {
      this.commentsList.appendChild(this.createCommentElement(comment));
    });
  }

  createCommentElement(comment) {
    const commentLi = document.createElement('li');
    commentLi.innerHTML = `${comment.content} <button data-id="${comment.id}">Delete</button>`;
    return commentLi;
  }
}