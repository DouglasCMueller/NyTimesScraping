var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var bodyParser = require('body-parser')
// Require all models
var db = require("./models");

var PORT = 8080;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// // Connect to the Mongo DB
mongoose.connect("mongodb://localhost/nytimesscrape", { useNewUrlParser: true });
app.get("/", function(req, res) {
    // console.log(req, res)
    $("scrapedArticlesContainer").empty();

});

// Delete every document in the NytArticles collection
app.get("/deletedarticles", function(req, res) {

        db.NytArticle.deleteMany({})
            .then(function(dbNytarticles) {
                // If we were able to successfully find Articles, send them back to the client
                // res.json(dbNytarticles);
                console.log("deleted all articles from database")
            })
            .catch(function(err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    })
    /////////cheerio/axios scrape of NY Times
app.get("/scrape", function(req, res) {
    axios.get("http://www.nytimes.com/").then(function(response) {

        var $ = cheerio.load(response.data);

        $("article").each(function(i, element) {
            var result = {};
            summary = ""
            if ($(this).find("ul").length) {
                summary = $(this).find("li").first().text();
            } else {
                summary = $(this).find("p").text();
            };

            result.title = $(this).find("h2").text();
            result.summary = summary;
            result.link = "https://www.nytimes.com" + $(this).find("a").attr("href");
            result.note = "test note";
            result.saved = false;

            db.NytArticle.create(result)
                .then(function(dbNytArticle) {
                    // View the added result in the console
                    console.log(dbNytArticle);
                })
                .catch(function(err) {
                    // If an error occurred, log it
                    console.log(err);
                });

        });
    });
    res.send("Scrape complete!")
});


app.get("/nytarticles", function(req, res) {
    db.NytArticle.find({})
        .then(function(dbNytarticles) {
              res.json(dbNytarticles);
        })
        .catch(function(err) {
                    res.json(err);
        });
});


app.post("/nytarticles/:id", function(req, res) {
 
    db.NytArticle.update({ _id: req.params.id },
        { $set:{"saved": true}
    })
            
        .then(function(savedArticle) {

console.log(savedArticle)
        })
        .catch(function(err) {
  
            res.json(err);
        });
});

// Route for grabbing a specific Article by id and adding note
app.post("/nytarticlesnotes/:id", function(req, res) {
    console.log(req.body.data)
    console.log(req.url)
    console.log(req.params.id)
 
    db.NytArticle.update({ _id: req.params.id },
        { $set:{"note": req.body.data}
    })
            
        .then(function(savedArticleWithNote) {
            // If we were able to successfully find an Article with the given id, send it back to the client
    // res.json(savedArticleWithNote)
    // req.json(savedArticleWithNote)
    console.log(savedArticleWithNote)
        })
        .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});


// Route for grabbing a specific Article by id and showing note
app.get("/nytarticlesnotes/:id", function(req, res) {
 
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.NytArticle.findOne({ _id: req.params.id },
     )
            
        .then(function(savedArticle) {
            // If we were able to successfully find an Article with the given id, send it back to the client
           console.log(savedArticle);
           console.log(savedArticle.note)
      
        })
        .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Route for grabbing a specific Article by id and deleting
app.get("/nytarticles/:id", function(req, res) {
    // console.log(res)
    // console.log(req)
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.NytArticle.deleteOne({ _id: req.params.id 
         })
                    .then(function(deletedArticle) {
            // If we were able to successfully find an Article with the given id, send it back to the client
        //    console.log(deletedArticle);
              })
        .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
       });

app.get("/savednytarticles", function(req, res) {
        console.log(req, res)
        db.NytArticle.find({saved: true} )
       
      .then(function(dbSavedNytarticles) {
            res.json(dbSavedNytarticles)
        })
    })

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});


