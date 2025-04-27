import React, { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { StarFill, Star } from "react-bootstrap-icons";
import ConfirmDeleteModal from "../../ui/ConfirmDeleteModal/ConfirmDeleteModal";
import { useNavigate } from "react-router-dom";

const BookItem = ({
    id,
    bookTitle,
    author,
    rating,
    pages,
    imageUrl,
    available,
    summary,
    onDelete
}) => {
    const [title, setTitle] = useState(bookTitle);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const maxStars = 5;

    const handleDelete = () => {
        onDelete();
        setShowModal(false);
    };

    const handleClick = () => {
        navigate(`${id}`, {
            state: {
                book: {
                    title,
                    author,
                    rating,
                    pageCount: pages,
                    summary,
                    imageUrl,
                    available
                }
            }
        });
    };

    return (
        <>
            <Card style={{ width: "22rem" }} className="mx-3 mb-4">
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

                    {/*<Button className="me-2" onClick={handleTitle}>
                        Actualizar Título
                    </Button>*/}
                    <Button variant="primary" onClick={handleClick}>
                        Seleccionar libro
                    </Button>
                    <Button variant="danger" className="me-2" onClick={() => setShowModal(true)}>
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