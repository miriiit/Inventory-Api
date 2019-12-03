const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.index =  (req, res) => {
  res.send({ title: 'index',response:true ,  data:  "Index"}).status(200);
};
exports.invalid404 = (req, res) =>{
  res.send("Page not found!").status(404);
}
