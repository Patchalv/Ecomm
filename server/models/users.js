const { query } = require('../db/db');


// Get all users

const getAllUsers = async () => {
    try {
        const result = await query(
            "SELECT * FROM users"
        );
        return result.rows;
        
    } catch (error) {
        throw err.stack;
    }
}


// GET User by ID

const getUserById = async (user_id) => {

    try {
        const statement = `
        SELECT * FROM users WHERE user_id = $1
        `;

        const values = [user_id];

        const result = await query(statement, values);
            
        return result.rows;
        
    } catch (error) {
        throw error;
    }
}

// DELETE User by Email

const deleteUserById = async (user_id) => {

    try {
        const statement = `
        DELETE FROM users WHERE user_id = $1 RETURNING *
        `;

        const values = [user_id];

        const result = await query(statement, values);

        if (result.rows.length === 0) {
            // Product with the given ID was not found
            return null;
        }

        const deletedUser = result.rows[0];

        return deletedUser;
        
    } catch (error) {
        throw error;
    }
}



// GET User by Email

async function getUserByEmail(email) {
    try{
        const text = 'SELECT * FROM users WHERE email = $1;';
        const inputs = [email];
        const result = await query(text, inputs);
        return result.rows;
    } catch(err) {
        throw err.stack;
    }
}
  

// CREATE new user by Registration

async function registerUser (lname, fname, username, password, email) {

    try {
        
        // Check if Email exists
        const existingUserWithEmail = await getUserByEmail(email);

        if (existingUserWithEmail.length > 0) {
            return { success: false, message: 'A user with that email already exists' };
        }
       
        // If email doesn't already exist then continue to add the user:

        const statement = `
        INSERT INTO users ("lname", "fname", "username", "password", "email") VALUES ($1, $2, $3, $4, $5)
        `;

        const body = [lname, fname, username, password, email];
        await query(statement, body);
        return { success: true, message: 'User successfully registered' };

    } catch (error) {
        throw error;
    }
}

// UPDATE user 
async function updateUser (user_id, lname, fname, username, password, email, address, city, state, country) {
    try {
        // Check if ID exists
        const existingUserWithID = await getUserById(user_id);

        if (existingUserWithID.length === 0) {
            return { success: false, message: 'There is no user with that ID' };
        }

        // If that ID exists, continue
        const statement = `
        UPDATE users SET "lname" = $2, "fname" = $3, "username" = $4, "password" = $5, "email" = $6, "address" = $7, "city" = $8, "state" = $9, "country" = $10 WHERE user_id = $1
        `;
        const body = [user_id, lname, fname, username, password, email, address, city, state, country];
        await query(statement, body);
        return { success: true, message: 'User successfully updated' };
        
    } catch (error) {
        throw error;
    }
}







module.exports = {
    getAllUsers,
    getUserById, 
    getUserByEmail,
    deleteUserById,
    registerUser,
    updateUser
};