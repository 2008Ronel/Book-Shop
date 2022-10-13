'use strict';
const STORAGE_KEY = 'bookDB';
var gBooks;
var gPageIdx = 0;
const PAGE_SIZE = 3;

var gBooks = [
  {
    id: makeId(),
    title: 'The Intelligent Investor',
    author: 'Benjamin Graham',
    price: getRandomIntInclusive(5, 70),
    desc: 'The classic bestseller by Benjamin Graham, "The Intelligent Investor" has taught and inspired hundreds of thousands of people worldwide. Since its original publication in 1949, Benjamin Grahams book has remained the most respected guide to investing, due to his timeless philosophy of "value investing", which helps protect investors against the areas of possible substantial error and teaches them to develop long-term strategies with which they will be comfortable down the road',
    imgFile: 'tii.jpg',
    rate: 0,
  },

  {
    id: makeId(),
    title: 'Telling Lies',
    author: 'Paul Ekman',
    price: getRandomIntInclusive(5, 70),
    desc: 'In this revised edition, Paul Ekman, a renowned expert in emotions research and nonverbal communication, adds a new chapter to present his latest research on his groundbreaking inquiry into lying and the methods for uncovering lies. Ekman has figured out the most important behavioral clues to deceit; he has developed a one-hour self-instructional program that trains people to observe and understand "micro expressions"; and he has done research that identifies the facial expressions that show whether someone is likely to become violent-a self-instructional program to train recognition of these dangerous signals has also been developed.',
    imgFile: 'lies.jpg',
    rate: 0,
  },

  {
    id: makeId(),
    title: 'Rich Dad Poor Dad',
    author: 'Robert T. Kiyosaki',
    price: getRandomIntInclusive(5, 70),
    desc: 'Rich Dad Poor Dad is Roberts story of growing up with two dads his real father and the father of his best friend, his rich dad and the ways in which both men shaped his thoughts about money and investing. The book explodes the myth that you need to earn a high income to be rich and explains the difference between working for money and having your money work for you.',
    imgFile: 'rich.jpg',
    rate: 0,
  },
];

let booksToRender = _getBooksFromStorage(STORAGE_KEY).length
  ? _getBooksFromStorage(STORAGE_KEY)
  : gBooks;

console.log(gBooks);

function getBookById(bookId) {
  const book = booksToRender.find((book) => bookId === book.id);
  return book;
}

function deleteBook(bookId) {
  const bookIdx = booksToRender.findIndex((book) => bookId === book.id);
  booksToRender.splice(bookIdx, 1);
  _saveBooksToStorage();
}

console.log(deleteBook);

function _saveBooksToStorage() {
  saveTreeToStorage(STORAGE_KEY, booksToRender);
}

function _getBooksFromStorage() {
  return loadFromStorage(STORAGE_KEY);
}

function _createBook() {
  return {
    id: makeId(),
    title: prompt('Book name?'),
    author: prompt('Author name?'),
    price: getRandomIntInclusive(50, 250),
    desc: makeLorem(),
    rate: 0,
  };
}

function addBook() {
  const book = _createBook();
  booksToRender.unshift(book);
  _saveBooksToStorage();
  return book;
}

function updateBook(bookId, updatedData) {
  var book = getBookById(bookId);

  book = {
    ...book,
    ...updatedData,
  };

  deleteBook(bookId);
  booksToRender.unshift(book);
  _saveBooksToStorage();
  renderBooks();
}

function onRate() {
  console.log('yayyy');
}

function getBooksByFilters(filterFunction) {
  return booksToRender.filter(filterFunction);
}
