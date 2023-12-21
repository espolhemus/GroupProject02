// get references to all of the stars and add event listeners so that when they are clicked it sends a request to update 

const one = document.querySelectorAll('.one')

one.forEach(star => {
    star.addEventListener('click', async (event) => {
        const bookIsbn = event.target.parentNode.parentNode.parentNode.children.item(1).children.item(1).textContent.split(':')[1].trim();
        const response = await fetch('/api/review', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bookIsbn, reviewScore: 1 })
        })
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to update review.');
        }
    })
})

const two = document.querySelectorAll('.two')

two.forEach(star => {
    star.addEventListener('click', async (event) => {
        const bookIsbn = event.target.parentNode.parentNode.parentNode.children.item(1).children.item(1).textContent.split(':')[1].trim();
        const response = await fetch('/api/review', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bookIsbn, reviewScore: 2 })
        })
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to update review.');
        }
    })
})

const three = document.querySelectorAll('.three')

three.forEach(star => {
    star.addEventListener('click', async (event) => {
        const bookIsbn = event.target.parentNode.parentNode.parentNode.children.item(1).children.item(1).textContent.split(':')[1].trim();
        const response = await fetch('/api/review', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bookIsbn, reviewScore: 3 })
        })
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to update review.');
        }
    })
})

const four = document.querySelectorAll('.four')

four.forEach(star => {
    star.addEventListener('click', async (event) => {

        const bookIsbn = event.target.parentNode.parentNode.parentNode.children.item(1).children.item(1).textContent.split(':');
        const response = await fetch('/api/review', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bookIsbn, reviewScore: 4 })
        })
        if (response.ok) {
            console.log('changed?');
            document.location.replace('/');
        } else {
            alert('Failed to update review.');
        }
    })
})


const five = document.querySelectorAll('.five')

five.forEach(star => {
    star.addEventListener('click', async (event) => {
        const bookIsbn = event.target.parentNode.parentNode.parentNode.children.item(1).children.item(1).textContent.split(':')[1].trim();
        const response = await fetch('/api/review', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bookIsbn, reviewScore: 5 })
        })
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to update review.');
        }
    })
})

// Delete a book from a user's collections
const del = document.querySelectorAll('.del')

del.forEach(btn => {
    btn.addEventListener('click', async (event) => {
        const collectionId = event.target.dataset.collectionid;
        console.log(collectionId);
        const response = await fetch('/api/collection', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ collectionId })
        })
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to delete collection.');
        }
    })
})