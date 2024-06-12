import Expense from "../models/expenses.mjs";

export const getExpense = (req, res, next) => {
  Expense.findAll()
    .then((Expenses) => res.status(200).json(Expenses))
    .catch((err) => res.status(500).json({ error: "Internal Server Error" }));
};

export const postExpense = (req, res, next) => {
  const ExpenseData = req.body;
  Expense.create(ExpenseData)
    .then((newExpense) => res.status(201).json(newExpense))
    .catch((err) => res.status(400).json({ message: err.message }));
};

export const putExpense = (req, res, next) => {
  const ExpenseData = req.body;
  const ExpenseId = +req.params.expenseId;
  Expense.update(ExpenseData, { where: { id: ExpenseId } })
    .then(([updatedRows]) => {
      if (updatedRows > 0) {
        Expense.findByPk(ExpenseId).then((Expense) => {
          res.status(200).json(Expense);
        });
      } else {
        res.status(404).send();
      }
    })
    .catch((err) => res.status(500).json({ error: "Internal Server Error" }));
};

export const deleteExpense = (req, res, next) => {
  const ExpenseId = +req.params.expenseId;
  Expense.destroy({ where: { id: ExpenseId } })
    .then((deletedRows) => {
      if (deletedRows > 0) {
        res.status(200).json();
      } else {
        res.status(404).json();
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
};
