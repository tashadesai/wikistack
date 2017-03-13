var models = require('./models')
var nunjucks = require('nunjucks')
var morgan = require('morgan')
var express = require('express')
var app = express();

app.use(express.static('stylesheets'));

models.User.sync({})
.then(function() {
  return models.Page.sync({})
})
.then(function() {
  server.listen(3000, function() {
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


//turning logging off


