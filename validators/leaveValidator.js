
const Joi = require('joi');

exports.leaveSchema = Joi.object({
  name: Joi.string().required(),

  fromDate: Joi.date().required(),

  toDate: Joi.date()
    .greater(Joi.ref('fromDate'))
    .required(),

  halfDayCheck: Joi.boolean().required()
});
