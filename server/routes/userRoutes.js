const express = require('express');
const router = express.Router();

const userService = require('../services/userService');
const userServiceInstance = new userService();


module.exports = (app) => {
    // http://localhost:PORT/users/
    app.use('/users', router);


    // GET user by ID
    router.get('/:user_id', async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const response = await userServiceInstance.get({ id: user_id });          

            res.status(200).send(response);      
        } catch(err) {
          next(err);
        }
    });


    // Update user by ID
    router.put('/:user_id', async (req, res, next) => {
        try {
            const { user_id } = req.params;
            
            const data = req.body;

            const response = await userServiceInstance.update({ id: user_id, ...data });
            res.status(200).send(response);
        } catch(err) {
        next(err);
        }
    });

}