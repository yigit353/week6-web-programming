import "./BookCard.css";

/**
 * BookCard component
 *
 * React components receive data through "props" (properties). Props are passed
 * from a parent component as JSX attributes, e.g.:
 *   <BookCard book={someBookObject} />
 *
 * Here we use destructuring in the function parameter list to pull `book`
 * directly out of the props object instead of writing `props.book` everywhere.
 * The curly braces `{ book }` are ES6 destructuring syntax, not JSX.
 *
 * @param {Object} props.book - A book object returned by the ByteBooks API
 * @param {number} props.book.id
 * @param {string} props.book.title
 * @param {number} props.book.price
 * @param {string} props.book.isbn
 * @param {number} props.book.stock
 * @param {string} props.book.genre
 * @param {{ name: string }} props.book.author - Nested author object
 */
function BookCard({ book }) {
  return (
    // The className prop maps to the HTML class attribute.
    // "book-card" is defined in BookCard.css and provides the card styling.
    <div className="book-card">
      {/* Title — rendered as an h3 so it is semantically a sub-heading */}
      <h3 className="book-title">{book.title}</h3>

      {/*
       * Optional chaining (?.) safely accesses book.author.name even when
       * book.author is null or undefined, falling back to "Unknown Author".
       */}
      <p className="book-author">{book.author?.name || "Unknown Author"}</p>

      {/*
       * toFixed(2) formats the price as a string with exactly two decimal
       * places so "$10" becomes "$10.00" and "$9.9" becomes "$9.90".
       */}
      <p className="book-price">${book.price.toFixed(2)}</p>

      {/*
       * Conditional rendering: the genre badge is only shown when book.genre
       * is a truthy value (non-empty string). The && operator short-circuits —
       * if the left side is falsy the right side is never evaluated or rendered.
       */}
      {book.genre && <span className="book-genre">{book.genre}</span>}
    </div>
  );
}

export default BookCard;
