var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  fs.writeFileSync("../server/public/" + req.query.filename, req.body.msg);
  res.send('');
  res.end();
});

module.exports = router;
