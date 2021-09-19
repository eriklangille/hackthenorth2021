require('dotenv').config()
const cors = require('cors')

const express = require('express')
const photo = require('./routes/photo')
const family = require('./routes/family')
const reminders = require('./routes/reminders')
const user = require('./routes/user')

const app = express()
const port = 5000
app.use(cors())

app.use(express.json())

// app.use('/registration', registration)
app.use(express.json())

app.use('/reminders', reminders);
app.use('/family', family);
app.use('/user', user)
app.use('/photo', photo)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})