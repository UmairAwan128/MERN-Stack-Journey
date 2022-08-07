//we moved model and validationMethod here in this file previously it was in the routes folder
//as we wanted that each file/folder will have single responsibility so model is here routes are in seoerate file
const Joi = require("joi");
const mongoose = require("mongoose");
//we defined  minlength: 5, maxlength: 50 for all strings same so its like a convention so not to
//remember the size of each attribute seprately
const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    isGold: {
      type: Boolean,
      default: false
    },
    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    }
  })
);

function validateCustomer(customer) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    phone: Joi.string()
      .min(5)
      .max(50)
      .required(),
    isGold: Joi.boolean()
  };
  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
