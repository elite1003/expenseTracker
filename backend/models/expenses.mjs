import sequelize from "../utils/database.mjs";
import { DataTypes, Model } from "sequelize";

class Expense extends Model {}

Expense.init(
  {
    expenseAmount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, timestamps: false, modelName: "Expense" }
);

export default Expense;
