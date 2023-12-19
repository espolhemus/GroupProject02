// Search free books using title input select
function searchFreeBooks() {
    var apiKey = 'YOUR_GOOGLE_BOOKS_API_KEY';
    var genreInputValue = document.querySelector('#genre-input').value;

    var apiURL = `/books?genre=${genreInputValue}&key=${apiKey}`;

    fetch(apiURL)
        .then(response => response.json())
        .then(responseData => {
            displayFreeBooksResults(responseData.items);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Display free book search results to page
function displayFreeBooksResults(books) {
    var resultsContainer = document.getElementById('freebooks-container');
    resultsContainer.innerHTML = "";

    books.forEach(book => {
        var bookCard = document.createElement("div");
        bookCard.className = "card";
        bookCard.innerHTML = `
        <img src="${book.volumeInfo.imageLinks.smallThumbnail}" class="" alt="${book.volumeInfo.title}">
        <div class="card-body">
          <h4 class="card-title">${book.volumeInfo.title}</h4>
          <h5 class="card-subtitle">${book.volumeInfo.subtitle}</h5>
          <p>By: ${book.volumeInfo.authors.join(', ')}</p>
          <a href="${book.volumeInfo.infoLink}" class="text-blue-400 hover:underline">More Info</a><br>
          <button id="save-read" class="btn w-[150px] text-sm text-white bg-indigo-800 hover:bg-indigo-900 rounded">Save to Read</button>
          <button id="add-reading" class="btn w-[150px] text-sm text-white bg-indigo-800 hover:bg-indigo-900 rounded">Add to Reading List</button>
        <div>
      `;
        resultsContainer.appendChild(bookCard);
    });
}

const searchFormEl = document.querySelector('#search-form');

function handleFormSubmit(event) {
    event.preventDefault();
    searchFreeBooks();
}

// Event listener for search form submit
searchFormEl.addEventListener('submit', handleFormSubmit);
