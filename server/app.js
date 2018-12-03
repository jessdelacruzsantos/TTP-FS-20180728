const express = require('express');
const volleyball = require('volleyball');
const path = require('path');
const { db } = require('./db');

const app = express();

// logging middleware
app.use(volleyball);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', require('./auth'))
app.use('/api', require('./api'));

// static file serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));
console.log('*~~~~~~')




const start = async () => {
  const PORT = 8080;
  await db.sync({force:true});
  app.listen(PORT, err => {
    if (err) console.error(err);
    else console.log('server is listening on port', PORT);
  });
};

start();
