import express from 'express';
import { addItemToCartController, removeItemToCartController, getCartController, updateCartController, clearCartController } from '../controllers/cart.controller.js'

const cartRouter = express.Router();

cartRouter.get('/', getCartController);
cartRouter.post('/add-book', addItemToCartController);
cartRouter.delete('/remove-book/:bookId', removeItemToCartController);
cartRouter.post('/update-cart', updateCartController);
cartRouter.delete('/clear', clearCartController);

export default cartRouter;