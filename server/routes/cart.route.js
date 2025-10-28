import express from 'express';

const cartRouter = express.Router();

cartRouter.get('/', (req, res) => {
    res.send("Hey, i'm him you know")
})

export default cartRouter;