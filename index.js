const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;
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
    res.send(data);
  })
});

app.delete('/api/notes/:noteid', (req, res) => {
  console.log(req.body)
  console.log(req.params.id);
  fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    data = JSON.parse(data)
    let index = data.findIndex(function(o) {
      return o.id === req.params.noteid;
    })
    if (index !== -1) {
      data.splice(index, 1);
    }
    fs.writeFile('./db/db.json', JSON.stringify(data), (err) => {
      if (err) {
        console.log(err);        
      }
      res.end();
    })
  });
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
      if (err) {
        console.log(err);
      }
      res.end();
    });
  });
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})