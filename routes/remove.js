//import express from 'express';
//import myBook from '../model/bookSchema';
let express = require('express');
let myBook = require('../model/bookSchema');
const router = express.Router();

/* delete book data */
router.delete('/delete/:id',(req,res)=> {
	myBook.remove({Title:req.params.id},(err,Book)=> {
		if(err){
		console.log("error while deleting book");
		res.send("error while deleting book");
		} else {
		console.log(Book);
		res.json(Book);
		}
	})
})

module.exports = router;