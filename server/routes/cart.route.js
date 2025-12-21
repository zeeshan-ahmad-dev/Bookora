import express from 'express';
import { addItemToCartController, removeItemToCartController, getCartController, updateCartController } from '../controllers/cart.controller.js'

const cartRouter = express.Router();

cartRouter.get('/', getCartController);
cartRouter.post('/add-book', addItemToCartController);
cartRouter.post('/remove-book', removeItemToCartController);
cartRouter.post('/update-cart', updateCartController);

export default cartRouter;