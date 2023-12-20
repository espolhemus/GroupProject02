/* // Search free books using title input select
function searchFreeBooks() {
    console.log("Search Free Books");
    var apiKey = 'AIzaSyAZgRIh9j8BsCvGEJ5fYneL343gD0Qwuq0';
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
searchFormEl.addEventListener('submit', handleFormSubmit); */

function searchFreeBooks() {
  var apiKey = 'AIzaSyAZgRIh9j8BsCvGEJ5fYneL343gD0Qwuq0'; // Replace with your API key
  var selectedGenres = document.querySelectorAll('input[name="genre"]:checked');
  var genreValues = Array.from(selectedGenres).map(genre => genre.value).join(',');

  if (genreValues) {
      var apiURL = `/api/free-books?genre=${genreValues}&key=${apiKey}&_=${Date.now()}`;

      fetch(apiURL)
          .then(response => {
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
          })
          .then(parsedResponse => {
              console.log('Parsed Response:', parsedResponse);
              renderBooks(parsedResponse.books);
          })
          .catch(error => {
              console.error('Error fetching books:', error);
          });
  }
}

function renderBooks(books) {
  const template = Handlebars.compile(document.getElementById('books-template').innerHTML);
  const freeBooksContainer = document.getElementById('freebooks-container');

  freeBooksContainer.innerHTML = template({ books });
}

const genreFormEl = document.querySelector('#genre-form');

function handleGenreFormSubmit(event) {
  event.preventDefault();
  searchFreeBooks();
}

// Event listener for genre form submit
genreFormEl.addEventListener('submit', handleGenreFormSubmit);

