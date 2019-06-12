// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading. 



document.addEventListener('DOMContentLoaded', function(){
  const quote_list = document.getElementById('quote-list')
  const form = document.querySelector('#new-quote-form')
  
  form.addEventListener('submit', newQuote)
  document.addEventListener('click', handleEvent)

    fetch("http://localhost:3000/quotes")
    .then(res => res.json())
    .then(quotes => {
      quotes.forEach(quote =>{
        // console.log(quote)

        //new function addQuote(Quote)
        quote_list.innerHTML +=
        `<li class='quote-card' data-id = "${quote.id}">
        <blockquote class="blockquote">
          <p class="mb-0"> ${quote.quote}</p>
          <footer class="blockquote-footer"> ${quote.author}</footer>
          <br>
          <button class='btn-success'>Likes: <span> ${quote.likes}</span></button>
          <button class='btn-danger'>Delete</button>
        </blockquote>
      </li>`
      })
    })


    function newQuote(e){
        e.preventDefault()
        let newInputQuote = document.getElementById('new-quote')
        let newInputAuthor = document.getElementById('author')

        let quote  = {
          quote: newInputQuote.value, author: newInputAuthor.value, likes:0
        }

      fetch("http://localhost:3000/quotes",{
          method: 'POST', 
          body: JSON.stringify(quote), 
          headers:{
          'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .then(quote => { 
            quote_list.innerHTML +=
            `<li class='quote-card' data-id = ${quote.id}>
              <blockquote class="blockquote">
                <p class="mb-0"> ${quote.quote}</p>
                <footer class="blockquote-footer"> ${quote.author}</footer>
                <br>
                <button class='btn-success'>Likes: <span> ${quote.likes}</span></button>
                <button class='btn-danger'>Delete</button>
              </blockquote>
            </li>`
          }
        
        )
         e.target.reset()
      }


    function handleEvent(e){
      // console.logs(e)
      if(e.target.className === "btn-danger"){
        e.preventDefault()

        deleteQuote(e)

      }else if (e.target.className === "btn-success"){
        e.preventDefault()

        likeQuote(e)
      }
      // else if (e.target.className === "btn-btn-primary"){
      //   e.preventDefault()

      //   newQuote(e)
      // }
    }

    function deleteQuote(e){

      // console.log(e.target.parentElement.parentElement)
      let quoteCard = e.target.parentElement.parentElement
      let id = parseInt(quoteCard.dataset.id)

      fetch(`${'http://localhost:3000/quotes'}/${id}`, {
        method:'DELETE'
      })
      quoteCard.remove()
    }

    function likeQuote(e){
      console.log(e.target.parentElement.parentElement)
      
      let likes =  e.target.innerText.split(" ")[1]
      let likeCount = parseInt(likes)
      // console.log(likeCount)
      // let likeBox =  e.target.lastChild.innerText
      let likeBox = e.target.querySelector('span')
      // likeBox.innerText = `${likeCount += 1} ` //same as below //working as well
      likeBox.innerText = `${++likeCount}`


      let id = e.target.parentElement.parentElement.dataset.id
      // console.log(id)

      fetch(`${"http://localhost:3000/quotes"}/${id}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              'likes': likeCount
          })
      }).then(res => res.json())
      .then(res => console.log("This is the like fetch: ", res))
      
  
    }
})

