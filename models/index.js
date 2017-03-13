var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

var Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
      allowNull: false
    },
  urlTitle: {
    type: Sequelize.STRING(10000),
    allowNull: false
    },

  content: {
    type: Sequelize.TEXT,
    allowNull: false
    },
  status: {
    type: Sequelize.ENUM('open', 'closed')
    },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
},
    {getterMethods: {
    route : function() {
        return '/wiki/' + this.urlTitle;
        }
    }
    });
var User = db.define('user', {
  name:{
    type: Sequelize.STRING,
    allowNull: false
    },
  email:{
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
      }
    }
});

module.exports = {
  Page: Page,
  User: User
};


Page.hook('beforeValidate', function (page){
    if (page.title) {
        var urlTitle = page.title.replace('/\s+/g', '_').replace('/\W/g', '');
        page.urlTitle = urlTitle;
    } else {
        page.urlTitle = Math.random().toString(36).substring(2, 7);
    }
});
