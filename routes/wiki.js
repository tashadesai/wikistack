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
    res.json(page);
    // res.redirect('/')
    console.log("URL:  ", page)
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

router.get('/:url', function(req, res, next) {
    Page.findOne({
        where: {
            urlTitle: req.params.url
        }
    })
    .then(function(foundPage) {
        res.render('wikipage', {title: foundPage.title, content: foundPage.content})
        // res.json(foundPage);
    })
    .catch(next);


})


module.exports = router;