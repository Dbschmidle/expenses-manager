import React, { useState } from 'react'
import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import { API_URL } from '../utils';


export const UpdateExpenseForm = ({fetchExpenses, isDialogOpen, setIsDialogOpen, expense}) => {
    const { id, paid } = expense;
    const [expenseName, setExpenseName] = useState("");

    const handleUpdateExpenseName = async () => {
        try {
            await axios.put(API_URL, {
                id, 
                name: expenseName, 
                paid,
            });
            await fetchExpenses();

            setExpenseName("");
            
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <Dialog open={isDialogOpen}>
        <DialogTitle>Edit Expense</DialogTitle>
        <div className='dialog'>
            <TextField size='small' label='expense' variant='outlined' onChange={(e) => setExpenseName(e.target.value)}/>
            <Button variant="contained" onClick={async () => {
                await handleUpdateExpenseName();
                setIsDialogOpen(false);}
                }> <CheckIcon /> 
            </Button>
        </div> 
    </Dialog>
  )
}
