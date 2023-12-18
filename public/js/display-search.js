var selectType= 
var bookQuery=
// Search books using title input select
function searchbooksByTitle() {
  // var apiKey= 
  apiURL= `https://www.googleapis.com/books/v1/volumes?q=${bookQuery}+intitle:`
  fetch(apiURL)
    .then(response => response.json())
    .then(responseData => {
      displaySearchResults(responseData.results)
  })
  .catch(error => {
  console.error("Error:", error);
  });

}
// Search books using author input select
function searchbooksByAuthor() {
  // var apiKey=
  var apiURL= `https://www.googleapis.com/books/v1/volumes?q=inauthor:`
  fetch(apiURL)
    .then(response => response.json())
    .then(responseData => {
      displaySearchResults(responseData.results)
  })
  .catch(error => {
    console.error("Error:", error);
  });
}

// Search books using ISBN input select
function searchbooksByIsbn() {
  // var apiKey=
  var apiURL= `https://www.googleapis.com/books/v1/volumes?q=isbn:`
  fetch(apiURL)
    .then(response => response.json())
    .then(responseData => {
      displaySearchResults(responseData.results)
  })
  .catch(error => {
    console.error("Error:", error);
  });
}

// Display book search results to page
function displaySearchResults(books) {
  var resultsContainer = document.getElementById('output-list');
  resultsContainer.innerHTML = "";

  books.forEeach(book => {
    var bookCard = document.createElement("div");
      bookCard.className= "card";
      bookCard.innerHTML = `
        <img src="${book.smallThumbnail}" class="" alt="${book.title}">
        <div class="card-body">
          <h4 class="card-title">"${book.title}"</h4>
          <h5 class="card-subtitle">${book.subtitle}</h5>
          <p>By: ${book.authors}</p>
          <a href="${book.infoLink}" class="text-blue-400 hover:underline">More Info</a><br>
          <button id="save-read" class="btn w-[150px] text-sm text-white bg-indigo-800 hover:bg-indigo-900 rounded">Save to Read</button>
          <button id="add-reading" class="btn w-[150px] text-sm text-white bg-indigo-800 hover:bg-indigo-900 rounded">Add to Reading List</button>
        <div>
      `
  });

}

const searchFormEl= document.querySelector('#search-form');

function handleFormSubmit(event) {
  event.preventDefault();

  var searchInputValue = document.querySelector('#search-input').value;
  var searchTypeValue =  document.querySelector('#search-type').value;

  if (!searchInputValue) {
    console.error('Requires search input value!');
    return;
  }

  searchApi(searchInputVal, searchTypeValue);
}

 // Event listener for search form submit
 searchFormEl.addEventListener('submit', handleFormSubmit)
