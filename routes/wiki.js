var express = require('express');
var router = express.Router();
var dataBase = require('../models/index');
var Page = dataBase.Page;
var User = dataBase.User;

router.get('/', function(req, res, next){
    res.redirect('/');
});
router.get('/add', function(req, res, next){
    //console.log("get method");
    res.render('addpage');
    //('got to GET /wiki/add');
});
router.post('/', function(req, res, next){
    var page = Page.build({
        title: req.body.title,
        content: req.body.content,
    });

    page.save();
    console.log('REQUEST: ', page);
    res.redirect('/');
});


router.get('/users/', function(req, res, next){
    res.send(User);
});
router.get('/users/:name', function(req, res, next) {
    var name = req.params.name;
    res.send(User.name);
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