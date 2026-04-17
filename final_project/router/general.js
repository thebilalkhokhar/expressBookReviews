const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 7: Register a new user
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Task 2 & 10: Get the book list available in the shop (Using Promise)
public_users.get("/", function (req, res) {
  const get_books = new Promise((resolve, reject) => {
    resolve(res.send(JSON.stringify({ books }, null, 4)));
  });
  get_books.then(() => console.log("Promise for Task 10 resolved"));
});

// Task 3 & 11: Get book details based on ISBN (Using Promise)
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  const get_book_isbn = new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(res.status(200).json(books[isbn]));
    } else {
      reject(res.status(404).json({ message: "Book not found" }));
    }
  });
  get_book_isbn.then(() => console.log("Promise for Task 11 resolved"));
});

// Task 4 & 12: Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;
  const get_books_author = new Promise((resolve, reject) => {
    let filtered_books = Object.values(books).filter(
      (book) => book.author === author,
    );
    if (filtered_books.length > 0) {
      resolve(res.status(200).json(filtered_books));
    } else {
      reject(
        res.status(404).json({ message: "No books found by this author" }),
      );
    }
  });
  get_books_author.then(() => console.log("Promise for Task 12 resolved"));
});

// Task 5 & 13: Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;
  const get_books_title = new Promise((resolve, reject) => {
    let filtered_books = Object.values(books).filter(
      (book) => book.title === title,
    );
    if (filtered_books.length > 0) {
      resolve(res.status(200).json(filtered_books));
    } else {
      reject(
        res.status(404).json({ message: "No books found with this title" }),
      );
    }
  });
  get_books_title.then(() => console.log("Promise for Task 13 resolved"));
});

// Task 6: Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.status(200).json(books[isbn].reviews);
  } else {
    res.status(404).json({ message: "No reviews found for this ISBN" });
  }
});

module.exports.general = public_users;
