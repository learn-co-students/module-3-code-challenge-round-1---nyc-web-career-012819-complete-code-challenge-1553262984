document.addEventListener('DOMContentLoaded', () => {
  // const MY_URL = 'https://randopic.herokuapp.com/images/2255'
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2255 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const deleteURL = 'https://randopic.herokuapp.com/comments/:comment_id'


  const imgCard = document.getElementById('image_card')
  const likeBtn = document.getElementById('like_button')


  const getMyInfo = () => {
    return fetch(imageURL)
      .then(resp => resp.json())
  }

  const showAllInfo = () => {
    getMyInfo()
      .then(json => {
        imgCard.innerHTML = `
        <img src=${json.url} id="image" data-id=""/>
        <h4 id=${json.name}>${json.name}</h4>
        <span>Likes:
          <span id="likes">${json.like_count}</span>
        </span>
        <button id="like_button">Like</button>
        <form id="comment_form">
          <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
          <input type="submit" value="Submit"/>
        </form>
        <ul id="comments">
             ${commentss()}
        </ul>
        `
      })
  }

  const commentss = () => {
    getMyInfo()
      .then(json => {
        console.log(json.comments);
        json.comments.forEach(comment => {
          // let commentId = 0
          const commentsList = document.getElementById('comments')
          const newLI = document.createElement('li')
          newLI.innerText = comment.content
          commentsList.append(newLI)
          const deleteBtn = document.createElement('button')
          deleteBtn.innerText = 'Delete'
          deleteBtn.dataset.id = comment.id
          commentsList.append(deleteBtn)
        })
      })
  }

  const postLike = () => {
    fetch(likeURL, {
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

  const postComment = (content) => {
    fetch(commentsURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: content
      })
    })
  }

  // const deleteComment = (commentId) => {
  //   fetch(`deleteURL/${commentId}, {
  //     method: 'DELETE'
  //   })
  // }

  imgCard.addEventListener('click', (e) => {
    e.preventDefault()
    // console.log(e.target.attributes);
    if (e.target.attributes[0].nodeValue === 'like_button' && e.target.tagName === 'BUTTON') {
      // console.log(e.target.previousSibling.previousSibling.children[0].innerText);
      ++e.target.previousSibling.previousSibling.children[0].innerText
      postLike()
    } else if (e.target.value === 'Submit') {
      // const deleteBtn = document.createElement('button')
      // delete.
      const newLI = document.createElement('li')
      newLI.innerText = e.target.previousSibling.previousSibling.value
      const commentsList = e.target.parentNode.nextSibling.nextSibling
      // commentsList.append(newLI)
      // newLI.append(deleteBtn)
      e.target.previousSibling.previousSibling.value = ''
      postComment(newLI.innerText)
      showAllInfo()
    } else if (e.target.innerText === 'Delete' && e.target.tagName === 'BUTTON') {
      console.log(e.target.dataset.id);
      const commentId = e.target.dataset.id
      deleteComment(commentId)
    }

  })

  // const commentsList = document.getElementById('comments')
  // commentsList.addEventListener




showAllInfo()
})
