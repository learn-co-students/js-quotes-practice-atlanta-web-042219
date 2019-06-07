// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
document.addEventListener("DOMContentLoaded", () => {
  const baseURL = `http://localhost:3000/quotes`
  const quoteList = document.getElementById('quote-list')
  const form = document.getElementById('new-quote-form')

  form.addEventListener("submit", newQuote)
  document.addEventListener("click", handleEvent)


  fetch(baseURL)
  .then(res => res.json())
  .then(quotes => {
    quotes.forEach(addQuote)
  })

  function addQuote(quote){
    quoteList.innerHTML +=
    `<li class='quote-card' data-id=${quote.id}>
      <blockquote class="blockquote">
        <p class="mb-0">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button class='btn-success'>Likes: <span>0</span></button>
        <button class='btn-danger'>Delete</button>
      </blockquote>
    </li>`
  }

  function newQuote(e){
    e.preventDefault()
    let newQuoteInput = document.getElementById('new-quote')
    let newAuthorInput = document.getElementById('author')

    fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accepts: 'application/json'
      },
      body: JSON.stringify({quote: newQuoteInput.value, author: newAuthorInput.value})
    }).then(res => res.json())
    .then(addQuote)

    newQuoteInput.value = ''
    newAuthorInput.value = ''
  }

  function handleEvent(e){
    e.preventDefault()
    if(e.target.className === 'btn-danger'){
      deleteQuote(e)
    } else if(e.target.className === 'btn-success'){
      likeQuote(e)
    }
  }

  function deleteQuote(e){
    let quoteCard = e.target.parentElement.parentElement
    let id = parseInt(quoteCard.dataset.id)

    fetch(`${baseURL}/${id}`, {
      method: 'DELETE'
    })

    quoteCard.remove()
  }

  // function likeQuote(e){
  //   console.log(e.target)
  // }








})
