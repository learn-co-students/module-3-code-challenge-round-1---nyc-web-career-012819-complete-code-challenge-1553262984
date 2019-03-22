document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2258 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imgSrc = document.querySelector('#image')
  const imgTitle = document.querySelector('#name')
  const likeBtn = document.querySelector('#like_button')
  const likeSpan = document.querySelector('#likes')
  const commentUl = document.querySelector('#comments')
  const commentInput = document.querySelector('#comment_input')
  const submit = document.querySelector('#submit')



  fetch(imageURL)
  .then(res => res.json())
  .then(json => {
    // console.log(imgSrc)
    imgSrc.src = `${json.url}`
    // debugger
    imgTitle.innerHTML = `<h4>${json.name}</h4>`
  })

  fetch(imageURL)
  .then(res => res.json())
  .then(json => {
    likeSpan.innerText = json.like_count
  })

  fetch(imageURL)
  .then(res => res.json())
  .then(json => {
    json.comments.forEach(comment => {
      commentUl.innerHTML += `<li>${comment.content}</li>`
    })
  })

  likeBtn.addEventListener('click', (e => {
    let likeCounter = parseInt(likeSpan.innerText)
    likeSpan.innerText = `${++likeCounter}`

    fetch(`https://randopic.herokuapp.com/likes`, {

      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: 2258,
        like_count: likeCounter
      })
    })
  }))


  let newComment;
  commentInput.addEventListener('change', (e => {
    newComment = e.target.value
    // debugger
  }))

  submit.addEventListener('click', (e => {
    e.preventDefault()
    // console.log(e)
    fetch('https://randopic.herokuapp.com/comments', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: 2258,
        content: newComment
      })
    })
  }))

})
