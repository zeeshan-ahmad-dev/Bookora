<!-- User Profile -->
GET /user/profile -> get logged-in user profile
PUT /user/profile -> update user profile
<!-- User Wishlist -->
GET /user/wishlist -> view wishlist
POST /user/wishlist -> add to wishlist
DELETE /user/wishlist/:bookId -> delete from wishlist
<!-- Cart -->
GET /cart -> get user cart
POST /cart -> add item to cart
PUT /cart/:itemId -> update quantity in cart
DELETE /cart/:itemId -> delete item from cart
<!-- Checkout -->
POST /checkout -> Place order (after payment or COD)
<!-- Books -->
GET /books -> get all books
Get /books/:id -> get specific book using id
<!-- Reviews -->
POST /reviews/:booksId -> add a review for a book

<!-- Auth -->
POST /register
POST /login
POST /forgot-password