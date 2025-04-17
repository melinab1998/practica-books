import React, { useState } from "react";
import BookItem from "../bookItem/BookItem";
import BookSearch from "../bookSearch/BookSearch";

const Books = ({ books, onDeleteBook }) => {
  const [search, setSearch] = useState("");

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <BookSearch search={search} setSearch={setSearch} />
      <div className="d-flex justify-content-center flex-wrap">
        {filteredBooks.map((book) => (
          <BookItem
            key={book.id}
            id={book.id}
            bookTitle={book.title}
            author={book.author}
            rating={book.rating}
            pages={book.pageCount}
            imageUrl={book.imageUrl}
            available={book.available}
            summary={book.summary} 
            onDelete={() => onDeleteBook(book.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Books;