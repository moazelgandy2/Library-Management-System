import { Op } from "sequelize";

import Book from "../../../db/model/books.model.js";

export const newBook = async (req, res) => {
  const { title, author, genre } = req.body;
  const requiredFields = ["title", "author", "genre"];
  if (!title || !author || !genre) {
    return res.json({ message: "All fields are required", requiredFields });
  }
  try {
    const bookData = await Book.create({ title, author, genre });
    return res.json({ message: "Book created successfully", bookData });
  } catch (err) {
    return res.json({ message: "Error Creating Book", err });
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    return res.json({ message: "Books found", books });
  } catch (err) {
    return res.json({ message: "Error fetching books", err });
  }
};

export const searchBook = async (req, res) => {
  const { title } = req.query;
  try {
    const books = await Book.findAll({
      where: { title: { [Op.like]: `%${title}%` } },
    });
    if (books.length === 0) {
      return res.json({ message: "No book found" });
    }
    return res.json({ message: `Book found`, books });
  } catch (err) {
    console.log(err);
    return res.json({ message: "Error fetching book", err });
  }
};

export const updateBook = async (req, res) => {
  const { title, author, genre } = req.body;
  const { id } = req.params;

  try {
    const BookData = await Book.findOne({ where: { id } });

    if (!BookData) {
      return res.json({ message: "Book not found" });
    }

    const updatedBook = await Book.update({ title, author, genre }, { where: { id } });
    const updatedBookData = await Book.findOne({ where: { id } });
    return res.json({ message: "Book updated successfully", updatedBookData });
  } catch (err) {
    return res.json({ message: "Error updating book", err });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const BookData = await Book.findOne({ where: { id } });
    if (!BookData) {
      return res.json({ message: "Book not found" });
    }
    await Book.destroy({ where: { id } });
    return res.json({ message: "Book deleted successfully" });
  } catch (err) {
    return res.json({ message: "Error deleting book", err });
  }
};
