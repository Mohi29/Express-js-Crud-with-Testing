//import express from 'express';
//import myBook from '../model/bookSchema';
let express = require('express');
let myBook = require('../model/bookSchema');
const router = express.Router();

/* insert book data */
router.post('/insert',(req,res)=> {
	myBook.create(req.body,(err,Book)=> {
		if(err){
			console.log("error while saving book");
			res.json("error while saving book");
		} else {
			console.log(Book);
			res.json(Book);
		}
	})
})

module.exports = router;