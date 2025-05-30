const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/books', (req, res) => {
  const data = fs.readFileSync('./data/books.json', 'utf8');
  res.json(JSON.parse(data));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
