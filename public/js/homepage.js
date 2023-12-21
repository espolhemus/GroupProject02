const one = document.querySelectorAll('.one')

one.forEach(star => {
    star.addEventListener('click', async (event) => {
        const bookIsbn = event.target.parentNode.parentNode.parentNode.children.item(1).children.item(1).textContent.split(':')[1].trim();
        const response = await fetch('/api/review', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bookIsbn, reviewScore : 1})
        })
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to update review.');
        }
    })
})


