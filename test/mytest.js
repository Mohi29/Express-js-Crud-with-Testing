let expect = require('chai').expect;
let should = require('chai').should();
let supertest =require('supertest');
let app = require('../app');
let Url = supertest(app);
let sinon = require('sinon');
let schema = require('../model/bookSchema');
let modelstubfetch = sinon.stub(schema,'find');
let modelstubupdate = sinon.stub(schema, 'update');
let modelstubinsert = sinon.stub(schema , 'create');
let modelstubdelete = sinon.stub(schema, 'remove');

describe('test for server connections',() => {
	it('response from get',(done)=> {
		Url
		.get('/')
		.end((err,res)=>{
			if(err){
				console.log(err);
			} else{
				res.text.should.be.an('String');
				done();
			}		
		})
	})
})

describe('fetching book',()=> {
	before(()=>{
		modelstubfetch.yields(null,{Title:'harry potter',Price:400,Author:'J K Rolling',Category:'Thrill'});
	});

	it('checking get on books',(done)=> {
		Url  
		.get('/books')
		.expect(200)
		.expect('Content-Type', /json/)
		.end((err, res)=> { 
			if (err) {
				return done(err);
			} else {                       
				res.body.should.have.property('Title','harry potter');
				res.body.should.have.property('Price',400);
				res.body.should.have.property('Author','J K Rolling');
				res.body.should.have.property('Category','Thrill');
				done();
			}
		});
	});

	before(()=>{
		modelstubfetch.withArgs({Title:'3 mistakes of my life'})
		.yields(null,{Price:400,Author:'J K Rolling',Category:'Thrill'});
	});

	it('checking get on books by Title',(done)=> {
		Url  
		.get('/books/3 mistakes of my life')
		.expect(200)
		.expect('Content-Type', /json/)
		.end((err, res)=> { 
			if (err) {
				return done(err);
			} else {                       
				res.body.should.have.property('Author','J K Rolling');
				res.body.should.have.property('Category','Thrill');
				done();
			}
		});
	});
});

describe('post book',()=> {
	before(()=>{
		modelstubinsert.yields(null,{Title:'3 mistakes of my life',Price:100,Author:'Chetan Bhagat',Category:'Fiction'});
	});

	it('checking post',(done)=> {
		Url  
		.post('/books/insert')
		.send({Title:'3 mistakes of my life',Price:100,Author:'Chetan Bhagat',Category:'Fiction'})
		.expect(200)
		.expect('Content-Type', /json/)
		.end((err, res)=> { 
			if (err) {
				return done(err);
			} else {                      
				res.body.should.have.property('Title','3 mistakes of my life');
				res.body.should.have.property('Price',100);
				res.body.should.have.property('Author','Chetan Bhagat');
				res.body.should.have.property('Category','Fiction');
				done();
			}
		});
	});
});

describe('update book', ()=> {
	before(()=>{
		modelstubupdate.withArgs({ Title:'still'},
			{$set:{Price:98 , Author:'Arpit Vageria' , Category:'Love'}})
		.yields(null,{ok:1, nModified:1, n:0});
	});
	it('checking put',(done)=> {
		Url  
		.put('/books/update/still')
		.send({Price:98 , Author:'Arpit Vageria' , Category:'Love'})
		.expect(200)
		.set('Accept', 'application/json')
		.expect('Content-Type', 'application/json; charset=utf-8')
		.end((err, res)=> { 
			if (err) {
				return done(err);
			}else{
				expect(res.body.ok).to.equal(1);
				expect(res.body.nModified).to.equal(1);
				expect(res.body.n).to.equal(0);                   
				done();
			}                   
		});
	});
});

describe('delete book', ()=>{
	before(()=>{
		modelstubdelete.withArgs({Title:'A dare to lyf'})
		.yields(null,{ok:1, nModified:0,n:0});
	});

	it('checking delete', (done)=>{
		Url
		.delete('/books/delete/A dare to lyf')
		.expect(200)
		.end((err,res)=>{
			if(err) {
				return done(err);
			}else{
				expect(res.body.ok).to.equal(1);
				expect(res.body.nModified).to.equal(0);
				expect(res.body.n).to.equal(0);
				done();
			}
		});
	});
});

