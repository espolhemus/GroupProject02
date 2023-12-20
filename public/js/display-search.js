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
          <button id="testBtn" data-volumeISBN="${volumeInfo.industryIdentifiers[0].identifier}" data-volumeTitle="${volumeInfo.title}" data-volumeDescription="${description}" data-volumeAuthors="${volumeInfo.authors}" data-volumeInfoLink="${volumeInfo.infoLink}" data-volumeImageLink="${image}" data-volumePublisher="${volumeInfo.publisher}" data-volumePageCount="${volumeInfo.pageCount}" data-volumePublishedDate="${volumeInfo.publishedDate}" class="have-read btn w-[150px] text-sm text-white bg-indigo-800 hover:bg-indigo-900 rounded">Test Button</button>
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
    button.addEventListener('click',(event) => {
      console.log("Event listener working");
      const bookISBN = event.target.dataset.volumeisbn;
      console.log(bookISBN);
      const bookTitle = event.target.dataset.volumetitle;
      console.log(bookTitle);
      const bookDescription = event.target.dataset.volumedescription;
      console.log(bookDescription);
      const bookAuthor = event.target.dataset.volumeauthors;
      console.log(bookAuthor);
      const bookInfoLink = event.target.dataset.volumeinfolink;
      console.log(bookInfoLink);
      const bookImageURL = event.target.dataset.volumeimagelink;
      console.log(bookImageURL);
      const bookPublisherName = event.target.dataset.volumepublisher;
      console.log(bookPublisherName);
      const bookPages= event.target.dataset.volumepagecount;
      console.log(bookPages);
      const bookPublicationDate= event.target.dataset.volumepublisheddate;
      console.log(bookPublicationDate);

      // Create an object representing the book
      const book = { bookISBN, bookTitle, bookAuthor, bookDescription, bookInfoLink, bookImageURL, bookPublisherName, bookPages, bookPublicationDate };

      // Create an array of objects to be passed to the database
      const bookData = [book]; 

      console.log(bookData)

      // Send the volume data to the database via the POST route
      fetch('/api/bookRoutes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
      })
    })
    // .then(response => response.json())
    // .then(data => {
    //   // Handle the response from the server
    //   console.log(data);
    // })
    // .catch(error => {
    //   // Handle any errors
    //   console.error(error);
    // });
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