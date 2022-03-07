const Joi = require("joi")

const JoinValidationSchema= Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).max(30).required()
})

const LoginValidationSchema= Joi.object({
    email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
    password: Joi.string().min(6).max(30).required()
})

const NewJokeValidationSchema= Joi.object({
   name: Joi.string().min(3).max(50).required(),
   description: Joi.string().min(10).max(1000).required(),
   servings: Joi.number().integer().min(1).max(10),
   duration: Joi.number().integer().min(10).max(10*60),//no one cooks on dish for more than 10 hrs
}).unknown()

module.exports ={JoinValidationSchema,LoginValidationSchema,NewJokeValidationSchema}