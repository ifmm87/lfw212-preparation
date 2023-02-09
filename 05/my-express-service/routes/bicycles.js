const { Router } = require('express');
const router = Router();

const model = require('../model');

router.get('/:id', (req, res, next) => {
  model.bicycle.read(req.params.id, (err, result) => {
    if (err) {
      if(err.message === 'not found') next();
      else next(err);
    } else {
      res.send(result);
    }
  });
});
router.put('/:id', (req, res, next) => {
  model.bicycle.update(req.params.id, req.body.data, (err) => {
    if(err) {
      if(err.message === 'not found') next();
      else next(err);
    } else {
      model.bicycle.read(req.params.id, (err, result) => {
        res.status(200).send(result);
      });
    }
  })
})
router.post('/', (req, res, next) => {
  model.bicycle.create(req.body.data, (err, data) => {
    if(err) {
      if(err.message === 'not found') next();
      else next(err);
    } else {
      // console.log(data)
      res.status(201).send(data);
    }
  });
});

router.delete('/:id', (req, res, next) => {
  model.bicycle.del(req.params.id, (err) => {
    if (err) {
      if (err.message === 'not found') next();
      else next(err);
    } else {
      res.status(204).send();
    }
  })
})

module.exports = router;



