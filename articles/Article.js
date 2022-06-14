const Sequelize = require('sequelize');
const Category = require('../categories/Category');
const connection = require('../database/database');

const Article = connection.define('articles', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});
//Definindo os relacionamentos entre as tabelas
Category.hasMany(Article); //UMA Categoria tem muitos artigos
Article.belongsTo(Category); //UM Artigo pertence a uma categoria 

//Sincronizando models e tabelas
// Article.sync({force: true});

module.exports = Article;