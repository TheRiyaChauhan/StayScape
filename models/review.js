const mongoose = require("mongoose");
const Schema = mongoose.Schema ;

const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    credentialsAt: {
        type: Date,
        default: Date.now()
    },
    author: {
        
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    }
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;