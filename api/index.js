import express from "express"
import cors from "cors"
import { updateExpenses, createExpenses, fetchExpenses, deleteExpenses } from "./expense.js";
import serverless from "serverless-http"

const app = express();
const port = 3001;

app.use(express.json());

if (process.env.DEVELOPMENT){
    app.use(cors());
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/expense', async(req, res) => {
  try {
    const expenses = await fetchExpenses();

    res.send(expenses.Items);

  } catch (err){
    res.status(400).send(`Error fetching expenses: ${err}`);
  }
});

app.post('/expense', async(req, res) => {
   try {
    const expense = await req.body;

    const response = await createExpenses(expense);

    res.send(response);

  } catch (err){
    res.status(400).send(`Error creating expenses: ${err}`);
  }
});

app.put('/expense', async(req, res) => {
     try {
    const expense = await req.body;

    const response = await updateExpenses(expense);

    res.send(response);

  } catch (err){
    res.status(400).send(`Error updating expenses: ${err}`);
  }
});

app.delete('/expense/:id', async(req, res) => {
    try {
        const { id } = req.params;

        const response = await deleteExpenses(id);

        res.send(response);

  } catch (err){
    res.status(400).send(`Error deleting tasks: ${err}`);
  }
});

if(process.env.DEVELOPMENT){
    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    });
}


export const handler = serverless(app);