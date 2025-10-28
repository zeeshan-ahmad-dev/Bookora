export const isAuthenticated = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({success: false, message: "Not authorized"})
    }

    next();
}