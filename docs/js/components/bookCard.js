export function renderBookCard(book) {
  return `
    <div class="card book-card">
    <figure class="image book-cover-frame" aria-label="${book.alt}">
        <img src="${book.cover}" alt="${book.alt}" class="book-cover" onerror="this.hidden=true; this.parentElement.classList.add('is-missing')" />
    </figure>

    <div class="card-content book-description">
        <p class="content">
         ${book.description.mn || book.description.en}
        </p>
    </div>

    <footer class="card-footer book-footer">
        <button
        class="button is-primary book-view-btn"
        data-pdf="${book.pdf}"
        >
         Үзэх
        </button>
    </footer>
    </div>
  `;
}
