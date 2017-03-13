var express = require('express');
var router = express.Router();
var dataBase = require('../models/index');
var Page = dataBase.Page;
var User = dataBase.User;

router.get('/', function(req, res, next){

    Page.findAll()
        .then(function(pages){
            console.log("PAGE : ", pages[0].title)
            res.render('index', {pages: pages})
        })
        .catch(next);
});

router.get('/add', function(req, res, next){
    res.render('addpage');
});
router.post('/', function(req, res, next){
    var page = Page.build({
        title: req.body.title,
        content: req.body.content,
    });

    User.findOrCreate({
        where: {
            name: req.body.name
        },
        defaults: {
            name: req.body.name,
            email: req.body.email
        }
    })

    page.save().then(function(savedPage) {
        res.redirect(savedPage.route);
    }).catch(next);
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
