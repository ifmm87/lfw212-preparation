const express = require('express')
const axios = require('axios')
const router = express.Router();
const {BRAND_PORT, COLOR_PORT} = process.env;
router.get('/:id', async ( req, res, next) => {
  try {
    const id = req.params.id;
    const { data: brandName } = await axios(
      `http://localhost:${BRAND_PORT}/${id}`
    );
    const { data: colorName } = await axios(
      `http://localhost:${COLOR_PORT}/${id}`
    );
    const final = { id, brand: brandName, color: colorName };
    res.status(200).json(final);
  } catch (err) {
    if (!err.response) next(err);
    else if (err.response.status === 404) {
      res.status(404).send('one of the services failed');
    } else if (err.response.status === 400) {
      res.status(400).send('id muust be a tring');
    }
  }
})

module.exports = router;
