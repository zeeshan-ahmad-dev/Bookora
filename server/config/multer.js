import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer();

export default upload;