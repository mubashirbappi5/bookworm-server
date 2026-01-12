import express, { type Application } from 'express';

const app:Application = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Bookworm Server is running');
});

export default app;
