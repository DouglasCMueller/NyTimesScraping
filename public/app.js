$( document ).ready(function() {
$("#scrapedArticlesContainer").empty();
$("#homeNav").on("click", function() {
    window.location.href = '/';
   })
$("#savedArticlesNav").on("click", function() {
    window.location.href = '/savedArticle.html';
   })

//    //clear database
//    $.ajax({
//     method: "POST",
//     url: "/deletedarticles"

// }).then(function(deletedArticles) {
//     console.log("articles all deleted")
//                 console.log(deletedArticles)
//                  })
//         .catch(function(err) {
//             // If an error occurred, send it to the client
//             console.log(err);
//         });

//scrape nytimes
$("#scrapeNewArticlesButton").on("click", function() {
    console.log("scrape button clicked")
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function(scrapedArticles) {
                console.log("articles scraped")
            })
            .catch(function(err) {
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
//save article
$(document).on("click", '.articleSaveButton', function(data) {
    var thisId = $(this).attr("data-id")
    console.log("save button clicked")
    $.ajax({
        method: "POST",
        url: "/nytarticles/" + thisId
    }).then(function(savedArticle) {
                    console.log("article saved")
            })
            .catch(function(err) {
         
                res.json(err);
            });
})
//save note to article in db
$(document).on("click", '.articleNoteButton', function(data) {
    let thisId = $(this).attr("data-id")
    console.log(thisId)
    console.log("note button clicked")
    $(document).on("click", '#modalSubmitButton', function(data) {
        var noteFromUser = $("#noteContent").val()
                  console.log(noteFromUser)
                
           $.ajax({
        method: "POST",
        url: "/nytarticlesnotes/" + thisId,
        data: { data: noteFromUser }
    }).then(function(articleNoteSaved) {
                    console.log(articleNoteSaved)
                                  })
                             .catch(function(err) {
                // If an error occurred, send it to the client
                console.log(err);
            });
        })
})
});
