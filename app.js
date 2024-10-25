if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js")
const session = require("express-session");
const flash = require("connect-flash")
const passport = require("passport");
const LocalStratergy = require("passport-local")
const User = require("./models/user.js");

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs' , ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const listingRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const MONGO_URL = process.env.ATLASDB_URL;
main().then(() =>{
    console.log("connected");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const sessionOptions = {
    secret: "musupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})



app.use("/listings", listingRouter);
app.use("/listings/:id/reviews" , reviewsRouter);
app.use("/", userRouter);



app.get("/" , (req,res) => {
    res.redirect("/listings");
})


app.all("*" , (req,res,next)=>{

    next(new ExpressError(404, "page not found!"));
})


app.use((err,req,res,next)=>{
    let {statusCode = 500, message = "something went wrong"} = err;
    res.status(statusCode).render("listings/error.ejs" , {err});
});

app.listen(8080 , ()=>{
    console.log("server is listening to the port 8080");
});
