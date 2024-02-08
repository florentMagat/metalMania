const Joi = require('joi');

const registerSchema = Joi.object({
    lastname: Joi.string().min(2).max(50).required(),
    firstname: Joi.string().min(2).max(50).required(),
    email: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)).required(),
    password: Joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).required(),
    role_id: Joi.number().integer().min(1).required()
});

module.exports = {
  registerSchema
};

