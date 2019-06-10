document.addEventListener('DOMContentLoaded', function() {
  fetch_quote()
  document.addEventListener('click', handleClickEvents)
  function handleClickEvents(e) {
    e.preventDefault()
    if(e.target.className === "btn btn-primary") create_quote(e.target.parentElement)
    else if(e.target.className === "btn-success") like_quote(e.target)
    else if(e.target.className === 'btn-danger') delete_quote(e.target)
    // console.log(e.target.parentElement)
  }


  function fetch_quote() {
    return fetch('http://localhost:3000/quotes')
    .then (res => res.json())
    .then (json => {json.forEach(display_quote) })
  }
  
  function display_quote(quote) {
    document.querySelector('#quote-list').innerHTML += 
    `<li class='quote-card dataset.id="${quote.id}'>
      <blockquote class="blockquote">
      <p class="mb-0">${quote.quote}</p>
      <footer class="blockquote-footer">${quote.author}</footer>
      <br>
      <button data-quote-id="${quote.id}" class='btn-success'>Likes: <span>${quote.likes}</span></button>
		  <button data-quote-id="${quote.id}" class='btn-danger'>Delete</button>
      </blockquote>
    </li>`  
  }

  function create_quote(form) {
    fetch('http://localhost:3000/quotes',{
			method: 'POST',
			headers: {
				'Content-Type':'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({ quote: form["new-quote"].value, author: form.author.value, likes: '0'
			})
		})
		.then(resp => resp.json())
		.then(display_quote)
		form.reset()
  }

  function like_quote(button) {
		let like_span = button.children[0]
		like_span.innerText = parseInt(like_span.innerText)+1

		fetch(`http://localhost:3000/quotes/${button.dataset.quoteId}`,{
	    method: 'PATCH',
	    headers: {'Content-Type':'application/json'},
	    body: JSON.stringify({likes: like_span.innerText})
	  })
	}

	function delete_quote(button) {
		fetch(`http://localhost:3000/quotes/${button.dataset.quoteId}`,{
			method: 'DELETE'
		})
		button.parentElement.parentElement.remove()
	}

})