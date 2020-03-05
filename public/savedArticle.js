$( document ).ready(function() {

    
    $("#homeNav").on("click", function() {
    
        window.location.href = '/';
        console.log("screen cleared")
    })
  
        
    $.getJSON("/savednytarticles", function(data) {
        // For each one
        for (var i = 0; i < data.length; i++) {
            // Display the apropos information on the page
    
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
    $(document).on("click", '.articleDeleteButton', function(data) {
        var thisId = $(this).attr("data-id")
        console.log(thisId)
    
        console.log("delete button clicked")
    
        $.ajax({
            method: "GET",
            url: "/nytarticles/" + thisId
        }).then(function(articleDeleted) {
                    // If we were able to successfully find Articles, send them back to the client
                //  console.log(articleDeleted)
                    console.log("article deleted")
                   
                })
                .catch(function(err) {
           // If an error occurred, send it to the client
              console.log(err)
                });
                window.location.href = '/savedArticle.html';
    })

    $(document).on("click", '.articleSeeNoteButton', function(data) {
        var thisId = $(this).attr("data-id")
        console.log(thisId)
    
        console.log("article see button clicked")
    
        $.ajax({
            method: "GET",
            url: "/nytarticlesnotes/" + thisId
        }).then(function() {
            console.log("article note found")
                    // If we were able to successfully find Articles, send them back to the client
                //  console.log(articleWithNoteAttached)
                //  $("#noteContent").html(savedArticle.note)
                   
                })
                .catch(function(err) {
           // If an error occurred, send it to the client
              console.log(err)
                });
                // window.location.href = '/savedArticle.html';
    })

   
    });