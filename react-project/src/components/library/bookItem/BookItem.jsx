import React, { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { StarFill, Star } from "react-bootstrap-icons";
import ConfirmDeleteModal from "../../ui/ConfirmDeleteModal/ConfirmDeleteModal"

const BookItem = ({ bookTitle, author, rating, pages, imageUrl, available, onDelete }) => {
    const [title, setTitle] = useState(bookTitle);
    const [showModal, setShowModal] = useState(false);

    const handleTitle = () => setTitle("Título Actualizado!");
    const maxStars = 5;

    const handleDelete = () => {
        onDelete();
        setShowModal(false);
    };

    return (
        <>
            <Card style={{ width: "22rem" }} className="mx-3">
                <Card.Img
                    height={400}
                    variant="top"
                    src={imageUrl !== "" ? imageUrl : "https://bit.ly/47NylZk"}
                />
                <Card.Body>
                    <div className="mb-2">
                        {available ? (
                            <Badge bg="success">Disponible</Badge>
                        ) : (
                            <Badge bg="danger">Reservado</Badge>
                        )}
                    </div>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle>{author}</Card.Subtitle>
                    <div className="mb-2">
                        {Array.from({ length: maxStars }, (_, i) =>
                            i < rating ? (
                                <StarFill key={i} color="gold" />
                            ) : (
                                <Star key={i} color="gray" />
                            )
                        )}
                    </div>
                    <p>{pages} páginas</p>
                    <Button className="me-2" onClick={handleTitle}>
                        Actualizar Título
                    </Button>
                    <Button variant="danger" onClick={() => setShowModal(true)}>
                        Eliminar
                    </Button>
                </Card.Body>
            </Card>

            <ConfirmDeleteModal
                show={showModal}
                onHide={() => setShowModal(false)}
                onConfirm={handleDelete}
                bookTitle={title}
            />
        </>
    );
};

export default BookItem;