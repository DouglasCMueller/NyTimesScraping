$( document ).ready(function() {
   $("#homeNav").on("click", function() {
            window.location.href = '/';
           })
         
           //show saved articles
    $.getJSON("/savednytarticles", function(data) {

             for (var i = 0; i < data.length; i++) {
          
            $("#savedArticlesContainer").append(
                "<div class = 'articleScrapedInDiv' data-id='" +
                data[i]._id +
                "'>" +
             
                data[i].title +
                "<br />" + data[i].summary +
                "<br />" + data[i].link +
      
                "<br />" +
                "<button class = 'articleDeleteButton' data-id='" +
                data[i]._id +
                "'>Delete</button>" +
                "<button class = 'articleSeeNoteButton' data-toggle='modal' data-target='#myModal' data-id='" +
                data[i]._id +
                "'>See Note</button>" +
                "</div>" +
                "<br />" )
            }
    });
    //delete article from db
    $(document).on("click", '.articleDeleteButton', function(data) {
        var thisId = $(this).attr("data-id")
        console.log("delete button clicked")
    
        $.ajax({
            method: "GET",
            url: "/nytarticles/" + thisId
        }).then(function(articleDeleted) {
                console.log("article deleted")
        })
                .catch(function(err) {
           // If an error occurred, send it to the client
              console.log(err)
                });
                window.location.href = '/savedArticle.html';
    })
//see note in saved article
    $(document).on("click", '.articleSeeNoteButton', function(data) {
        var thisId = $(this).attr("data-id")
        console.log("article see note button clicked")
    
        $.ajax({
            method: "GET",
            url: "/nytarticlesnotes/" + thisId
        }).then(function(data) {
            console.log("article note found")
            console.log(data[0].note)
            $("#noteContent").html(data[0].note)
            })
                .catch(function(err) {
           // If an error occurred, send it to the client
              console.log(err)
                });
                // window.location.href = '/savedArticle.html';
    })
   });