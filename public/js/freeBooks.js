// Search free books using title input select
function searchFreeBooks() {
    var apiKey = 'API_KEY';
    var searchInputValue = document.querySelector('#search-input').value;
    var searchTypeValue = document.querySelector('#search-type').value;

    var apiURL = `http://localhost:3001/api/books/search?query=${searchInputValue}&filter=free-ebooks&key=${apiKey}`;

    fetch(apiURL)
        .then(response => response.json())
        .then(responseData => {
            displayFreeBooksResults(responseData.items);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

// Display free book search results to page
function displayFreeBooksResults(books) {
    var resultsContainer = document.getElementById('output-list');
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

    var searchInputValue = document.querySelector('#search-input').value;
    var searchTypeValue = document.querySelector('#search-type').value;

    if (!searchInputValue) {
        console.error('Requires search input value!');
        return;
    }

    searchFreeBooks(searchInputValue, searchTypeValue);
}

// Event listener for search form submit
searchFormEl.addEventListener('submit', handleFormSubmit);