import React, { useState } from "react";
import BookItem from "../bookItem/BookItem";
import BookSearch from "../bookSearch/BookSearch"; 

const Books = ({ books }) => {
  
  const [search, setSearch] = useState("");

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div>
        <BookSearch search={search} setSearch={setSearch} /> 
      </div>
      <div className="d-flex justify-content-center flex-wrap">
        {filteredBooks.map((book) => ( 
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
    </div>
  );
};

export default Books;