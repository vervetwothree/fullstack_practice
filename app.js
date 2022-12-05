
require('dotenv').config()


const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const connectDB = require('./db/connect');
const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

// const mongoose = require('mongoose')
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
// const db = mongoose.connection
// db.on('error', error => console.error(error))
// db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)


const port = process.env.PORT || 3000
const start = async () => {
  try {
    await connectDB(process.env.DATABASE_URL);
	if(connectDB){console.log('connected to DB')}
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
