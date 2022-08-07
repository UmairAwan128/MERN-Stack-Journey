const Joi = require('@hapi/joi'); // latest version and its syntax is also new

//Register Validation Scheema
const registerValidation = (data) =>{
    const scheema = Joi.object ({
        name: Joi.string().min(7).required(),
        email: Joi.string().min(7).required().email(),
        password: Joi.string().min(7).required()
    });
    return scheema.validate(data);
}

//Login Validation Scheema
const loginValidation = (data) =>{
    const scheema = Joi.object ({
        email: Joi.string().min(7).required().email(),
        password: Joi.string().min(7).required()
    });
    return scheema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;