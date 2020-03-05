var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

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
    console.log(req, res)
    $("scrapedArticlesContainer").empty();

});

// Delete every document in the NytArticles collection
app.get("/deletedarticles", function(req, res) {

        db.NytArticle.deleteMany({})
            .then(function(dbNytarticles) {
                // If we were able to successfully find Articles, send them back to the client
                res.json(dbNytarticles);
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

            result.saved = false

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

// Route for getting all Articles from the db
app.get("/nytarticles", function(req, res) {

    // Grab every document in the Articles collection
    db.NytArticle.find({})
        .then(function(dbNytarticles) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbNytarticles);
        })
        .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Route for grabbing a specific Article by id marking as saved
app.post("/nytarticles/:id", function(req, res) {
    console.log(res)
    console.log(req)
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.NytArticle.update({ _id: req.params.id },
        { $set:{"saved": true}
    })
            
        .then(function(savedArticle) {
            // If we were able to successfully find an Article with the given id, send it back to the client
           console.log(savedArticle);
        })
        .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Route for grabbing a specific Article by id and deleting
app.get("/nytarticles/:id", function(req, res) {
    console.log(res)
    console.log(req)
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.NytArticle.deleteOne({ _id: req.params.id 
     
    })
            
        .then(function(deletedArticle) {
            // If we were able to successfully find an Article with the given id, send it back to the client
           console.log(deletedArticle);
        })
        .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});




// // Route for grabbing a specific Article by id, populate it with it's note
// app.get("/nytarticles/:id", function(req, res) {
//     // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
//     db.NytArticle.findOne({ _id: req.params.id })
//         // ..and populate all of the notes associated with it
//         .populate("ArticleNote")
//         .then(function(dbArticleNote) {
//             // If we were able to successfully find an Article with the given id, send it back to the client
//             res.json(dbArticleNote);
//         })
//         .catch(function(err) {
//             // If an error occurred, send it to the client
//             res.json(err);
//         });
// });
app.get("/savednytarticles", function(req, res) {
        console.log(req, res)
        db.NytArticle.find({saved: true} )
       
      .then(function(dbNytarticles) {
            res.json(dbNytarticles)
        })
    })
// // // Route for saving/updating an Article's associated Note
// // app.post("/articles/:id", function(req, res) {
// //     // Create a new note and pass the req.body to the entry
// //     db.Note.create(req.body)
// //         .then(function(dbNote) {
// //             // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
// //             // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
// //             // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
// //             return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
// //         })
// //         .then(function(dbArticle) {
// //             // If we were able to successfully update an Article, send it back to the client
// //             res.json(dbArticle);
// //         })
// //         .catch(function(err) {
// //             // If an error occurred, send it to the client
// //             res.json(err);
// //         });
// // });

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});





// // Requiring the `Example` model for accessing the `examples` collection
// var TimesExample = require("./models/exampleModel.js");

// // Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/nytimesscrape", { useNewUrlParser: true });

// // Create an object containing dummy data to save to the database
// var data = {
//     array: ["itemA", "itemB", "itemC"],
//     boolean: false,
//     string: "\"Don't worry if it doesn't work right. If everything did, you'd be out of a job\" - Mosher's Law of Software Engineering",
//     number: 55
// };

// // Save a new Example using the data object
// TimesExample.create(data)
//     .then(function(dbExample) {
//         // If saved successfully, print the new Example document to the console
//         console.log(dbExample);
//     })
//     .catch(function(err) {
//         // If an error occurs, log the error message
//         console.log(err.message);
//     });