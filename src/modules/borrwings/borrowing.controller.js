import Book from "../../../db/model/books.model.js";
import Borrowing from "../../../db/model/borrowing.model.js";

export const getBorrowings = async (req, res) => {
  const { user } = req.headers;
  const { role } = user;

  try {
    const borrowings =
      role == "admin"
        ? await Borrowing.findAll()
        : await Borrowing.findAll({ where: { UserId: user.id } });
    return res.json({
      message: `${role !== "admin" ? "Your borrowings" : "All users borrowings"}`,
      borrowings,
    });
  } catch (err) {
    return res.json({ message: "Error fetching borrowings", err });
  }
};

export const borrowBook = async (req, res) => {
  const { user } = req.headers;
  const { id } = req.params;

  console.log(id);
  try {
    const book = await Book.findOne({ where: { id } });
    if (!book) {
      return res.json({ message: "Book not found" });
    }
    const isAvailable = !(await Borrowing.findOne({ where: { BookId: id } }));

    if (!isAvailable) {
      return res.json({ message: "Book not available" });
    }
  } catch (err) {
    console.log(err);
    return res.json({ message: "Error fetching book", err });
  }

  try {
    const borrowing = await Borrowing.create({ UserId: user.id, BookId: id });
    return res.json({ message: "Book borrowed successfully", borrowing });
  } catch (err) {
    return res.json({ message: "Error borrowing book", err });
  }
};

export const returnBook = async (req, res) => {
  const { user } = req.headers;
  const { id } = req.params;

  try {
    const borrowing = await Borrowing.findOne({ where: { BookId: id, UserId: user.id } });
    if (!borrowing) {
      return res.json({ message: "Book not borrowed" });
    }
    await borrowing.destroy();
    return res.json({ message: "Book returned successfully" });
  } catch (err) {
    return res.json({ message: "Error fetching borrowing", err });
  }
};
