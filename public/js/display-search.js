// Search books using title input select
async function searchBooks(searchInputValue, searchTypeValue) {
  var apiURL = `https://www.googleapis.com/books/v1/volumes?q=${searchInputValue}+${searchTypeValue}&key=`
  try {
    const response = await fetch(`/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ apiURL })
    })
    const responseData = await response.json();
    const { items } = responseData;
    displaySearchResults(items)
  } catch (err) {
    console.error(err);
  }

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
      description = 'No description provided.'
    } else {
      description = volumeInfo.description;
    }
    var pages;
    if (!volumeInfo.pageCount) {
      pages = 'No page count provided'
    } else {
      pages = volumeInfo.pageCount;
    }

    var publisher;
    if (!volumeInfo.publisher) {
      publisher = 'No publisher provided'
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
      authors = 'Not author provided.'
    } else {
      authors = volumeInfo.authors;
    }
    var test = volumeInfo.industryIdentifiers[0].identifier.split(':')
    var isbn;
    if (!volumeInfo.industryIdentifiers) {
      isbn = book.id
    } else if (test.length == 2) {
      isbn = test[1];
    }
    else {
      isbn = volumeInfo.industryIdentifiers[0].identifier;
    }

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


  // Access the haveRead element
  const haveReadData = document.querySelectorAll('#have-read')

  // Add an event listener to the button
  haveReadData.forEach(button => {
    button.addEventListener('click', async (event) => {
      // pull out data attributes
      const bookIsbn = event.target.dataset.volumeisbn;
      const bookTitle = event.target.dataset.volumetitle;
      const bookDescription = event.target.dataset.volumedescription;
      const bookAuthor = event.target.dataset.volumeauthors;
      const bookInfoLink = event.target.dataset.volumeinfolink;
      const bookImageUrl = event.target.dataset.volumeimagelink;
      const bookPublisherName = event.target.dataset.volumepublisher;
      const bookPages = event.target.dataset.volumepagecount;
      const bookPublicationDate = event.target.dataset.volumepublisheddate;
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

      // create new collection entry for newly added book

      const collection = [bookIsbn, hasRead]

      const response2 = await fetch('/api/collection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(collection)
      })



      // create a review for newly added hasread book with default score of 0

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
      const bookIsbn = event.target.dataset.volumeisbn;
      const bookTitle = event.target.dataset.volumetitle;
      const bookDescription = event.target.dataset.volumedescription;
      const bookAuthor = event.target.dataset.volumeauthors;
      const bookInfoLink = event.target.dataset.volumeinfolink;
      const bookImageUrl = event.target.dataset.volumeimagelink;
      const bookPublisherName = event.target.dataset.volumepublisher;
      const bookPages = event.target.dataset.volumepagecount;
      const bookPublicationDate = event.target.dataset.volumepublisheddate;
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

      // create a collection for newly added book with default score of 0

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

