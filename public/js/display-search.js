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

    // Handle any information that was ommitted from search results
    var image;

    if (!volumeInfo.imageLinks) {
      image = 'images/default.png'
    } else {
      image = volumeInfo.imageLinks.smallThumbnail;
    }

    var description;
    if (!volumeInfo.description) {
      description = 'No description included.'
    } else {
      description = volumeInfo.description;
    }
    var pages;
    if (!volumeInfo.pageCount) {
      pages = 'Not provided'
    } else {
      pages = volumeInfo.pageCount;
    }

    var publisher;
    if (!volumeInfo.publisher) {
      publisher = 'Not provided'
    } else {
      publisher = volumeInfo.publisher;
    }

    var publishedDate;
    if (!volumeInfo.publishedDate) {
      publishedDate = false;
    } else {
      publishedDate = volumeInfo.publishedDate;
    }

    var authors;
    
    if (!volumeInfo.authors) {
      authors = 'Not provided.'
    } else {
      authors = volumeInfo.authors;
    }
    console.log('id:' +book.id);
    var isbn;
    if (!volumeInfo.industryIdentifiers) {
      isbn = book.id
    }else {
      isbn = volumeInfo.industryIdentifiers[0].identifier;
    }

    console.log('isbn: ' + volumeInfo.industryIdentifiers);
    // generate card with the information and attach it to the results container 
        bookCard.innerHTML = `
      <div class="col-span-1">
          <div class="card-body gap-2 p-6 m-6 text-base border-t-20 border-[--night] outline outline-4 outline-[--amber] bg-white rounded-xl ">
          <h4 class="card-title bg-[--night] p-2 mb-2 rounded-t-xl text-center text-lg text-white font-bold truncate">"${volumeInfo.title}"</h4>
          <p class="font-bold truncate ...">Author(s): ${authors}</p><br>
          <img src="${image}" class="" style= "width:100%; height:350px;" alt="${volumeInfo.title}"><br>
          <div class="grid grid-cols-2 gap-2">
            <button id="have-read" data-volumeISBN="${isbn}" data-volumeTitle="${volumeInfo.title}" data-volumeDescription="${description}" data-volumeAuthors="${authors}" data-volumeInfoLink="${volumeInfo.infoLink}" data-volumeImageLink="${image}" data-volumePublisher="${publisher}" data-volumePageCount="${pages}" data-volumePublishedDate="${publishedDate}" class="have-read col-span-1 object-scale-down w-[100%] p-2 text-sm text-white bg-orange-600 hover:bg-orange-500 active:opacity-50 rounded">Have Read</button>
            <button id="want-read" data-volumeISBN="${isbn}" data-volumeTitle="${volumeInfo.title}" data-volumeDescription="${description}" data-volumeAuthors="${authors}" data-volumeInfoLink="${volumeInfo.infoLink}" data-volumeImageLink="${image}" data-volumePublisher="${publisher}" data-volumePageCount="${pages}" data-volumePublishedDate="${publishedDate}" class="want-read btn col-span-1 p-2 text-sm text-white bg-yellow-600 hover:bg-yellow-500 active:opacity-50 rounded">Want to Read</button>
          </div><br>
            <div class="card-description h-20 text-sm text-wrap truncate... overflow-auto">${description}</div>
            <a href="${volumeInfo.infoLink}" class="text-blue-400 hover:underline">More Info</a>
        </div>
      </div>  
      `

    resultsContainer.append(bookCard);
  });

  haveRead.addEventListener("click", function() {
   
  })

  // Access the haveRead element
  const haveReadData = document.querySelectorAll('#have-read')

  // Add an event listener to the button
  haveReadData.forEach(button => {
    button.addEventListener('click', async (event) => {
      console.log("Event listener working");
      const bookIsbn = event.target.dataset.volumeisbn;
      console.log(bookIsbn);
      const bookTitle = event.target.dataset.volumetitle;
      console.log(bookTitle);
      const bookDescription = event.target.dataset.volumedescription;
      console.log(bookDescription);
      const bookAuthor = event.target.dataset.volumeauthors;
      console.log(bookAuthor);
      const bookInfoLink = event.target.dataset.volumeinfolink;
      console.log(bookInfoLink);
      const bookImageUrl = event.target.dataset.volumeimagelink;
      console.log(bookImageUrl);
      const bookPublisherName = event.target.dataset.volumepublisher;
      console.log(bookPublisherName);
      const bookPages = event.target.dataset.volumepagecount;
      console.log(bookPages);
      const bookPublicationDate = event.target.dataset.volumepublisheddate;
      console.log(bookPublicationDate);
      const hasRead = true

      // Create an array representing the book
      const book = [bookIsbn, bookTitle, bookAuthor, bookDescription, bookInfoLink, bookImageUrl, bookPublisherName, bookPages, bookPublicationDate];

      // Send the volume data to the database via the POST route
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
      })


      const collection = [bookIsbn, hasRead]

      const response2 = await fetch('/api/collection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(collection)
      })

      const review = [bookIsbn]

      const response3 = await fetch('/api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
      })
      
    })
  });

  // Access the want read element
  const wantToReadData = document.querySelectorAll('#want-read')


  // Add an event listener to the button
  wantToReadData.forEach(button => {
    button.addEventListener('click', async (event) => {
      console.log("Event listener working");
      const bookIsbn = event.target.dataset.volumeisbn;
      console.log(bookIsbn);
      const bookTitle = event.target.dataset.volumetitle;
      console.log(bookTitle);
      const bookDescription = event.target.dataset.volumedescription;
      console.log(bookDescription);
      const bookAuthor = event.target.dataset.volumeauthors;
      console.log(bookAuthor);
      const bookInfoLink = event.target.dataset.volumeinfolink;
      console.log(bookInfoLink);
      const bookImageUrl = event.target.dataset.volumeimagelink;
      console.log(bookImageUrl);
      const bookPublisherName = event.target.dataset.volumepublisher;
      console.log(bookPublisherName);
      const bookPages = event.target.dataset.volumepagecount;
      console.log(bookPages);
      const bookPublicationDate = event.target.dataset.volumepublisheddate;
      console.log(bookPublicationDate);
      const hasRead = false

      // Create an array representing the book
      const book = [bookIsbn, bookTitle, bookAuthor, bookDescription, bookInfoLink, bookImageUrl, bookPublisherName, bookPages, bookPublicationDate];

      // Send the volume data to the database via the POST route

      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
      })


      const collection = [bookIsbn, hasRead]

      const response2 = await fetch('/api/collection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(collection)
      })
    })




  });



}


const searchFormEl = document.querySelector('#search-form');

// handle form submit
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

