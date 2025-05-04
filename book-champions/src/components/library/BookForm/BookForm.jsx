import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { successToast, errorToast } from "../../../utils/notifications.js";

const BookForm = ({ isEditing = false, book = {}, onBookSaved }) => {
    const navigate = useNavigate();

    const defaultBook = {
        title: "",
        author: "",
        rating: 0,
        pageCount: 0,
        imageUrl: "",
        summary: "",
        available: false
    };

    const [formData, setFormData] = useState({ ...defaultBook, ...book });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleAddBook = (event) => {
        event.preventDefault();

        if (!formData.title || !formData.author) {
            errorToast("El título y autor son requeridos");
            return;
        }

        const bookData = {
            ...formData,
            rating: parseInt(formData.rating, 10),
            pageCount: parseInt(formData.pageCount, 10)
        };

        fetch("http://localhost:3000/books", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("book-champions-token")}`
            },
            method: "POST",
            body: JSON.stringify(bookData)
        })
        .then(res => {
            if (!res.ok) throw new Error('Error en la respuesta del servidor');
            return res.json();
        })
        .then(data => {
            successToast(`¡Libro "${data.title}" agregado correctamente!`);
            navigate("/library", { replace: true });
        })
        .catch(err => {
            console.error("Error al agregar libro:", err);
            errorToast("Error al agregar el libro");
        });
    };

    const handleSaveBook = (event) => {
        event.preventDefault();

        const bookData = {
            ...formData,
            id: book.id,
            rating: parseInt(formData.rating, 10),
            pageCount: parseInt(formData.pageCount, 10)
        };

        fetch(`http://localhost:3000/books/${book.id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("book-champions-token")}`
            },
            method: "PUT",
            body: JSON.stringify(bookData)
        })
        .then(res => {
            if (!res.ok) throw new Error('Error al actualizar el libro');
            return res.json();
        })
        .then(updatedBook => {
            if (onBookSaved) onBookSaved(updatedBook);
            navigate("/library", { replace: true }); 
        })
        .catch(err => {
            console.error("Error al actualizar:", err);
            errorToast("Error al actualizar el libro");
        });
    };

    const handleBack = () => {
        navigate("/library", { replace: true });
    };

    return (
        <Card className="m-4 w-50" bg="success">
            <Card.Body>
                <Form className="text-white" onSubmit={isEditing ? handleSaveBook : handleAddBook}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Título</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    placeholder="Ingresar título"
                                    onChange={handleChange}
                                    value={formData.title}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="author">
                                <Form.Label>Autor</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="author"
                                    placeholder="Ingresar autor"
                                    onChange={handleChange}
                                    value={formData.author}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="rating">
                                <Form.Label>Puntuación</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="rating"
                                    placeholder="Ingresar cantidad de estrellas"
                                    max={5}
                                    min={0}
                                    onChange={handleChange}
                                    value={formData.rating}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="pageCount">
                                <Form.Label>Cantidad de páginas</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="pageCount"
                                    placeholder="Ingresar cantidad de páginas"
                                    min={1}
                                    onChange={handleChange}
                                    value={formData.pageCount}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Group className="mb-3" controlId="imageUrl">
                            <Form.Label>URL de imagen</Form.Label>
                            <Form.Control
                                type="text"
                                name="imageUrl"
                                placeholder="Ingresar url de imagen"
                                onChange={handleChange}
                                value={formData.imageUrl}
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-3" controlId="summary">
                            <Form.Label>Resumen</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="summary"
                                rows={3}
                                placeholder="Ingresar resumen del libro"
                                onChange={handleChange}
                                value={formData.summary}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-between">
                        <Col md={6} className="d-flex align-items-end">
                            <Button variant="light" onClick={handleBack}>
                                Volver
                            </Button>
                        </Col>
                        <Col md={3} className="d-flex flex-column justify-content-end align-items-end">
                            <Form.Check
                                type="switch"
                                id="available"
                                name="available"
                                className="mb-3"
                                label="¿Disponible?"
                                onChange={handleChange}
                                checked={formData.available}
                            />
                            <Button variant="primary" type="submit">
                                {isEditing ? "Editar lectura" : "Agregar Lectura"}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default BookForm;