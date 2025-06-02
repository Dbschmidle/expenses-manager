import { Button, Checkbox, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import { UpdateExpenseForm } from "./UpdateExpenseForm";
import classnames from "classnames";
import axios from "axios";
import { API_URL } from "../utils";

export const Expense = ({ expense, fetchExpenses }) => {
  const { id, name, paid, amount } = expense;
  const [isPaid, setIsPaid] = useState(paid);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpdateExpenseCompletion = async () => {
    try {
      await axios.put(API_URL, {
        id,
        name,
        paid: !paid,
        amount,
      });
      setIsPaid((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteExpense = async () => {
    try {

      await axios.delete(`${API_URL}/${expense.id}`);
        
      await fetchExpenses();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="expense">
      <div
        className={classnames("flex", {
          done: isPaid,
        })}
      >
        <Checkbox checked={isPaid} onChange={handleUpdateExpenseCompletion} />
        <Typography variant="h4"> {name} </Typography>
        <Typography variant="h6" color="textSecondary"> ${amount?.toFixed(2)} </Typography>
      </div>
      <div className="expenseButtons">
        <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
          <EditIcon />
        </Button>
        <Button color="error" variant="contained" onClick={handleDeleteExpense}>
          <DeleteIcon />
        </Button>
      </div>
      <UpdateExpenseForm
        fetchExpenses={fetchExpenses}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        expense={expense}
      />
    </div>
  );
};