// How should I think about building something with JS?
// 1st Objective: Get Something on the Page  
  /*
    - Check if I have to return something from fetch
    - Look to see what elements I "need" - what elements do I have to manipulate? 
    - Which of these elements need to have an event listener attached?
 */

const quoteContainer = document.querySelector('#quote-list')
const form = document.querySelector('#new-quote-form')

/* const input1 = document.querySelector('#new-quote')
   -- Use this as an alternative to getting the value in a form without going through the event */

document.addEventListener('DOMContentLoaded', init)
document.addEventListener('click', handleEvent)
// You'll this second event if you are adding elements to the DOM using innerHTML like in the displayQuote function.

function init() {
    fetch('http://localhost:3000/quotes')
    .then(res => res.json())
    .then(res => {
        res.forEach(quote => displayQuote(quote))
    })
    
    form.addEventListener('submit', addQuote)
}

function displayQuote(quote) {
    quoteContainer.innerHTML += `<li class='quote-card' data-id="${quote.id}">
    <blockquote class="blockquote">
    <p class="mb-0">${quote.quote}</p>
    <footer class="blockquote-footer">${quote.author}</footer>
    <br>
    <button class='btn-success'>Likes: <span>${quote.likes}</span></button>
    <button class='btn-danger'>Delete</button>
    </blockquote>
    </li>`

}

function addQuote(e) {
    e.preventDefault()
    // console.log("Form has been clicked: ", e)
   //e.target['new-quote'].value
   //e.target.author.value

   let quote = {
       author: e.target.author.value,
       quote: e.target['new-quote'].value
   }

    fetch('http://localhost:3000/quotes', {
        method: 'POST', 
        body: JSON.stringify(quote), 
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        displayQuote(res)
    })
}

function handleEvent(e) {
    if (e.target.className === 'btn-success') {
        let likes = e.target.innerText.split(" ")[1]
        let likeCount = parseInt(likes)
        let likeBox = e.target.querySelector('span')
        likeBox.innerText = `${++likeCount}`
        
        let id = e.target.parentElement.parentElement.dataset.id 
        console.log("This is the id: ", id)

        fetch(`http://localhost:3000/quotes/${id}`, {
          method: 'PATCH',
            body: JSON.stringify({'likes': `${likeCount}`}), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(res => console.log("This is the new quote: ", res))
    } 
    //else if (e.target.className === 'btn-danger') {
    //    console.log("Yikes")
    // }
}




