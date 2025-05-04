import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Badge, Button, Card, Row } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import BookForm from "../BookForm/BookForm";

const BookDetails = ({ onBookUpdated }) => {
    const [showBookForm, setShowBookForm] = useState(false);
    const [book, setBook] = useState(null);
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.book) {
            const bookState = {
                ...location.state.book,
                id: parseInt(id, 10)
            };
            setBook(bookState);
        } else {
            fetch(`http://localhost:3000/books/${id}`)
                .then(res => res.json())
                .then(data => setBook(data))
                .catch(err => console.log(err));
        }
    }, [id, location.state]);

    const clickHandler = () => {
        navigate("/library");
    };

    const handleShowBookForm = () => {
        setShowBookForm(!showBookForm);
    };

    const handleBookUpdated = (updatedBook) => {
        setBook(updatedBook);
        if (onBookUpdated) {
            onBookUpdated(updatedBook);
        }
        setShowBookForm(false);
    };

    if (!book) return <div>Cargando...</div>;

    const ratingStars = Array.from({ length: 5 }, (_, index) =>
        index < book?.rating ? <StarFill key={index} /> : <Star key={index} />
    );

    return (
        <div className="w-100">
            <Card className="w-25">
                <Card.Img
                    height={500}
                    variant="top"
                    src={book?.imageUrl ? book.imageUrl : "https://bit.ly/47NylZk"}
                    onError={(e) => {
                        e.target.src = "https://bit.ly/47NylZk";
                    }}
                />
                <Card.Body>
                    <div className="mb-2">
                        {book?.available ? (
                            <Badge bg="success">Disponible</Badge>
                        ) : (
                            <Badge bg="danger">Reservado</Badge>
                        )}
                    </div>
                    <Card.Title>{book?.title}</Card.Title>
                    <Card.Subtitle>{book?.author}</Card.Subtitle>
                    {ratingStars}
                    <p>{book?.pageCount} páginas</p>
                    <p className="my-3">
                        <b>Sinopsis</b>: {book?.summary}
                    </p>
                    <Row>
                        <Button className="mb-2 me-2" variant="secondary" onClick={handleShowBookForm}>
                            {showBookForm ? "Ocultar formulario" : "Editar libro"}
                        </Button>
                        <Button className="me-2" onClick={clickHandler}>
                            Volver a la página principal
                        </Button>
                    </Row>
                </Card.Body>
            </Card>
            {showBookForm && <BookForm isEditing={true} book={book} onBookSaved={handleBookUpdated} />}
        </div>
    );
};

export default BookDetails;
