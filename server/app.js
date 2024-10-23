import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());

const notes = [];

app.post('/api/notes', (req, res) => {
  notes.push(req.body);
  res.status(201).json('hello world')
})

app.get('/api/notes', (req, res) => {
  res.status(200).json(notes);
})

app.listen(3000, () => {
  console.log('server listen on port', 3000)
});