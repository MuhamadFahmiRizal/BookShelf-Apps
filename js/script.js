document.addEventListener('DOMContentLoaded', function () {
    const booksInputForm = document.getElementById('addBookForm');
    const searchBooksForm = document.getElementById('searchbooks');
    const incompleteBooksList = document.querySelector('.incompletebookslist');
    const completeBooksList = document.querySelector('.completebookslist');

    booksInputForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });

    searchBooksForm.addEventListener('submit', function (event) {
        event.preventDefault();
        searchBooks();
    });

    function addBook() {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const year = document.getElementById('year').value;
        const isComplete = document.getElementById('isComplete').checked;

        const book = {
            id: +new Date(),
            title,
            author,
            year: parseInt(year, 10),
            isComplete
        };

        const books = getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('year').value = '';
        document.getElementById('isComplete').checked = false;

        displayBooks();
    }

    function getBooks() {
        return JSON.parse(localStorage.getItem('books')) || [];
    }

    function displayBooks(filter = '') {
        const books = getBooks();
        incompleteBooksList.innerHTML = '';
        completeBooksList.innerHTML = '';

        books.filter(book => book.title.toLowerCase().includes(filter.toLowerCase())).forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.innerHTML = `
                <div class="book">
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                    <p>${book.year}</p>
                    <button onclick="toggleComplete(${book.id})">${book.isComplete ? 'Belum Selesai Dibaca' : 'Sudah selesai Dibaca'}</button>
                    <button onclick="deleteBook(${book.id})">Hapus</button>
                </div>
            `;
            if (book.isComplete) {
                completeBooksList.appendChild(bookElement);
            } else {
                incompleteBooksList.appendChild(bookElement);
            }
        });
    }

    window.deleteBook = function(id) {
        let books = getBooks();
        books = books.filter(book => book.id !== id);
        localStorage.setItem('books', JSON.stringify(books));
        displayBooks();
    };

    window.toggleComplete = function(id) {
        const books = getBooks();
        const book = books.find(book => book.id === id);
        book.isComplete = !book.isComplete;
        localStorage.setItem('books', JSON.stringify(books));
        displayBooks();
    };

    function searchBooks() {
        const searchQuery = document.getElementById('searchBooksTitle').value;
        displayBooks(searchQuery);
    }

    displayBooks();
});