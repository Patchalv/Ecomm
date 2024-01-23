const createError = require('http-errors');
const userModel = require('../models/userModel');
const userModelInstance = new userModel();

module.exports = class userService {

    async get(data) {

        const { id } = data;
    
        try {
          // Check if user already exists
          const user = await userModelInstance.findOneById(id);
    
          // If user doesn't exist, reject
          if (!user) {
            throw createError(404, 'There is no user with that id');
        }    
          return user;
    
        } catch (error) {
            throw error;
        }
    
      };
    
      async update(data) {
    
        try {
          // Check if user already exists
          const user = await userModelInstance.update(data);
    
          return user;
    
        } catch(error) {
          throw error;
        }
    
      };
    
}
