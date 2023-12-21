// freeBooks.js
function searchFreeBooks() {
  var selectedGenres = document.querySelectorAll('input[name="genre"]:checked');
  var genreValues = Array.from(selectedGenres).map(genre => genre.value).join(',');

  var apiURL = `/books?genre=${genreValues}`;

  fetch(apiURL)
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json(); // Use json() instead of text()
      })
      .then(parsedResponse => {
          console.log('Parsed Response:', parsedResponse);
          renderBooks(parsedResponse.books);
      })
      .catch(error => {
          console.error('Error fetching books:', error);
      });
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

  