import booksInitials from "./data/Data"
import Books from "./components/books/Books"
import NewBook from "./components/newBook/NewBook"
import { useState } from "react";

function App() {

  const [bookList, setBookList] = useState(booksInitials);


  const handleBookAdded = (enteredBook) => {
    const bookData = {
      ...enteredBook,
      id: Math.random()
    }

    setBookList(prevBookList => [bookData, ...prevBookList])
  }

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <h2>Book champions app</h2>
        <p>¡Quiero leer libros!</p>
        <NewBook onBookAdded={handleBookAdded}/>
        <Books books={bookList}/>
      </div>
    </>
  );
}
export default App;
