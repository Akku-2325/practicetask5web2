const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
            <title>Heroku App</title>
        </head>
        <body>
            <h1>Hello, World! Deployed with Heroku.</h1>
            <p>Enter your name:</p>
            <form action="/greet" method="post">
                <input type="text" name="name" placeholder="Your Name" />
                <button type="submit">Greet Me!</button>
            </form>
            <br/>
            <p> Add 2 numbers below: </p>
            <form action="/sum" method="get">
              <input type="text" name="a" placeholder="First number"/>
              <input type="text" name="b" placeholder="Second number"/>
              <button type="submit"> Sum it! </button>
            </form>
            <br/>
            <a href="/api/items"> Get API data! </a>
        </body>
        </html>
    `);
});

app.post('/greet', (req, res) => {
    const name = req.body.name;
    res.send(`<h1>Hello, ${name}!</h1><a href="/">Go Back</a>`);
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


app.get('/api/items', (req, res) => {
  const items = [
    { id: 1, name: 'Item 1', description: 'Description of Item 1' },
    { id: 2, name: 'Item 2', description: 'Description of Item 2' },
    { id: 3, name: 'Item 3', description: 'Description of Item 3' }
  ];
  res.json(items);
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
