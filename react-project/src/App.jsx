import booksInitials from "./data/Data";
import Books from "./components/library/books/Books";
import NewBook from "./components/library/newBook/NewBook";
import { useState } from "react";
import Login from "./components/auth/Login/Login";

function App() {
  const [bookList, setBookList] = useState(booksInitials);

  const handleBookAdded = (enteredBook) => {
    const bookData = {
      ...enteredBook,
      id: Math.random()
    };
    setBookList(prevBookList => [bookData, ...prevBookList]);
  };

  const handleDeleteBook = (id) => {
    setBookList((prevList) => prevList.filter((book) => book.id !== id));
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h2>Book champions app</h2>
      <p>¡Quiero leer libros!</p>
      <NewBook onBookAdded={handleBookAdded} />
      <Books books={bookList} onDeleteBook={handleDeleteBook} />
      {/* <Login /> */}
    </div>
  );
}

export default App;