const express = require('express')

const reminders = require('./routes/reminders');

const app = express()
const port = 3000

app.use('/reminders', reminders);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})