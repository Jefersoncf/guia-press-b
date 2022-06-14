
const express = require('express');
const router = express.Router();

router.get('/articles', (req, res) => {
  res.send('Minha rota de artigos');
});

module.exports = router;