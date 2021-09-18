const express = require('express')

const registration = require('./routes/registration')
const reminders = require('./routes/reminders')

const app = express()
const port = 3000

app.use('/registration', registration)
app.use('/reminders', reminders);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})