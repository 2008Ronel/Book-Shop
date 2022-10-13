'use strict';

function onInit() {
  renderBooks();
}

const bodyEl = document.querySelector('body');
const tableEl = document.createElement('table');

function renderBooks(filterBooks) {
  let str = '';

  var books = filterBooks ? filterBooks : booksToRender;

  books.map((book, i) => {
    if (i === 0) {
      str += `
        <tr>
          <th>id</th>
          <th>image</th>
          <th>title</th>
          <th>author</th>
          <th>price</th>
          <th>rate</th>
          <th> action </th>
        </tr>
        `;
    }

    str += `
        <tr>
            <td>${book.id}#</td>
            <td><img onerror="this.src='img/book.png'"src="img/${book.imgFile}" alt="Book"></td>
            
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.price}$</td>
            <td>${book.rate} </td>

            

            <td><button class="Read" onclick="onReadBook('${book.id}')">Read</button>
             <button class="Update" onclick="onUpdateBookPrice('${book.id}')" >Update</button>
              <button class="Delete" onclick="onDeleteBook('${book.id}')">Delete</button>
              </td>
        </tr>`;
  });

  tableEl.innerHTML = str;

  bodyEl.appendChild(tableEl);
}

function onDeleteBook(bookId) {
  deleteBook(bookId);
  renderBooks();
}

function onAddBook() {
  const book = addBook();
  renderBooks();
}

function onUpdateBookPrice(bookId) {
  var newPrice = +prompt('Price?');
  updateBook(bookId, { price: newPrice });
}

function onReadBook(bookId) {
  var book = getBookById(bookId);
  var elModal = document.querySelector('.modal');
  elModal.id = bookId;
  elModal.querySelector('h3').innerText = book.title;
  elModal.querySelector('h4 span').innerText = book.author;
  elModal.querySelector('p').innerText = book.desc;
  elModal.classList.add('open');
}

function onCloseModal() {
  document.querySelector('.modal').classList.remove('open');
}

function handleFilters(e) {
  e.preventDefault();
  var minRate = +document.getElementById('min-rate').value;
  var maxPrice = +document.getElementById('max-price').value;

  function filterBooks(book) {
    return book.price <= maxPrice && book.rate >= minRate;
  }

  var filteredBooks = getBooksByFilters(filterBooks);

  renderBooks(filteredBooks);
}

function onRate(e) {
  e.preventDefault();
  onCloseModal();

  var elRate = document.querySelector('.rating');
  var newRating = elRate.value;
  if (newRating > 10) return;

  var elModal = document.querySelector('.modal');
  var bookId = elModal.id;

  updateBook(bookId, { rate: newRating });
}
