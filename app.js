var models = require('./models');
var nunjucks = require('nunjucks');
var morgan = require('morgan');
var express = require('express');
var wikiRouter = require('./routes/wiki');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('stylesheets'));
app.use(bodyParser.urlencoded( { extended : false } ));
app.use(bodyParser.json());
//Promise.all([models.User.sync(), models.Page.sync()]).then (function() {
// app.listen(3000, function() {
//     console.log("server is listening on port 3000");
// });
// })

models.User.sync({})
.then(function() {
  return models.Page.sync({})
})
.then(function() {
  app.listen(3000, function() {
    console.log("server is listening on port 3000");
  });
})
.catch(console.error);

// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);
app.use('/wiki', wikiRouter);


//turning logging off


