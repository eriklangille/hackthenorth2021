require('dotenv').config()
const cors = require('cors')

const express = require('express')
const photo = require('./routes/photo')
const family = require('./routes/family')
const reminders = require('./routes/reminders')
const user = require('./routes/user')

const app = express()
const port = 5000

const schedule = require('node-schedule');
const { pool } = require('./sql/sql')
const { sendSMSMessage } = require('./twilio/twilio')

const job = schedule.scheduleJob('0 10 * * *', async function () {
  const poolT = await pool()
  const res = await poolT
    .request()
    .query(`
    select *
    from family as t
    where exists (
      select *
      from todo as r
      where r.userId = t.userId
      and r.completeDate is null
      and GETDATE() > r.targetDate
	  )
  `)

  const sentMessages = []
  res.recordsets.foreach((r) => {
    sentMessages.push(r.phone)
    sendSMSMessage({
      phone: r.phone, message:
        `${r.FirstName} ${r.LastName} missed their reminder to do ${r.title} on ${new Date(r.targetDate).toTimeString()}`
    })
  })
});

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