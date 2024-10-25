const mongoose = require("mongoose");
const Schema = mongoose.Schema ;
const Review = require("./review.js")



const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    // image: {
    //     url: String,
    //     filename: String
    // },
    image: {
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1520520731457-9283dd14aa66?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        filename: String,
    },
    price: {
        type: Number,
        required: true,
    },
    location: String,
    country: String,
    reviews: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Review",
        }
    ],
    owner:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required:true,
    },
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
        },
        coordinates: {
          type: [Number],
        }
      },
      filters:{
        type:[String],
        enum: ["All", "Mountains", 'Amazing Pools', 'Castle', 'Amazing Cities', 'Arctic', 'Rooms', 'Beach', 'Camping', 'Apartment', 'Lake', 'Boats', 'Landmarks']
    }


});

listingSchema.post("findOneAndDelete" , async (listing)=>{
    if(listing){
        await Review.deleteMany({ _id: { $in: listing.reviews } })
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;