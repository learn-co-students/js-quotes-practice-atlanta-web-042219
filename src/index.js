document.addEventListener('DOMContentLoaded', function(){
	document.addEventListener('click', handleClickEvents)
	fetch_quotes()


	function handleClickEvents(e) {
		e.preventDefault()
		// console.log(e.target)
		if(e.target.className === 'btn-success') like_quote(e.target)
		else if(e.target.className === 'btn-danger') delete_quote(e.target)
		else if(e.target.id === 'form-submit-btn') add_quote(e.target.parentElement)
	}

	function add_quote(form) {
		fetch('http://localhost:3000/quotes',{
			method: 'POST',
			headers: {
				'Content-Type':'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				quote: form['new-quote'].value,
				author: form.author.value,
				likes: '0'
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

	function fetch_quotes() {
		return fetch('http://localhost:3000/quotes')
		.then(resp => resp.json())
		.then(json => { json.forEach(display_quote) })
	}

	function display_quote(quote) {
		document.getElementById('quote-list').innerHTML += `
			<li class="quote-card" data-id="${quote.id}">
				<blockquote class="blockquote">
		      <p class="mb-0">${quote.quote}</p>
		      <footer class="blockquote-footer">${quote.author}</footer>
		      <br>
		      <button data-quote-id="${quote.id}" class='btn-success'>Likes: <span>${quote.likes}</span></button>
		      <button data-quote-id="${quote.id}" class='btn-danger'>Delete</button>
		    </blockquote>
		  </li>`
	}

	// END
})
