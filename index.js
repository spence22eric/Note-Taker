const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'));

app.use('/notes', express.static('public/notes.html'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/notes', (req, res) => {
    console.log(req.body);
    console.log('pass');
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})