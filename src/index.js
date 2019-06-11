// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
const QUOTES_URL = `http://localhost:3000/quotes`;
const UL_LIST = document.querySelector("#quote-list");
const LIKES_URL = `http://localhost:3000/likes`;
const newQuote = document.querySelector("#new-quote");
const newAuthor = document.querySelector("#author");

document.addEventListener("DOMContentLoaded", init);

function init() {
  document.addEventListener("submit", handleSubmit);
  document.addEventListener("click", handleClick);

  fetch(LIKES_URL)
    .then(resp => resp.json())
    .then(countLikes);
  fetch(QUOTES_URL)
    .then(resp => resp.json())
    .then(quotes => quotes.forEach(printQuote));
}

function printQuote(quote) {
  // console.log("OUTPUT Baddie:: printQuote -> quote", quote);
  UL_LIST.innerHTML += `<li class='quote-card' data-id = '${quote.id}'>
    <blockquote class="blockquote">
      <p class="mb-0">${quote.quote}</p>
      <footer class="blockquote-footer">${quote.author}</footer>
      <br>
      <button class='btn-success'>Likes: <span>${likesHash[quote.id] ||
    0}</span></button>
      <button class='btn-warning'>Edit</button>
      <button class='btn-danger'>Delete</button>
    </blockquote>
  </li>`;
}

function handleSubmit(e) {
  e.preventDefault();

  fetch(QUOTES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      quote: newQuote.value,
      author: newAuthor.value,
    })
  })
    .then(resp => resp.json())
    .then(printQuote)
    .then(e.target.reset());
}

function handleClick(e) {
  if (e.target.className === "btn-danger") {
    if (window.confirm("Are you sure?")) {
      deleteQuote(e.target.parentElement.parentElement);
    }
  }
  if (e.target.className === "btn-success") {
    addLike(e.target.parentElement.parentElement);
  }
  if (e.target.className === "btn-warning") {
    editQuote(e.target.parentElement.parentElement)
  }
}

function editQuote(li) {
  const update = document.querySelector('#update')
  newQuote.value = li.querySelector('.mb-0').innerText
  newAuthor.value = li.querySelector('.blockquote-footer').innerText
  newQuote.scrollIntoView()
  update.style.display = 'block'
  document.querySelector('#new-quote-form').lastElementChild.style.display = 'none'
  update.addEventListener("click", e => {
    e.preventDefault()
    fetch(`${QUOTES_URL}/${li.dataset.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        quote: newQuote.value,
        author: newAuthor.value
      })
    })
      .then(res => res.json())
      .then(() => {
        li.querySelector('.mb-0').innerText = newQuote.value
        li.querySelector('.blockquote-footer').innerText = newAuthor.value
        document.querySelector('#new-quote-form').reset()
        document.querySelector('#new-quote-form').lastElementChild.style.display = 'block'
        update.style.display = 'none'
        li.scrollIntoView()
      })
  })
}

function addLike(li) {
  const newLike = { "quoteId": li.dataset.id, createdAt: Date.now() };
  console.log("newLike :", newLike);
  fetch(LIKES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newLike)
  })
    .then(li.querySelector('span').innerText++)
}

function deleteQuote(li) {
  fetch(`${QUOTES_URL}/${li.dataset.id}`, {
    method: "DELETE"
  }).then(li.remove());
}

function countLikes(likes) {
  likesHash = {};
  likes.forEach(like => {
    likesHash[like.quoteId] = likesHash[like.quoteId] || 0;
    likesHash[like.quoteId]++;
  });
  return likesHash;
}
