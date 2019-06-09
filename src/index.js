// [3]
const form = document.querySelector('#new-quote-form')

// [5]
const quoteInput = document.querySelector('#new-quote')
const authorInput = document.querySelector('#author')

// [1]
document.addEventListener('DOMContentLoaded', function() {
  fetch_quotes()
  form.addEventListener('submit', createQuote)

})

// [2]
function fetch_quotes() {
  return fetch('http://localhost:3000/quotes')
  .then(resp => resp.json())
  .then(json => { json.forEach(display_quote) })

}

// [4]
function display_quote(quote) {
  // console.log(quote)

  const ul = document.querySelector('#quote-list')

  const li = document.createElement('li')
  li.className = 'quote-card'
  li.dataset.id = quote.id

  const blockquote = document.createElement('blockquote')
  blockquote.className = 'blockqutoe'

  const p = document.createElement('mb-0')
  p.className = 'mb-0'
  p.innerText = quote.quote

  const footer = document.createElement('footer')
  footer.className = 'blockquote-footer'
  footer.innerText = quote.author

  const br = document.createElement('br')

  const like_btn = document.createElement('button')
  like_btn.className = 'btn-success'
  like_btn.innerHTML = `Likes: <span>${0}</span>`

  const delete_btn = document.createElement('button')
  delete_btn.className = 'btn-danger'
  delete_btn.innerText = 'Delete'

  ul.appendChild(li)
  li.appendChild(blockquote)
  blockquote.appendChild(p)
  blockquote.appendChild(footer)
  blockquote.appendChild(br)
  blockquote.appendChild( document.createElement('br') )
  blockquote.appendChild(like_btn)
  blockquote.appendChild(delete_btn)
}

// [6]
function createQuote(e) { 
  e.preventDefault()
  // 리프레시 때 안올라가게 하는 것
  const quote = quoteInput.value
  const author = authorInput.value
  const newQuote = {'quote': quote, 'author': author}
  
  makeQuote(newQuote)
  e.target.reset()
  addQuote(newQuote)
}

// [7] 
function makeQuote(newQuote) {
  fetch('http://localhost:3000/quotes', {
    method: 'POST',
    body: JSON.stringify(newQuote), 
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(res => display_quote(res))
}

