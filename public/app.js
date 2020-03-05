$( document ).ready(function() {
$("scrapedArticlesContainer").empty();
$("#homeNav").on("click", function() {
    window.location.href = '/';
   })
$("#savedArticlesNav").on("click", function() {
    window.location.href = '/savedArticle.html';
   })

$("#scrapeNewArticlesButton").on("click", function() {
    console.log("scrape button clicked")
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function(scrapedArticles) {
                // If we were able to successfully find Articles, send them back to the client
            //  console.log(scrapedArticles)
                console.log("articles scraped")
            })
            .catch(function(err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
        $.getJSON("/nytarticles", function(data) {
        // For each one
        for (var i = 0; i < data.length; i++) {
            // Display the apropos information on the page
                $("#scrapedArticlesContainer").append(
                "<div class = 'articleScrapedInDiv' data-id='" +
                data[i]._id +
                "'>" +
                data[i].title +
                "<br />" + data[i].summary +
                "<br />" + data[i].link +
                "<br />" +
                "<button class = 'articleSaveButton' data-id='" +
                data[i]._id +
                "'>Save</button>" +
                "<button class = 'articleNoteButton' data-toggle='modal' data-target='#myModal' data-id='" +
                data[i]._id +
                "'>Note</button>" +
                "</div>" +
                "<br />")
               }
    });

})
// $.ajax({
//     method: "GET",
//     url: "/deletedarticles"
// }).then(function(deletedArticles) {
//             // If we were able to successfully find Articles, send them back to the client
//          console.log(deletedArticles)
//             console.log("deleted all articles from database")
//         })
//         .catch(function(err) {
//             // If an error occurred, send it to the client
//             res.json(err);
//         });





// $(document).on("click", ".articleScrapedInDiv", function(data) {
//     // console.log(data)
//     console.log("article clicked")
//     var thisId = $(this).attr("data-id")
//     console.log(thisId)
//         // window.location.href = '/';
// })
$(document).on("click", '.articleSaveButton', function(data) {
    var thisId = $(this).attr("data-id")
    console.log(thisId)

    console.log("save button clicked")
console.log(data)
    $.ajax({
        method: "POST",
        url: "/nytarticles/" + thisId
    }).then(function(articleSaved) {
                // If we were able to successfully find Articles, send them back to the client
        console.log(articleSaved)
                console.log("article saved")
            })
            .catch(function(err) {
                // If an error occurred, send it to the client
                res.json(err);
            });

})
$(document).on("click", '.articleNoteButton', function(data) {
    let thisId = $(this).attr("data-id")
    console.log(thisId)
let noteAttached = "test note attached"
console.log(noteAttached)
    console.log("note button clicked")

    $(document).on("click", '#modalCloseButton', function(data) {
        var noteFromUser = $("#noteContent").val()
           console.log(noteFromUser)
           console.log(thisId)
           $("#noteContent").empty();

    $.ajax({
        method: "POST",
        url: "/nytarticlesnotes/" + thisId,
     data: "noteAttached"
    }).then(function(articleNoteSaved) {
         
           console.log(articleNoteSaved)
                console.log("article note saved")
            })
            .catch(function(err) {
                // If an error occurred, send it to the client
                console.log(err);
            });
    
    })




    // $.ajax({
    //     method: "POST",
    //     url: "/nytarticlesnotes/" + thisId,
    //  data: "noteAttached"
    // }).then(function(articleNoteSaved) {
         
    //        console.log(articleNoteSaved)
    //             console.log("article note saved")
    //         })
    //         .catch(function(err) {
    //             // If an error occurred, send it to the client
    //             console.log(err);
    //         });
})



// // Whenever someone clicks a p tag
// $(document).on("click", "p", function() {
//     // Empty the notes from the note section
//     $("#notes").empty();
//     // Save the id from the p tag
//     var thisId = $(this).attr("data-id");

//     // Now make an ajax call for the Article
//     $.ajax({
//             method: "GET",
//             url: "/articles/" + thisId
//         })
//         // With that done, add the note information to the page
//         .then(function(data) {
//             console.log(data);
//             // The title of the article
//             $("#notes").append("<h2>" + data.title + "</h2>");
//             // An input to enter a new title
//             $("#notes").append("<input id='titleinput' name='title' >");
//             // A textarea to add a new note body
//             $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
//             // A button to submit a new note, with the id of the article saved to it
//             $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

//             // If there's a note in the article
//             if (data.note) {
//                 // Place the title of the note in the title input
//                 $("#titleinput").val(data.note.title);
//                 // Place the body of the note in the body textarea
//                 $("#bodyinput").val(data.note.body);
//             }
//         });
// });

// // When you click the savenote button
// $(document).on("click", "#savenote", function() {
//     // Grab the id associated with the article from the submit button
//     var thisId = $(this).attr("data-id");

//     // Run a POST request to change the note, using what's entered in the inputs
//     $.ajax({
//             method: "POST",
//             url: "/articles/" + thisId,
//             data: {
//                 // Value taken from title input
//                 title: $("#titleinput").val(),
//                 // Value taken from note textarea
//                 body: $("#bodyinput").val()
//             }
//         })
//         // With that done
//         .then(function(data) {
//             // Log the response
//             console.log(data);
//             // Empty the notes section
//             $("#notes").empty();
//         });

//     // Also, remove the values entered in the input and textarea for note entry
//     $("#titleinput").val("");
//     $("#bodyinput").val("");
// });
});