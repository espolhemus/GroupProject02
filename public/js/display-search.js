// Search books using title input select
function searchbooksByTitle() {
  // var apiKey=
  // var apiURL=
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
  // var apiURL=
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
  // var apiURL=
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
function displaySearchResults() {
 
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
 searchFormEl.addEventListener('submit', handleFormSubmit);
