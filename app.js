//import express from 'express';
//import http from 'http';
//import bodyParser from 'body-parser';
//import mongoose from 'mongoose';
//import logger from 'morgan';
//import path from 'path';
//import fs from 'fs';
//import index from './routes/index';
//import insert from './routes/insert';
//import remove from './routes/remove';
//import update from './routes/update';
let express = require('express');
let http = require('http');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let logger = require('morgan');
let path = require('path');
let fs = require ('fs');
let index = require('./routes/index'),
		insert = require('./routes/insert'),
		remove = require('./routes/remove'),
		update = require('./routes/update');
let myBook = require('./model/bookSchema');
const app = express();

/* port listen and host creation */
const port = 8002;
http.createServer(app).listen(port, '127.0.0.1');
console.log('Server running at http://127.0.0.1:/'+port);

//setup body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//providing routes to handle request
app.use('/books',index);
app.use('/books',insert);
app.use('/books',update);
app.use('/books',remove);


// create a write stream (in append mode) 
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
 
// setup the logger 
app.use(logger('combined', {stream: accessLogStream}))

/* mongoose db connection */
const db = 'mongodb://localhost/mydb1';
mongoose.connect(db,{useMongoClient: true});

module.exports = app;
