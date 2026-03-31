
const Joi = require('joi');

exports.leaveSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 3 characters',
  }),

  fromDate: Joi.date().required(),

  toDate: Joi.date()
    .greater(Joi.ref('fromDate'))
    .required()
    .messages({
      'date.greater': 'To date must be greater than from date'
    }),

  halfDayCheck: Joi.boolean().default(false)
});
