import React, { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { StarFill, Star } from "react-bootstrap-icons";

const BookItem = ({ bookTitle, author, rating, pages, imageUrl, available }) => {

    const [title, setTitle] = useState(bookTitle);

    const handleTitle = () => {
        setTitle("Título Actualizado!");
    };

    const maxStars = 5;

    return (
        <Card style={{ width: "22rem" }} className="mx-3">
            <Card.Img
                height={400}
                variant="top"
                src={imageUrl !== "" ? imageUrl : "https://bit.ly/47NylZk"}
            />
            <Card.Body>
                <div className="mb-2">

                    {available ? <Badge bg="success">Disponible</Badge> : <Badge bg="danger">Reservado</Badge>}

                </div>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle>{author}</Card.Subtitle>
                <div>
                    <div>
                        {Array.from({ length: maxStars }, (_, i) =>
                            i < rating ? (
                                <StarFill key={i} color="gold" />
                            ) : (
                                <Star key={i} color="gray" />
                            )
                        )}
                    </div>
                </div>
                <p>{pages} páginas</p>
                <Button onClick={handleTitle}>Actualizar Título</Button>
            </Card.Body>
        </Card>
    );
};

export default BookItem;