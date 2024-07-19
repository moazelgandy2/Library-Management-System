import { DataTypes } from "sequelize";
import { sequelize } from "../connect.js";
import User from "./user.model.js";
import Book from "./books.model.js";

const Borrowing = sequelize.define(
  "Borrowing",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    timestamps: true,
  }
);

User.hasMany(Borrowing, { onDelete: "cascade", onUpdate: "cascade" });
Borrowing.belongsTo(User);

Book.hasOne(Borrowing, { onDelete: "cascade", onUpdate: "cascade" });
Borrowing.belongsTo(Book);

export default Borrowing;
