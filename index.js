const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");
const path = require("path");

//Controllers
const CategoriesController = require("./categories/CategoriesController");
const ArticlesController = require("./articles/ArticlesController");

//Models
const Article = require("./articles/Article");
const Category = require("./categories/Category");

const app = express();

//view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Static
app.use(express.static(path.join(__dirname, "public")));

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//database connection
connection
  .authenticate()
  .then(() => {
    console.log("connection with success!");
  })
  .catch((err) => {
    console.log(`connection with error: ${err}`);
  });

const port = process.env.PORT || 3000;

//Routes
app.use("/", CategoriesController);
app.use("/", ArticlesController);

app.get("/", (req, res) => {
  Article.findAll({
    order: [["id", "DESC"]],
  }).then((articles) => {
    res.render("index", { articles: articles });
  });
});

app.get("/:slug", (req, res) => {
  let slug = req.params.slug;
  Article.findOne({ where: { slug: slug } })
    .then((article) => {
      if (article != undefined) {
        res.render("article", { article: article });
      } else {
        res.redirect("/");
      }
    })
    .catch((error) => {
      redirect("/", "Aconteceu algo errado, tente novamente");
    });
});

app.listen(port, () => {
  console.log("listening on here!");
});
