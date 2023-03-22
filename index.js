import Books from './modules/Books.js';

const title = document.getElementById('title');
const author = document.getElementById('author');
const add = document.querySelector('.add');
const books = new Books();

add.addEventListener('click', (e) => {
  e.preventDefault();
  books.add({ title: title.value, author: author.value });
  title.value = '';
  author.value = '';
});

const list = document.getElementById('list');
const addNew = document.getElementById('addNew');
const contact = document.getElementById('contact');

const listBtn = document.getElementById('list-btn');
const addBtn = document.getElementById('add-btn');
const contactBtn = document.getElementById('contact-btn');

const hideSections = () => {
  const sectionElements = document.querySelectorAll('section');
  sectionElements.forEach((section) => {
    section.classList.add('hide');
  });
};
const handleLinks = (e, link) => {
  e.preventDefault();
  hideSections();
  link.classList.remove('hide');
};

listBtn.addEventListener('click', (e) => handleLinks(e, list));
addBtn.addEventListener('click', (e) => handleLinks(e, addNew));
contactBtn.addEventListener('click', (e) => handleLinks(e, contact));
