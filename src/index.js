const form = document.getElementById('new-quote-form')

document.addEventListener('DOMContentLoaded', function() {
  fetchQuotes()
})

form.addEventListener('submit', handleQuotes)

function handleQuotes(e){
  e.preventDefault()
  // console.log(e)
  let inputs = document.querySelectorAll('.form-control')
  let newQuote = inputs[0].value
  let newAuthor = inputs[1].value

  let quoteInfo = {
    quote: newQuote,
    author: newAuthor,
    likes: 0
  }
  fetch('http://localhost:3000/quotes?_embed=likes', {
    method: 'POST', 
    body: JSON.stringify(quoteInfo),
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(showQuote)
  form.reset()
}

function fetchQuotes() {
  fetch('http://localhost:3000/quotes?_embed=likes')
  .then(res => res.json())
  .then(quote => quote.forEach(showQuote))
}

function showQuote(quote){
  // console.log(quote)
  let quoteList = document.getElementById('quote-list')
  // console.log(quoteList)
  let quoteCard = 
    `<li class='quote-card'>
    <blockquote class="blockquote">
      <p class="mb-0">${quote.quote}</p>
      <footer class="blockquote-footer">${quote.author}</footer>
      <br>
      <button class='btn-success' data-id=${quote.id}>Likes: <span>0</span></button>
      <button class='btn-danger' data-id=${quote.id}>Delete</button>
    </blockquote>`

    //append
    quoteList.innerHTML += quoteCard
    //event
    quoteList.addEventListener('click', handleEvents)
}

  function handleEvents(e){
    if(e.target.className === 'btn-success'){
    // console.log(e.target)
    // let likeValue = e.target.parentElement.querySelector('span').innerText
    let likeValue = e.target.querySelector('span').innerText
    let newValue = parseInt(likeValue)
    // console.log(newValue)
    let likeBox = e.target.querySelector('span')
    // console.log(likeBox) 
    likeBox.innerText = `${++newValue}`
    let id = e.target.dataset.id
    // console.log(id)

    fetch(`http://localhost:3000/quotes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({"likes": newValue}),
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    // .then(console.log)
    }else if(e.target.className === 'btn-danger'){
      let id = e.target.dataset.id
      fetch(`http://localhost:3000/quotes/${id}`, {
        method: 'DELETE'
    })
      e.target.parentElement.parentElement.remove()
   } 
}