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

    User.findOrCreate({
        where: {
            name: req.body.name,
            email: req.body.email
        }
    })
        .then(function (value) {
            var user = value[0];

            var page = Page.build({
                title: req.body.title,
                content: req.body.content,
            });

            return page.save().then(function(savedPage) {
                return savedPage.setAuthor(user);
            });
        })
        .then(function(page) {
            res.redirect(page.route)
        })
        .catch(next);
});


// router.get('/users/', function(req, res, next){
//     router.get('/', function(req, res, next) {
//   User.findAll({}).then(function(users){
//     res.render('users', { users: users });
//   }).catch(next);
// });
// });
// router.get('/users/:id', function(req, res, next) {
//     res.render('', {})
// });
// router.post('/users/', function(req, res, next){
//     // console.log(req.body);
//     // res.json(req.body);
// });
// router.put('/users/123', function (req, res, next) {

// });
// router.delete('/users/123', function (req, res, next){

// });

router.get('/:url', function(req, res, next) {
    Page.findOne({
        where: {
            urlTitle: req.params.url
        }
    })
    .then(function(foundPage) {
        res.render('wikipage', {title: foundPage.title, content: foundPage.content,
                                authorid: foundPage.authorId})
        console.log(foundPage.name)
        // res.json(foundPage);
    })
    .catch(next);


})


module.exports = router;
