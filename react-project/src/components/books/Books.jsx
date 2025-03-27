import React from "react";
import BookItem from "../bookItem/BookItem";

const Books = ({ books }) => {
  return (
    <div className="d-flex justify-content-center flex-wrap">
      {books.map((book) => (
        <BookItem
          key={book.id}
          bookTitle={book.title}
          author={book.author}
          rating={book.rating}
          pages={book.pageCount}
          imageUrl={book.imageUrl}
          available={book.available}
        />
      ))}
    </div>
  );
};

export default Books;
