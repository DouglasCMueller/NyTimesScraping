var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var NytArticleSchema = new Schema({
    // `title` is required and of type String
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: false
    },

    note: {
        type: String,
        required: false
    },
   
    saved: {
        type: Boolean,
        default: false
    },
});

// This creates our model from the above schema, using mongoose's model method
var NytArticle = mongoose.model("NytArticle", NytArticleSchema);

// Export the Article model
module.exports = NytArticle;