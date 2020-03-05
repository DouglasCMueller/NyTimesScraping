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
    
        // $.ajax({
        //     method: "GET",
        //     url: "/nytarticles/" + thisId
        // }).then(function(articleDeleted) {
        //             // If we were able to successfully find Articles, send them back to the client
        //         //  console.log(articleDeleted)
        //             console.log("article deleted")
                   
        //         })
        //         .catch(function(err) {
        //    // If an error occurred, send it to the client
        //       console.log(err)
        //         });
        //         window.location.href = '/savedArticle.html';
    })

    // $(document).on("click", ".articleScrapedInDiv", function(data) {
    //     console.log(data)
    //     console.log("article clicked")
    //     var thisId = $(this).attr("data-id")
    //     console.log(thisId)
    //         // window.location.href = '/';
    // })
    // $(document).on("click", '.articleNoteButton', function(data) {
    //     var thisId = $(this).attr("data-id")
    //     console.log(thisId)
    
    //     console.log("note button clicked")
    // })
    // $(document).on("click", '.articleSaveButton', function(data) {
    //     var thisId = $(this).attr("data-id")
    //     console.log(thisId)
    
    //     console.log("save button clicked")
    // })
    
    
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