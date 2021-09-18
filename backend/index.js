require('dotenv').config()

const express = require('express')

const photo = require('./routes/photo')
const family = require('./routes/family')

const reminders = require('./routes/reminders')

const app = express()
const port = 3000

app.use('/photo', photo)
app.use(express.json())

app.use('/registration', registration)
app.use('/reminders', reminders);
app.use('/family', family)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})