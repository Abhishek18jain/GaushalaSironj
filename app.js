if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}
const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require('./routes/blogRoutes');
//bhai yaha se admin ke liye
const adminRoutes = require('./routes/adminRoutes');
const galleryRoutes = require('./routes/gallery.js');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require('./config/passport');
const Path = require("path");
const engine = require('ejs-mate');
const app = express();
const port = 3000;
const dbUrl = process.env.ATLASDB_URL;
 mongoose.connect(dbUrl, {
}).then(() => {
    console.log("Connected to MongoDB"
    );
}).catch((err) => {
console.log("Error connecting to MongoDB:", err);
})
app.engine('ejs', engine);
app.set("view engine", "ejs");
app.set("views", Path.join(__dirname, "views"));
app.use(express.static(Path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
// Middlewares
app.use(session({
 secret:process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// Global flash messages
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
});
app.get("/", (req, res) => {
    res.render("./pages/index.ejs");
});
app.get("/about",(req,res)=>{
    res.render("./about/about.ejs")
})
app.get("/donation", (req,res)=>{
    res.render("./donation/donation.ejs")
})
//routes
app.use("/blogs",blogRoutes)
app.use('/', adminRoutes);
app.use("/gallery",galleryRoutes)

// app.use((req, res, next) => {
//   res.status(404).render("error", { message: "Page Not Found", status: 404 });
// });
// app.use((err, req, res, next) => {
//   const status = err.status || 500;

//   // Fallback message if error.message is not a string
//   let message = "Something went wrong!";
//   if (err && typeof err.message === 'string') {
//     message = err.message;
//   }

//   res.status(status).render("error.ejs", { status, message });
// });


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})