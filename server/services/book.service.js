import Book from "../model/book.model.js";
import cloudinary from "../config/cloudinary.js";
import { throwErr } from "../utils/error.utils.js";

/**
 * 
 * @param {number} limit Total books to be retrieved
 * @returns {Promise<object[]>} A promise that resolves to an array of book objects
 */
export const fetchBooksService = async (limit) => {
    try {
        const books = await Book.find().limit(limit);
        return books;
    } catch (error) {
        throwErr("Error fetching books", 404);
    }
}

/**
 * @param {string} id The book id
 * @throws throws error if book not found
 * @returns {Promise<object>} A promise that resolves to an object of book
 */
export const fetchBookByIdService = async (id) => {
    console.log("ID: ", id)
    try {
        const book = await Book.findById(id);
        if (!book) throwErr("No book found", 404);

        return book;
    } catch (error) {
        throwErr("Error fetching book", 500);
    }
}

/**
 * Store book cover in cloudinary and add book to database
 *
 * @param {string} title Title of the book
 * @param {string} description books's description
 * @param {number} price Book's price
 * @param {string} author Book's author
 * @param {object} categories A list of cateogries related to book
 * @param {object} file file object containing buffer of the book's cover
 * @returns {Promise<object>} newBook
 */
export const addBookService = async (title, description, price, author, categories, file) => {
    const book = await Book.findOne({title, author});

    if (book) return throwErr("Book with this title already exist", 401)

    return new Promise(async (resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "bookora/books" }, async (error, uploadResult) => {
          if (error) return reject(throwErr("Cloud upload failed", 500));

          try {
            const coverUrl = uploadResult.secure_url;
            const newBook = await Book.create({ title, description, price, author, categories, cover: coverUrl });
            
            return resolve(newBook);
        } catch (error) {
            return reject(throwErr(error.message))
        }
        })
        .end(file.buffer);
    })
};
