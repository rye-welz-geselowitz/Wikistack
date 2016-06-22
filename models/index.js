var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {logging:false});
var marked=require('marked');
// var Page = db.define('page', {
//   title: Sequelize.STRING,
//   urlTitle: Sequelize.STRING,
//   content: Sequelize.TEXT,
//   date: Sequelize.DATE,
//   status: Sequelize.ENUM('open', 'closed')
// });

// var User = db.define('user', {
//   name: Sequelize.STRING,
//   email: Sequelize.STRING
// });

// module.exports={
// 	Page: Page,
// 	User: User
// };

var Page = db.define('page', {
        title: {
            type: Sequelize.STRING, 
            allowNull: false
        },
        urlTitle: {
            type: Sequelize.STRING, 
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
        },
        tags: {
            type: Sequelize.ARRAY(Sequelize.STRING)
        }
    },{
        getterMethods: { 
            route: function() {
                return '/wiki/' + this.urlTitle; 
            },
            renderedContent: function(){
                return marked(this.content);
            }

        },
        classMethods: {
            findByTag: function(tags2){
                return Page.findAll({
                    // $overlap matches a set of possibilities
                    where : {
                        tags: {
                            $overlap: tags2
                        }
                    }    
                })
            }
        }
});                     

Page.hook('beforeValidate', function(page) {
  var urlTitle=generateUrlTitle(page.title);
  page.urlTitle=urlTitle; 
})


var User = db.define('user', {
    name: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    email: {
        type: Sequelize.STRING, 
        allowNull: false, 
        isEmail:true
    }
});

Page.belongsTo(User, { as: 'author' });

function generateUrlTitle(postTitle) {
    if(postTitle){
        var arr=postTitle.split(" ");
        for(var i=0;i<arr.length;i++){
            arr[i] = arr[i].replace(/[^\w]/, '');
        }
        return arr.join('_');
    }
    return Math.random().toString(36).substring(2, 7);
}

module.exports = {
  Page: Page,
  User: User
};