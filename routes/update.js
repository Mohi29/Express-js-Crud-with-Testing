//import express from 'express';
//import myBook from '../model/bookSchema';
let express = require('express');
let myBook = require('../model/bookSchema');
const router = express.Router();

/* update book data */
router.put('/update/:Title',(req,res)=> {
	console.log(req.body);
	myBook.update({
		Title:req.params.Title
	},{$set:{Author:req.body.Author,  Price:req.body.Price, Category:req.body.Category}},
	(err,newBook)=> {
		if(err){
			console.log("error while updating book");
			res.send("error while updating book");
		} else {
			console.log(newBook);
			res.json(newBook);
		}
	})
})

module.exports = router;