// connect to my localhost database

const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost:27017/MeMessege')
  .then(() => {
    console.log('Connected to database')
  })
  .catch((err) => {
    console.log('Connection failed')
    console.log(err)
  })
