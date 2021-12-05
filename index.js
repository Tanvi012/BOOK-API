require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')


//Database
const database = require('./database')

//Initialize
const booky = express()

//model 

const bookModel = require('./databases/book')
const authorModel = require('./databases/author')
const publicationModel = require('./databases/publications')

mongoose.connect(
  process.env.MONGO_URL
).then(()=>console.log("connection established"))

//API of all books
/*
Route           /
Description     Get specific book
Access          Public
Parameter       isbn 
Methods         GET
*/
booky.get('/', (req, res) => {
    return res.json({ books: database.books })
})

//API for spcific book
//GET A SPECIFIC BOOK localhost:3000/12345Book
/*
Route           /
Description     Get specific book
Access          Public
Parameter       isbn 
Methods         GET
*/
booky.get('/is/:isbn', (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
    )
    if (getSpecificBook.length == '0') {
        return res.json({ error: `No book of ISBN ${req.params.isbn} found` })
    }
    return res.json({ book: getSpecificBook })
})

//GET BOOKS on a specific category
/*
Route           /c
Description     Get specific book by category
Access          Public
Parameter       category
Methods         GET
*/
booky.get('/c/:category', (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.category)
    )
    if (getSpecificBook.length === 0) {
        return res.json({ error: `No book of Category "${req.params.category}" found` })
    }
    return res.json({ book: getSpecificBook })
})

//GET BOOKS on a specific language
/*
Route           /l
Description     Get specific book by language
Access          Public
Parameter       language
Methods         GET
*/
booky.get('/l/:language', (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.language == req.params.language
    )
    if (getSpecificBook.length === 0) {
        return res.json({ error: `No book of language ${req.params.language} found` })
    }
    return res.json({ book: getSpecificBook })
})

//GET all authors
/*
Route           /a
Description     Get all authors
Access          Public
Parameter       none
Methods         GET
*/
booky.get('/a/', (req, res) => {
    return res.json({ author: database.authors })
})

//GET authors by ID
/*
Route           /a
Description     Get authors by ID
Access          Public
Parameter       id
Methods         GET
*/
booky.get('/a/:id', (req, res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.id = req.params.id
    )
    if (getSpecificAuthor.length === 0) {
        return res.json({ error: `No Author of ID: ${req.params.id} found` })
    }
    return res.json({ author: getSpecificAuthor })
})

//GET authors by book
/*
Route           /a/book/
Description     Get authors by book
Access          Public
Parameter       id
Methods         GET
*/
booky.get('/a/book/:isbn', (req, res) => {
    const getSpecificAuthor = database.authors.filter(
        (author) => author.books.includes(req.params.isbn)
    )
    if (getSpecificAuthor.length === 0) {
        return res.json({ error: `No Author of book: ${req.params.isbn} found` })
    }
    return res.json({ author: getSpecificAuthor })
})

//GET all publications
/*
Route           /a/book/
Description     Get all publications
Access          Public
Parameter       id
Methods         GET
*/
booky.get('/publications/', (req, res) => {
    return res.json({ author: database.publications })
})

//GET publications by ID
/*
Route           /a
Description     Get publications by ID
Access          Public
Parameter       id
Methods         GET
*/
booky.get('/p/:id', (req, res) => {
    const getSpecificPublication = database.publications.filter(
        (publication) => publication.id = req.params.id
    )
    if (getSpecificPublication.length === 0) {
        return res.json({ error: `No Publication of ID: ${req.params.id} found` })
    }
    return res.json({ author: getSpecificPublication })
})

//ADD NEW BOOKS
/*
Route           /book/new
Description     add new books
Access          Public
Parameter       NONE
Methods         POST
*/

booky.post("/book/new", async (req,res)=> {
    const newBook = req.body;
    database.books.push(newBook)
    return res.json({updateBook: database.books});
  });
  
  //ADD NEW AUTHORS
  /*
  Route           /author/new
  Description     add new authors
  Access          Public
  Parameter       NONE
  Methods         POST
  */
  
  booky.post("/a/new", async (req,res)=> {
    const newAuthor = req.body;
    database.author.push(newAuthor)
    return res.json({updateAuthors: database.authors});
  });
  
  //ADD NEW publications
  /*
  Route           /publication/new
  Description     add new publications
  Access          Public
  Parameter       NONE
  Methods         POST
  */
  
  booky.post("/publication/new", (req,res)=> {
    const newPublication = req.body;
    database.publication.push(newPublication);
    return res.json({updatedPublications: database.publication});
  });
  
  //Update a book title
  /*
  Route           /book/update/:isbn
  Description     update title of the book
  Access          Public
  Parameter       isbn
  Methods         PUT
  */
  booky.put("/book/update/:isbn", async (req,res)=> {
    const updatedBook = await BookModel.findOneAndUpdate(
      {
        ISBN: req.params.isbn
      },
      {
        title: req.body.bookTitle
      },
      {
        new: true
      }
    );
  
    return res.json({books: database.books});
  });
  
  
  
  //UPADTE PUB AND BOOK
  /*
  Route           /publication/update/book
  Description     update the pub and the book
  Access          Public
  Parameter       isbn
  Methods         PUT
  */
  
  booky.put("/publication/update/book/:isbn", (req,res)=> {
    //UPDATE THE PUB DB
    database.publication.forEach((pub) => {
      if(pub.id === req.body.pubId) {
        return pub.books.push(req.params.isbn);
      }
    });
  
    //UPDATE THE BOOK DB
    database.books.forEach((book) => {
      if(book.ISBN == req.params.isbn) {
        book.publications = req.body.pubId;
        return;
      }
    });
  
    return res.json(
      {
        books: database.books,
        publications: database.publication,
        message: "Successfully updated!"
      }
    )
  
  });
  
  //DELETE A BOOK
  /*
  Route           /book/delete
  Description     delete a book
  Access          Public
  Parameter       isbn
  Methods         DELETE
  */
  
  booky.delete("/book/delete/:isbn", async (req,res)=> {
    const updateBookDatabase = await BookModel.findOneAndDelete({
      ISBN: req.params.isbn
    });
  
    return res.json({books: updateBookDatabase});
  });
  
  //DELETE AN AUTHOR FROM A BOOK AND VICE VERSA
  /*
  Route           /book/delete/author
  Description     delete an author from a book and vice versa
  Access          Public
  Parameter       isbn, authorId
  Methods         DELETE
  */
  
  booky.delete("/book/delete/author/:isbn/:authorId", async (req,res)=> {
    //Update the book db
    const updatedBook = await BookModel.findOneAndUpdate(
      {
        ISBN: req.params.isbn
      },
      {
       $pull: {
         authors: parseInt(req.params.authorId)
       }
     },
     {
       new: true
     }
   );
    //Update author db
    database.author.forEach((eachAuthor) => {
      if(eachAuthor.id === parseInt(req.params.authorId)) {
        const newBookList = eachAuthor.books.filter(
          (book) => book !== req.params.isbn
        );
        eachAuthor.books = newBookList;
        return;
      }
    });
  
    return res.json({
      book: database.books,
      author: database.author,
      message: "Author and book were deleted!!!"
    });
  
  });

booky.listen(3000, () => console.log('Server is up and running'))
