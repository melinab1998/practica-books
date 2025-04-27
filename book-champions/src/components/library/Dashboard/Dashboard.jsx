import React, { useEffect, useState } from "react";
import Books from "../books/Books";
import BookForm from "../BookForm/BookForm";
import { useNavigate, useLocation } from "react-router";
import { Routes, Route } from "react-router-dom";
import { Button } from "react-bootstrap";
import BookDetails from "../bookDetails/BookDetails";
import { errorToast, successToast } from "../../../utils/notifications";

const Dashboard = ({ onLogout }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = () => {
        fetch("http://localhost:3000/books")
            .then(res => res.json())
            .then(data => setBookList([...data]))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        if (location.pathname === "/library") {
            fetchBooks();
        }
    }, [location]);

    const handleBookAdded = (enteredBook) => {
        if (!enteredBook.title || !enteredBook.author) {
            errorToast("El autor y/o título son requeridos");
            return;
        }

        fetch("http://localhost:3000/books", {
            headers: {
                "Content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(enteredBook)
        })
            .then(res => res.json())
            .then(data => {
                setBookList(prevBookList => [data, ...prevBookList]);
                successToast(`¡Libro ${data.title} agregado correctamente!`);
                navigate("/library", { replace: true });
            })
            .catch(err => console.log(err));
    };

    const handleBookUpdated = (updatedBook) => {
        setBookList(prevBookList =>
            prevBookList.map(book =>
                book.id === updatedBook.id ? updatedBook : book
            )
        );
        successToast(`¡Libro ${updatedBook.title} actualizado correctamente!`);
    };

    const handleLogout = () => {
        onLogout();
        navigate("/login");
    };

    const handleNavigateAddBook = () => {
        navigate("/library/add-book", { replace: true });
    };

    const handleDeleteBook = (bookId, bookTitle) => {
        fetch(`http://localhost:3000/books/${bookId}`, {
            method: "DELETE"
        })
            .then(res => {
                if (res.ok) {
                    setBookList(prevBooks => prevBooks.filter(book => book.id !== bookId));
                    successToast(`¡Libro "${bookTitle}" eliminado correctamente!`);
                } else {
                    errorToast("Error al eliminar el libro.");
                }
            })
            .catch(err => {
                console.log(err);
                errorToast("Error de red al intentar eliminar el libro.");
            });
    };

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
                    <Route path="/:id" element={<BookDetails onBookUpdated={handleBookUpdated} />} />
                    <Route path="add-book" element={<BookForm onBookAdded={handleBookAdded} />} />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;