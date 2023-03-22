/* eslint-disable max-classes-per-file */
class Book {
  constructor(title, author, id = null) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

class Books {
  constructor(selector = '#books') {
    this.selector = selector;
    this.books = localStorage.getItem('books')
      ? JSON.parse(localStorage.getItem('books'))
      : localStorage.setItem('books', JSON.stringify([]));
    this.idCounter = localStorage.getItem('counter')
      ? Number(localStorage.getItem('counter'))
      : localStorage.setItem('counter', 0);
    this.renderBooks();
  }

  get get() {
    return this.books;
  }

  refresh() {
    this.renderBooks();
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  renderBooks() {
    const container = document.querySelector(this.selector);
    container.innerHTML = '';
    this.books.forEach((b) => {
      const book = document.createElement('p');
      book.classList.add('book');
      book.innerHTML = `
      <div>
     <strong>"${b.title}"</strong> by ${b.author}</div>
      <div><button book_id="${b.id}" class="remove">Remove</button></div>
    `;

      const remove = book.querySelector('.remove');
      remove.addEventListener('click', () => {
        const id = remove.getAttribute('book_id');
        this.remove(id);
        this.renderBooks(this.selector);
        localStorage.setItem('books', JSON.stringify(this.books));
      });

      container.appendChild(book);
    });
  }

  add(item) {
    this.idCounter += 1;
    localStorage.setItem('counter', this.idCounter);
    this.books.push(new Book(item.title, item.author, this.idCounter));
    this.refresh();
  }

  remove(item) {
    this.books = this.books.filter((bookItem) => bookItem.id !== Number(item));
    this.refresh();
  }
}

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
