import booksInitials from "./data/data"
import Books from "./components/books/Books"
import NewBook from "./components/newBook/NewBook"
import { useState } from "react";

function App() {

  const [books, setBooks] = useState(booksInitials);

  const handleBookAdded = (enteredBook) => {
    const bookData = {
      ...enteredBook,
      id: Math.random()
    }

    console.log(bookData);
  }

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <h2>Book champions app</h2>
        <p>¡Quiero leer libros!</p>
        <NewBook onBookAdded={handleBookAdded}/>
        <Books books={books}/>
      </div>
    </>
  );
}
export default App;
