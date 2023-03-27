import Book from './Book.js';

export default class Books {
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

  refresh = () => {
    this.renderBooks();
    localStorage.setItem('books', JSON.stringify(this.books));
  };

  renderBooks = () => {
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
  };

  add = (item) => {
    this.idCounter += 1;
    localStorage.setItem('counter', this.idCounter);
    this.books.push(new Book(item.title, item.author, this.idCounter));
    this.refresh();
  };

  remove = (item) => {
    this.books = this.books.filter((bookItem) => bookItem.id !== Number(item));
    this.refresh();
  };
}
