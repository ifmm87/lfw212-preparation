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
    res.status(200).json(existing);
  } catch (err) {
    res.status(400).send({message: err.message});
  }
});
router.post('/', async (req, res, next) => {
  try {
    const data = validationDataCustomer(req.body);
    if (data) {
      const created = await models.customer.create(data);
      res.status(201).json(created);
    } else {
      next(new Error('data invalid'))
    }
  } catch (error) {
    next(error);
  }
});
router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) new Error('id is required');

    const existing = await models.customer.findOne({ where: { id } });
    if (!existing) throw new Error('id does not exist');

    const data = req.body;

    const created = await models.customer.update(data, { where: { id } });
    res.status(201).json(created);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) next(Error('id is required'));

    const existing = await models.customer.findOne({ where: { id } });
    if (!existing) next(new Error('id does not exist'));
    await existing.destroy();
    res.status(200).json({ message: 'deleted' });
  } catch (error) {
    next(error);
  }
});

router.get('/large-file/download', (req, res, next) => {
  // read file
  const stream = createReadStream(__dirname + '/../public/big-test-file-case-changed.txt');
  stream.pipe(res);
  /* stream.on('end', () => { */
    /* res.end('Last chunk'); */
  /* }); */
})

module.exports = router;
