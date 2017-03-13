var express = require('express');
var router = express.Router();
var dataBase = require('../models/index');
var Page = dataBase.Page;
var User = dataBase.User;

router.get('/', function(req, res, next){
  User.findAll({}).then(function(users){
    res.render('users', { users: users });
  }).catch(next);
});

router.get('/users/:id', function(req, res, next) {
    Page.findAll({
      where: {
        authorid: req.params.id
      }
    })
        .then(function(pages) {
          res.render('index', {pages: pages})
        })
        .catch(next)
});



router.post('/users/', function(req, res, next){
    // console.log(req.body);
    // res.json(req.body);
});
router.put('/users/123', function (req, res, next) {

});
router.delete('/users/123', function (req, res, next){

});

module.exports = router;
