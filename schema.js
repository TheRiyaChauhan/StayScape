const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().allow("", null),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(1),
        filters: Joi.array().items(Joi.string().valid(
            'Mountains', 'Amazing Pools', 'Castle', 'Amazing Cities', 'Arctic', 'Rooms', 'Beach', 'Camping', 'Apartment', 'Lake', 'Boats', 'Landmarks'
          ))
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required()
})