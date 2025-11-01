import bcrypt from 'bcrypt';

const SALT = 10; 

/**
 * Hashes a password
 * 
 * @param {string} password Password to be hashed 
 * @returns {Promise<string>} Hashed Password
 */
export const hashPassword = async (password) => {
    try {
        const hashedPasword = await bcrypt.hash(password, SALT);
        return hashedPasword;
    } catch (error) {
        console.error("Error hashing password:", error)
        throw error;
    }
}

/**
 * Compares plain and hashed password
 * 
 * @param {string} plainPassword The original plain password
 * @param {string} hashedPassword hashed Password stored in db
 * @returns {Promise<Boolean>} True if passwords match, otherwise false
 */
export const comparePassword = async (plainPassword, hashedPassword) => {
    try {
        const areMatched = await bcrypt.compare(plainPassword, hashedPassword)
        return areMatched;
    } catch (error) {
        console.error("Error comparing passwords:", error);
        return false;
    }
}