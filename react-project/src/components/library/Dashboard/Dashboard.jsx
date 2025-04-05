import React, { useState } from "react";
import booksInitials from "../../../data/Data";
import Books from "../books/Books"
import NewBook from "../newBook/NewBook";
import { useNavigate } from "react-router";
import { Routes, Route } from "react-router-dom";
import { Button } from "react-bootstrap";
import BookDetails from "../bookDetails/BookDetails";

const Dashboard = ({ onLogout }) => {
    const navigate = useNavigate();
    const [bookList, setBookList] = useState(booksInitials);

    const handleBookAdded = (enteredBook) => {
        const bookData = {
            ...enteredBook,
            id: Math.random(),
        };
        setBookList((prevBookList) => [bookData, ...prevBookList]);
    };

    const handleDeleteBook = (id) => {
        setBookList((prevList) => prevList.filter((book) => book.id !== id));
    };

    const handleLogout = () => {
        onLogout();
        navigate("/login");
    };

    const handleNavigateAddBook = () => {
        navigate("/library/add-book", { replace: true });
    }

    return (
        <div className="p-4">

            <div className="d-flex justify-content-end mb-3">
                <Button variant="primary" className="me-2" onClick={handleNavigateAddBook}>
                    Agregar libro
                </Button>
                <Button className="btn btn-danger" onClick={handleLogout}>
                    Cerrar sesión
                </Button>
            </div>

            <div className="d-flex flex-column align-items-center">
                <h2>Book champions app</h2>
                <p>¡Quiero leer libros!</p>

                <Routes>
                    <Route index element={<Books books={bookList} onDeleteBook={handleDeleteBook} />} />
                    <Route path="/:id" element={<BookDetails/>} />
                    <Route path="add-book" element={<NewBook onBookAdded={handleBookAdded} />} />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;