import React, { useState } from 'react'
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { API_URL } from '../utils';

export const AddExpenseForm = ( {fetchExpenses} ) => {
    const [newExpense, setNewExpense] = useState("");

    const addNewExpense = async () => {
        try {
            await axios.post(API_URL, {
                name: newExpense,
                paid: false,
            })
            await fetchExpenses();
            
            setNewExpense("");

        } catch(err) {
            console.log(err);
        }
        
    };

  return (
    <div>
        <Typography align="center" variant="h2" paddingTop={2} paddingBottom={2}>Expense Manager</Typography>

        <div className="addExpenseForm">
            <TextField 
                size="small"
                label="Expense" 
                variant="outlined" 
                value={newExpense} 
                onChange={(e) => setNewExpense(e.target.value)} 
            />
            <Button 
                disabled={!newExpense.length}  
                variant='outlined' 
                onClick={addNewExpense}
            >
                <AddIcon />
            </Button>

        </div>
    </div>
  );
};
