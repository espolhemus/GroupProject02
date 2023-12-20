// Search books using title input select
function searchBooks(searchInputValue, searchTypeValue) {
  var apiKey = 'AIzaSyB7B-Q8ya3aud6KiRhixk3IPODDK1umTF0';
  apiURL = `https://www.googleapis.com/books/v1/volumes?q=${searchInputValue}+${searchTypeValue}&key=${apiKey}`
  fetch(apiURL)
    .then(response => response.json())
    .then(responseData => {
      const { items } = responseData;
      console.log(items);
      displaySearchResults(items)

    })
    .catch(error => {
      console.error("Error:", error);
    });
}

// Display book search results to page
function displaySearchResults(books) {
  var resultsContainer = document.getElementById('output-list');
  resultsContainer.innerHTML = "";

  books.forEach(book => {
    const { volumeInfo } = book;

    var bookCard = document.createElement("div");
    bookCard.className = "card";
    var image;
    
    if (!volumeInfo.imageLinks) {
      image = 'images/default.png'
    } else {
      image = volumeInfo.imageLinks.smallThumbnail;
    }

    var description;
    if (!volumeInfo.description){
      description = 'No description included.'
    }else{
      description = volumeInfo.description;
    }

    bookCard.innerHTML = `
    <br>
        <img src="${image}" class="" style = "width:200px; height: 200px;" alt="${volumeInfo.title}">
        <div class="card-body">
          <h4 class="card-title">"${volumeInfo.title}"</h4>
          <h5 class="card-description">${description}</h5>
          <p>By: ${volumeInfo.authors}</p>
          <a href="${volumeInfo.infoLink}" class="text-blue-400 hover:underline">More Info</a><br>
          <button id="testBtn" data-volumeInfoTitle="${volumeInfo.title}"  class="have-read btn w-[150px] text-sm text-white bg-indigo-800 hover:bg-indigo-900 rounded">Test Button</button>
          <button id="save-read" class="have-read btn w-[150px] text-sm text-white bg-indigo-800 hover:bg-indigo-900 rounded">Have Read</button>
          <button id="add-reading" class="want-read btn w-[150px] text-sm text-white bg-indigo-800 hover:bg-indigo-900 rounded">Want to Read</button>
        <div><br><hr>
      `
    resultsContainer.append(bookCard);
  });

  // Access the testBtn element
  const testButtonData = document.querySelectorAll('#testBtn')

  // Add an event listener to the button
  testButtonData.forEach(button => {
    button.addEventListener('click',() => {
      console.log("Event listener working")
      const testButtonVolumeInfoTitle = button.dataset.volumeInfoTitle;
      console.log(testButtonVolumeInfoTitle)
    });
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

  searchBooks(searchInputValue, searchTypeValue);
}

// Event listener for search form submit
searchFormEl.addEventListener('submit', handleFormSubmit)

const haveRead = document.querySelectorAll('.have-read')

haveRead.forEach(btn => btn.addEventListener('click', haveReadHandler));

function haveReadHandler(event) {

}