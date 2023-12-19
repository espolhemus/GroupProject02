// Search books using title input select
function searchBooks(searchInputValue, searchTypeValue) {
  var apiKey= 'AIzaSyCn_GY-e0YI-qPTbmDGhQevrirQqWuLkVM';
  apiURL= `https://www.googleapis.com/books/v1/volumes?q=${searchInputValue}+${searchTypeValue}&key=${apiKey}`
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

  const [volumeInfo]=books;

  books.forEeach(volumeInfo => {
    var bookCard = document.createElement("div");
      bookCard.className= "card";
      bookCard.innerHTML = `
        <img src="${volumeInfo.image.Links.smallThumbnail}" class="" alt="${volumeInfo.title}">
        <div class="card-body">
          <h4 class="card-title">"${volumeInfo.title}"</h4>
          <h5 class="card-subtitle">${volumeInfo.subtitle}</h5>
          <p>By: ${volumeInfo.authors}</p>
          <a href="${infoLink}" class="text-blue-400 hover:underline">More Info</a><br>
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

  searchBooks(searchInputValue, searchTypeValue);
}

 // Event listener for search form submit
 searchFormEl.addEventListener('submit', handleFormSubmit)
