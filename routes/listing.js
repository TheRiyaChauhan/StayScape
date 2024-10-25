const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js")
const listingController = require("../controllers/listing.js");

const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })




router
.route("/")
.get(wrapAsync (listingController.index))                                               //index
.post(isLoggedIn,validateListing,upload.single('listing[image]'),wrapAsync(listingController.createListing));           //create


router.get("/new" ,isLoggedIn,listingController.renderNewForm)                          //new route 

router
.route("/:id")
.get( wrapAsync (listingController.showListing))                                        //show
.put(isLoggedIn,isOwner, validateListing,upload.single('listing[image]'),wrapAsync(listingController.updateListing))    //update
.delete(isLoggedIn,isOwner ,listingController.destroyListing)                           //delete


router.get("/:id/edit" ,isLoggedIn,isOwner,wrapAsync(listingController.editRenderForm )) //edit route



module.exports =router;