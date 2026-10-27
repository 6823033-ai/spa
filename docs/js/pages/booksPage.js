import { renderGridPageLayout } from "../layouts/gridPageLayout.js";
import { renderPageLayout } from "../layouts/pageLayout.js";
import { renderNotification } from "../layouts/notificationLayout.js";

import { renderBookCard } from "../components/bookCard.js";
import { renderPdfModal, bindPdfModalEvents } from "../components/pdfModal.js";

import { getBooks } from "../services/bookService.js";

export async function renderBooksPage() {
  const app = document.getElementById("app");

  app.innerHTML = renderPageLayout({
    content: renderNotification("Loading books..."),
  });

  try {
    const books = getBooks();

    app.innerHTML =
      renderGridPageLayout({
        pageId: "books",
        pageTitle: "Ном",
        items: books,
        renderItem: renderBookCard,
        columnClass: "column is-one-quarter books-column",
        columnsClass: "columns is-multiline books-grid",
        emptyContent: renderNotification("No books found.", "warning"),
      }) + renderPdfModal();

    bindPdfModalEvents();
  } catch (error) {
    app.innerHTML = renderPageLayout({
      content: renderNotification("Failed to load books page.", "danger"),
    });

    console.error("Failed to render books page:", error);
  }
}
