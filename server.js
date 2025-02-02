const express = require('express');
const app = express();

app.get('/', (req, res) => {
  let name = req.query.name; 
  if (name) {
    res.send(`Hello, ${name}! Deployed with Heroku. This is a new feature.`);
  } else {
     res.send('Hello, World! Deployed with Heroku. This is a new feature.');
  }
});

app.get('/items/:itemId', (req, res) => {
  const itemId = req.params.itemId; 
  res.send(`Viewing item with ID: ${itemId}`);
});

app.get('/sum', (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    if (isNaN(a) || isNaN(b)) {
        res.status(400).send('Invalid parameters. Please provide numbers for a and b.');
        return;
    }
     res.send(`The sum of ${a} and ${b} is: ${a+b}`);
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
