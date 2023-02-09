const express = require('express');
const router = express.Router();
const models = require('../models');
const services = require('../services/fake-service');
const { createReadStream } = require('fs');
const { isIdValid, validationDataCustomer } = require('../utils/validator');

const verify = (param) => {
  if (Array.isArray(param)) {
    return param.map(c => c.toUpperCase());
  }
  return param.toUpperCase();
}
/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const query = verify(req.query.name);
    const list = await models.customer.findAll({});
    res.status(200).send({ list, query});
  } catch (error) {
    console.log(error)
    next(error);
    // res.status(500).send({ message: error.message });
  }
});
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) new Error('id is required');
    if(!isIdValid(id)) throw new Error('Id must be an integer');
    const existing = await models.customer.findOne({where: {id}});
    if (!existing) throw new Error('id does not exist');
    const existingPost = await services.jsonPlaceHolder(id);
    if(!existingPost) existing.dataValues.post = {};
    else existing.dataValues.post = existingPost;
    res.render('customer', { ...existing.dataValues });
  } catch (err) {
    res.status(400).send({message: err.message});
  }
});


module.exports = router;
