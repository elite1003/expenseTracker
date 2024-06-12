import express from "express";
import {
  getExpense,
  postExpense,
  putExpense,
  deleteExpense,
} from "../controllers/expenses.mjs";

const router = express.Router();

router.get("/expense", getExpense);
router.post("/expense", postExpense);
router.put("/expense/:expenseId", putExpense);
router.delete("/expense/:expenseId", deleteExpense);

export default router;
