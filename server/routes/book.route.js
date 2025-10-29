import { Router } from 'express';
import upload from '../config/multer.js';
import { addBookController, fetchBooksController } from '../controllers/book.controller.js';

const bookRoutes = Router();

bookRoutes.get('/', fetchBooksController);
bookRoutes.post('/add', upload.single("coverImage"), addBookController);

export default bookRoutes;