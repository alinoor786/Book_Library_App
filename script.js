document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const bookList = document.getElementById('bookList');
  
    let books = [];
  
    fetch('/api/books')
      .then(res => res.json())
      .then(data => {
        books = data;
        updateCategories();
        renderBooks();
        displayBooks(books);
      });
  
    searchInput.addEventListener('input', renderBooks);
    categoryFilter.addEventListener('change', renderBooks);
  
    
    function updateCategories() {
      const categories = ['All', ...new Set(books.map(book => book.category))];
      categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
      });
    }

    
  
    function renderBooks() {
      const query = searchInput.value.toLowerCase();
      const category = categoryFilter.value;
      const filtered = books.filter(book =>
        (category === 'All' || book.category === category) &&
        (book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query))
      );
  
      bookList.innerHTML = '';
      filtered.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
          <h3>${book.title}</h3>
          <p>Author: ${book.author}</p>
          <p>Category: ${book.category}</p>
          <p>Borrowed: ${book.borrowed.length} time(s)</p>
        `;
        bookList.appendChild(card);

  function displayBooks(books) {
  const container = document.getElementById('book-list');
  container.innerHTML = '';

  books.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';

    card.innerHTML = `
      <img src="${book.image}" alt="${book.title}" class="book-image" />
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Category:</strong> ${book.category}</p>
      <p><strong>Status:</strong> ${book.borrowed ? 'Borrowed' : 'Available'}</p>
    `;

    container.appendChild(card);
  });
}

      });
    }
  });
  