const express = require('express');
const router = express.Router();

router.get('/categories', (req, res) => {
  res.send('Minha rota de categorias');
});

module.exports = router;