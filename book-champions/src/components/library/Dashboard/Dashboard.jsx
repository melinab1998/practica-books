import React, { useEffect, useState, useContext } from "react";
import Books from "../books/Books";
import BookForm from "../BookForm/BookForm";
import { useNavigate, useLocation } from "react-router";
import { Routes, Route } from "react-router-dom";
import { Button } from "react-bootstrap";
import BookDetails from "../bookDetails/BookDetails";
import { errorToast, successToast } from "../../../utils/notifications.js";
import { getBooks, addBook, deleteBook } from "./Dashboard.services.js";
import { AuthenticationContext } from "../../services/auth/auth.context";

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [bookList, setBookList] = useState([]);

    const { handleUserLogout } = useContext(AuthenticationContext);

    const fetchBooks = () => {
        getBooks(
            data => setBookList([...data]),
            err => {
                console.error("Error al obtener libros:", err.message);
                errorToast("No se pudieron cargar los libros");
            }
        );
    };

    useEffect(() => {
        if (location.pathname === "/library") {
            fetchBooks();
        }
    }, [location]);

    const handleBookAdded = (newBook) => {
        if (!newBook.title || !newBook.author) {
            errorToast("El autor y/o título son requeridos");
            return;
        }

        addBook(
            newBook,
            data => {
                setBookList(prev => [data, ...prev]);
                successToast(`¡Libro "${data.title}" agregado correctamente!`);
                navigate("/library", { replace: true });
            },
            err => {
                console.error("Error al agregar libro:", err.message);
                errorToast("Error al agregar el libro");
                fetchBooks(); // Para asegurar consistencia
            }
        );
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
        handleUserLogout(); // cerramos sesión desde el contexto
        navigate("/login");
    };

    const handleNavigateAddBook = () => {
        navigate("/library/add-book", { replace: true });
    };

    const handleDeleteBook = (bookId, bookTitle) => {
        deleteBook(
            bookId,
            () => {
                setBookList(prev => prev.filter(book => book.id !== bookId));
                successToast(`¡Libro "${bookTitle}" eliminado correctamente!`);
            },
            err => {
                console.error("Error al eliminar libro:", err.message);
                errorToast("Error al eliminar el libro");
            }
        );
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