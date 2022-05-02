const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
const crypto = require('crypto');

app.use(express.static('public'))

app.use("/notes", express.static('public/notes.html'))
app.use(express.json())

app.get('/', (req, res) => {
  fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    res.send(data);
  })
})

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    res.send(data)
  })
});

app.post('/api/notes', (req, res) => {
  const id = crypto.randomBytes(16).toString("hex");
  req.body.id = id
  console.log(req.body)
  console.log('pass')
  fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    console.log(data);
    data = JSON.parse(data)
    data.push(req.body)
    fs.writeFile('./db/db.json', JSON.stringify(data), (err) => {
      if (err)
        console.log(err);
    });
  })
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})