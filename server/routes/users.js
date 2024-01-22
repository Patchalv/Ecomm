const express = require('express');
const router = express.Router();
const userInstance = require('../models/users');

// http://localhost:PORT/users/

//GET all users

router.get('/', async (req, res) => {
    try {
        const userList = await userInstance.getAllUsers();
        res.json(userList)
    } catch (error) {
        res.status(400).send(error);
    }
})

//GET user by id

router.get('/:user_id', async (req, res) => {
    let user_id = req.params.user_id;

    try {
        const user = await userInstance.getUserById(user_id);
        if (!user) return res.status(404).send('Invalid user ID');
        res.json(user);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Get user by email
// http://localhost:PORT/users/email/user2@example.com

router.get('/email/:email', async (req, res) => {
    let email = req.params.email;

    try {
        const checkUserEmailExists = await userInstance.getUserByEmail(email);
        if (!checkUserEmailExists) return res.status(404).send('There is no user with that email');
        res.json(checkUserEmailExists);
    } catch (error) {
        res.status(400).send(error);
    }
})

// DELETE user by id
router.delete('/:user_id', async (req, res) => {
    let user_id = req.params.user_id;

    try {
        const deletedResult = await userInstance.deleteUserById(user_id);

        if (!deletedResult) return res.status(404).send('There is no user with that ID');

        res.send(`User with ID ${user_id} was deleted successfuly`);
            
    } catch (error) {
        res.status(400).send(error);
    }
})

// CREATE new user by registration
router.post('/registration', async (req, res) => {
    
    try {

        const { lname, fname, username, password, email } = req.body;


        // Check that all fields are not empty
        if (!lname || !fname || !username || !password || !email) {
            return res.status(400).send('Please provide first name, last name, username, password and email in the request body.');
        }

        const registrationResult = await userInstance.registerUser(lname, fname, username, password, email);

        if (registrationResult.success) {
            res.json({ success: true, message: registrationResult.message });
        } else {
            res.status(400).json({ success: false, message: registrationResult.message });
        }        
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
})

// UPDATE user 
router.put('/:user_id', async (req, res) => {
    
    try {
        let user_id = req.params.user_id;
        const { lname, fname, username, password, email, address, city, state, country } = req.body;


        // Check that all fields are not empty
        if (!lname || !fname || !username || !password || !email ) {
            return res.status(400).send('Please provide first name, last name, username, password and email in the request body.');
        }

        const userUpdateResult = await userInstance.updateUser(user_id, lname, fname, username, password, email, address, city, state, country);

        if (userUpdateResult.success) {
            res.json({ success: true, message: userUpdateResult.message });
        } else {
            res.status(400).json({ success: false, message: userUpdateResult.message });
        }        
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
})


module.exports = router;