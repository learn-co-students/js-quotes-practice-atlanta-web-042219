document.addEventListener('DOMContentLoaded', () => {
  const baseURL = `http://localhost:3000/quotes`
  const form = document.getElementById('new-quote-form')
  
  // form.addEventListener('submit', console.log("this"))
  form.addEventListener('submit', addNewQuote)
  document.addEventListener('click', handleEvents)

  fetch(baseURL)
  .then(res => res.json())
  .then(json => addQuotes(json))
  .catch(err => console.log(err));

    // .then(quotes => {
    //   quotes.forEach(addQuote)
    // })

// ----------------------------------------------------------- //

  function addQuotes(json) {
    json.forEach(quote => {
      addQuote(quote)
    })
  }

// ----------------------------------------------------------- //

  function addNewQuote(e) {
    e.preventDefault()

    // console.log("form tag = ", form)
    console.log("submit target = ", e.target)

    let newQuoteInput = document.getElementById('new-quote')
    let newAuthorInput = document.getElementById('author')

    fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        Accepts: 'application/json'
      },
      body: JSON.stringify({
        quote: newQuoteInput.value,
        author: newAuthorInput.value
      })
    })
    .then((res)=>res.json())
    // .then(console.log)
    .then(addQuote)

    newQuoteInput.value = ''
    newAuthorInput.value = ''
  }

// ----------------------------------------------------------- //

  function addQuote(quote) {
    const quoteList = document.getElementById('quote-list')

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

    // const li = document.createElement('li');
    // li.className = 'quote-card';

    // const blockQuote = document.createElement('blockquote');
    // blockQuote.className = 'blockquote';

    // const p = document.createElement('p');
    // p.className = 'mb-0';
    // p.innerText = quote.quote

    // const footer = document.createElement('footer');
    // footer.className = 'blockquote-footer';
    // footer.innerText = quote.author;

    // const br = document.createElement('br');

    // const likeBtn = document.createElement('button');
    // likeBtn.className = 'btn-success';
    // likeBtn.innerText = 'Likes: ';

    // const deleteBtn = document.createElement('button');
    // deleteBtn.className = 'btn-danger';
    // deleteBtn.innerText = 'Delete';

    // const likeSpan = document.createElement('span');
    // likeSpan.innerText = '0';

    // quoteList.appendChild(li)
    // li.appendChild(blockQuote);
    // blockQuote.appendChild(p);
    // blockQuote.appendChild(footer);
    // blockQuote.appendChild(br);
    // blockQuote.appendChild(likeBtn);
    // blockQuote.appendChild(deleteBtn);
    // likeBtn.appendChild(likeSpan);

  }

// ----------------------------------------------------------- //

  function handleEvents(e) {
    console.log('handleEvents() target', e.target)

    if (e.target.className === 'btn-danger'){
      e.preventDefault()
      deleteQuote(e)
    } else if (e.target.className === 'btn-success'){
      e.preventDefault()
      likeQuote(e)
    } 
    // else if (e.target === document.querySelector('#new-quote-form button')) {
    //   addNewQuote(e.target.parentElement)
    // }
  }

// ----------------------------------------------------------- //

  function deleteQuote(e) {
    console.log(e.target)
    let quoteCard = e.target.parentElement.parentElement
    let id = Number(quoteCard.dataset.id)

    fetch(`${baseURL}/${id}`, {
      method: 'DELETE'
    })

    quoteCard.remove()
  }

// ----------------------------------------------------------- //

  // function likeQuote(e) {
  //   console.log(e.target)
  // }

// -FINAL END BRACKET ---------------------------------------- //

})
