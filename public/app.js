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

$(document).on("click", '.articleSaveButton', function(data) {
    var thisId = $(this).attr("data-id")
    console.log(thisId)

    console.log("save button clicked")
console.log(data)
    $.ajax({
        method: "POST",
        url: "/nytarticles/" + thisId
    }).then(function(savedArticle) {
                // If we were able to successfully find Articles, send them back to the client
        console.log(savedArticle)
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


    console.log("note button clicked")

    $(document).on("click", '#modalSubmitButton', function(data) {
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


})

});