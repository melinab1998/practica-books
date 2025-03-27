import React, { useState } from "react"; 
import { Card, Button, Badge } from "react-bootstrap";

const BookItem = ({ bookTitle, author, rating, pages, imageUrl, available }) => {

    const [title, setTitle] = useState(bookTitle);

    const handleTitle = () => {
        setTitle("Título Actualizado!");
    };

    return (
        <Card style={{ width: "22rem" }} className="mx-3">
            <Card.Img
                height={400}
                variant="top"
                src={imageUrl !== "" ? imageUrl : "https://bit.ly/47NylZk"}
            />
            <Card.Body>
                <div className="mb-2">
                
                {available? <Badge bg="success">Disponible</Badge>:<Badge bg="danger">Reservado</Badge>}

                </div>
                <Card.Title>{title}</Card.Title> 
                <Card.Subtitle>{author}</Card.Subtitle>
                <div>{"★".repeat(rating)} estrellas</div>
                <p>{pages} páginas</p>
                <Button onClick={handleTitle}>Actualizar Título</Button>
            </Card.Body>
        </Card>
    );
};

export default BookItem;