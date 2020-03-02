// var express = require("express");
// var logger = require("morgan");
// var mongoose = require("mongoose");

// // Our scraping tools
// // Axios is a promised-based http library, similar to jQuery's Ajax method
// // It works on the client and on the server
// var axios = require("axios");
// var cheerio = require("cheerio");

// // Require all models
// var db = require("./models");

// var PORT = 8080;

// // Initialize Express
// var app = express();

// // Configure middleware

// // Use morgan logger for logging requests
// app.use(logger("dev"));
// // Parse request body as JSON
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// // Make public a static folder
// app.use(express.static("public"));

// // Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/unit18PopulaterExample", { useNewUrlParser: true });

// // // Routes
// // app.get("/scrape", function(req, res) {
// // 	request("https://www.nytimes.com/section/world", function(error, response, html) {
// // 		var $ = cheerio.load(html);
// // 		var result = {};
// // 		$("div.story-body").each(function(i, element) {
// // 			var link = $(element).find("a").attr("href");
// // 			var title = $(element).find("h2.headline").text().trim();
// // 			var summary = $(element).find("p.summary").text().trim();
// // 			var img = $(element).parent().find("figure.media").find("img").attr("src");
// // 			result.link = link;
// // 			result.title = title;
// // 			if (summary) {
// // 				result.summary = summary;
// // 			};
// // 			if (img) {
// // 				result.img = img;
// // 			}
// // 			else {
// // 				result.img = $(element).find(".wide-thumb").find("img").attr("src");
// // 			};
// // 			var entry = new Article(result);
// // 			Article.find({title: result.title}, function(err, data) {
// // 				if (data.length === 0) {
// // 					entry.save(function(err, data) {
// // 						if (err) throw err;
// // 					});
// // 				}
// // 			});
// // 		});
// // 		console.log("Scrape finished.");
// // 		res.redirect("/");
// // 	});
// // });
// // // A GET route for scraping the echoJS website
// // app.get("/scrape", function(req, res) {
// //     // First, we grab the body of the html with axios
// //     axios.get("http://www.echojs.com/").then(function(response) {
// //         // Then, we load that into cheerio and save it to $ for a shorthand selector
// //         var $ = cheerio.load(response.data);

// //         // Now, we grab every h2 within an article tag, and do the following:
// //         $("article h2").each(function(i, element) {
// //             // Save an empty result object
// //             var result = {};

// //             // Add the text and href of every link, and save them as properties of the result object
// //             result.title = $(this)
// //                 .children("a")
// //                 .text();
// //             result.link = $(this)
// //                 .children("a")
// //                 .attr("href");

// //             // Create a new Article using the `result` object built from scraping
// //             db.Article.create(result)
// //                 .then(function(dbArticle) {
// //                     // View the added result in the console
// //                     console.log(dbArticle);
// //                 })
// //                 .catch(function(err) {
// //                     // If an error occurred, log it
// //                     console.log(err);
// //                 });
// //         });

// //         // Send a message to the client
// //         res.send("Scrape Complete");
// //     });
// // });

// // // Route for getting all Articles from the db
// // app.get("/articles", function(req, res) {
// //     // Grab every document in the Articles collection
// //     db.Article.find({})
// //         .then(function(dbArticle) {
// //             // If we were able to successfully find Articles, send them back to the client
// //             res.json(dbArticle);
// //         })
// //         .catch(function(err) {
// //             // If an error occurred, send it to the client
// //             res.json(err);
// //         });
// // });

// // // Route for grabbing a specific Article by id, populate it with it's note
// // app.get("/articles/:id", function(req, res) {
// //     // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
// //     db.Article.findOne({ _id: req.params.id })
// //         // ..and populate all of the notes associated with it
// //         .populate("note")
// //         .then(function(dbArticle) {
// //             // If we were able to successfully find an Article with the given id, send it back to the client
// //             res.json(dbArticle);
// //         })
// //         .catch(function(err) {
// //             // If an error occurred, send it to the client
// //             res.json(err);
// //         });
// // });

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

// // Start the server
// app.listen(PORT, function() {
//     console.log("App running on port " + PORT + "!");
// });


// ///////////cheerio/axios scrape of NY Times
// var cheerio = require("cheerio");
// var axios = require("axios");

// axios.get("http://www.nytimes.com/").then(function(response) {

//     var $ = cheerio.load(response.data);

//     var results = [];
//     $("article").each(function(i, element) {

//         summary = ""
//         if ($(this).find("ul").length) {
//             summary = $(this).find("li").first().text();
//         } else {
//             summary = $(this).find("p").text();
//         };

//         title = $(this).find("h2").text();
//         summary = summary;
//         link = "https://www.nytimes.com" + $(this).find("a").attr("href");

//         results.push({
//             title: title,
//             summary: summary,
//             link: link
//         });
//     });
//     console.log(results);
// });

// Our newest addition to the dependency family
var mongoose = require("mongoose");

// Requiring the `Example` model for accessing the `examples` collection
var TimesExample = require("./models/exampleModel.js");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/timesexample", { useNewUrlParser: true });

// Create an object containing dummy data to save to the database
var data = {
    array: ["itemA", "itemB", "itemC"],
    boolean: false,
    string: "\"Don't worry if it doesn't work right. If everything did, you'd be out of a job\" - Mosher's Law of Software Engineering",
    number: 55
};

// Save a new Example using the data object
TimesExample.create(data)
    .then(function(dbExample) {
        // If saved successfully, print the new Example document to the console
        console.log(dbExample);
    })
    .catch(function(err) {
        // If an error occurs, log the error message
        console.log(err.message);
    });