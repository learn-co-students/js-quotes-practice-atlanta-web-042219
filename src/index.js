const quoteContainer = document.querySelector('#quote-list')
const form = document.querySelector('#new-quote-form')

document.addEventListener('DOMContentLoaded', ()=> {
    getQuotes()
    document.addEventListener('click', handleLikeEvent)
    document.addEventListener('click', handleDeleteQuote)
})  

function getQuotes() {
    fetch("http://localhost:3000/quotes")
    .then(res => res.json())
    .then(res => 
        {res.forEach(quote => displayQuote(quote))
        })
        form.addEventListener("submit", addQuote)
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

function handleLikeEvent(e) {
    if (e.target.className === 'btn-success') {
        let likes = e.target.innerText.split(" ")[1]
        let likeCount = parseInt(likes)
        let likeBox = e.target.querySelector('span')
        likeBox.innerHTML = `${++likeCount}`
        
        let id = e.target.parentElement.parentElement.dataset.id 

        fetch(`http://localhost:3000/quotes/${id}`, {
          method: 'PATCH',
            body: JSON.stringify({'likes': `${likeCount}`}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            displayQuote(res)
        })
    } 
}

// Need to fix this function
// function handleDeleteQuote(e) {
//     if (e.target.className === 'btn-danger') {
//         let id = e.target.parentElement.parentElement.dataset.id

//         fetch(`http://localhost:3000/quotes/${id}`, {method: 'DELETE')
//             }
//         }       
//     }
// }


// const form = document.getElementById('new-quote-form')
// const quoteInput = document.getElementById('new-quote')
// const authorInput = document.getElementById('author')

// document.addEventListener('DOMContentLoaded', () => {
//     getQuotes()
//     form.addEventListener('submit', createQuote)
// })

// function getQuotes() {
//     fetch('http://localhost:3000/quotes')
//     .then((res)=>res.json())
//     .then((data)=>{addQuotes(data)
//     })
// }

// function addQuotes(quotes) {
//     quotes.forEach((quote) =>{addQuote(quote)
//     })
// }

// function addQuote(quote) {
//     const quoteListUl = document.querySelector('#quote-list')

//     const quoteLi = document.createElement('li')
//     quoteLi.className = 'quote-card'

//     const blockQuote = document.createElement('blockquote')
//     blockQuote.className = 'blockquote'

//     const p = document.createElement('p')
//     p.className = 'mb-0'
//     p.innerText = quote.quote

//     const footer = document.createElement('footer')
//     footer.className = 'blockquote-footer'
//     footer.innerText = quote.author

//     const br = document.createElement('br')

//     const likeButton = document.createElement('button')
//     likeButton.className = 'btn-success'
//     likeButton.innerText = 'Likes: '

//     const spanLike = document.createElement('span')
//     spanLike.innerText = 0

//     const deleteButton = document.createElement('button')
//     deleteButton.className = 'btn-danger'
//     deleteButton.innerText = 'Delete'

//     quoteListUl.appendChild(quoteLi)
//     quoteLi.appendChild(blockQuote)
//     blockQuote.appendChild(p)
//     blockQuote.appendChild(footer)
//     blockQuote.appendChild(br)
//     blockQuote.appendChild(likeButton)
//     likeButton.appendChild(spanLike)
//     blockQuote.appendChild(deleteButton)
// }

// function createQuote(e) {
//     e.preventDefault()
//     const newQuote = {'quote': quoteInput.value, 'author': authorInput.value}
//     insertQuote(newQuote)
//     e.target.reset()
//     addQuote(newQuote)
// }

// function insertQuote(data) {
//     console.log("Top of insert quote", data)
//     return fetch('http://localhost:3000/quotes', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//     .then((res) => res.json())
// }
// const quoteList = document.querySelector("#quote-list")
// const quoteForm = document.querySelector("#new-quote-form")

// document.addEventListener("DOMContentLoaded", () => {
//     getQuotes()  
// })

// function getQuotes() {
//     fetch("http://localhost:3000/quotes")
//     .then(res => res.json())
//     .then(res => 
//         {res.forEach(quote => displayQuote(quote))
//         })
//     quoteForm.addEventListener("submit", addQuote())
// } 
// // refactored into fetch request
// // function addQuotes(quotes) {
// //     quotes.forEach((quote)=> {addQuote(quote)
// //     })
// // }

// function displayQuote(quote) {
//     quoteList.innerHTML += 
//         `<li class='quote-card'>
//             <blockquote class="blockquote">
//             <p class="mb-0">${quote.quote}</p>
//             <footer class="blockquote-footer">${quote.author}</footer>
//             <br>
//             <button class='btn-success'>Likes: <span>0</span></button>
//             <button class='btn-danger'>Delete</button>
//             </blockquote>
//         </li>`
// }