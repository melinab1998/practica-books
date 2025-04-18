import { Book } from "../models/Books.js";

export const findBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while retrieving books." });
    }
};

export const findBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByPk(id);
        if (!book) return res.status(404).json({ message: "Book not found." });
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while retrieving the book." });
    }
};

export const createBook = async (req, res) => {
    try {
        const { title, author, rating, pageCount, summary, imageUrl, available } = req.body;

        if (!title || !author) {
            return res.status(400).json({ message: "Title and author are required." });
        }

        const newBook = await Book.create({
            title,
            author,
            rating,
            pageCount,
            summary,
            imageUrl,
            available,
        });

        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while creating the book." });
    }
};


export const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByPk(id);

        if (!book) return res.status(404).json({ message: "Book not found." });

        await book.update(req.body);
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while updating the book." });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByPk(id);

        if (!book) return res.status(404).json({ message: "Book not found." });

        await book.destroy();
        res.json({ message: "Book successfully deleted." });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while deleting the book." });
    }
};