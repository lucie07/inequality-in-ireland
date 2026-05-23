"use strict";

/*require modules*/
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");


var http = require('http');
var Cookies = require('cookies');

// Optionally define keys to sign cookie values
// to prevent client tampering
var keys = ['keyboard cat'];

/* Create our express app object */

var app = express();

/* Configure middlewares */
app.use(session({secret: "ttgfhrwgedgnl7qtcoqtcg2uyaugyuegeuagu",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: null},
        httpOnly: false
}
    )
);
app.use(express.static("assets"));

/* this is to detect if the user is new*/
var newUser;


app.all('*', function findLastVisit(req, res, next) {
    if (req.session.visited){
        req.lastVisit = req.session.visited;
         req.newUser=false;
        // app.get("/",function(req,res){
        //     res.send("Welcome again");
        // });
console.log(req.session.visited);
    console.log(req.newUser);}
    else {
    req.session.visited = Date.now();
    req.newUser=true;
        // app.get("/",function(req,res){
        //     res.send("Welcome New user");});
        console.log( req.session.visited);
        console.log(req.newUser);}
    next();
});



app.set("view-engine", "ejs");
app.set("views", "templates");
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    console.log(req.url);
    next();
});

/* This is the route for the static files*/
app.use("/assets", express.static('assets'));


app.get("/",function(req,res){
    if (req.newUser==true){
    res.redirect("/register.html");}
    else {
        if(req.session.purpose=="professional"){
            res.redirect("/exploration.html");
    }
    else if(req.session.purpose=="personal") {
            res.redirect("/generalStory.html");
        }

    }
});


app.post("/update", function(req,res){
    const request=req.body;
    let priorKnowledge=request.priorKnowledge;
    let purpose=request.purpose;
    let labour=request.labour;
    let demographic=request.demographic;
    let education=request.education;
    let health=request.health;
    let social=request.social;
    req.session.priorKnowledge=priorKnowledge;
    req.session.purpose=purpose;
    req.session.labour=labour;
    req.session.demographic=demographic;
    req.session.education=education;
    req.session.health=health;
    req.session.social=social;


    // console.log(priorKnowledge);
    console.log(req.session.purpose);
    // console.log(labour);
    // console.log(demographic);
    // console.log(education);
    // console.log(health);
    // console.log(social);

    if(priorKnowledge=="no"){
    res.redirect("/about.html");}
    else if(priorKnowledge=="yes"){
        if(purpose=="professional"){
            res.redirect("/exploration.html");
        }
        else if(purpose=="personal" || !purpose){
            res.redirect("/generalStory/generalStory.html");
        }
    }
});


// app.post("/storymap", function(req,res){
//     const request=req.body;
//     // var labourTake;
//     let labour=request.labour;
//     let demographic=request.demographic;
//     let education=request.education;
//     let health=request.health;
//     let social=request.social;
//
// <<<<<<< HEAD
//     req.session.priorKnowledge=priorKnowledge;
// console.log(req.session.priorKnowledge);
    // console.log(priorKnowledge);
    // console.log(purpose);
    // console.log(labour);
    // console.log(demographic);
    // console.log(education);
    // console.log(health);
    // console.log(social);

//     if(priorKnowledge=="yes"){
//     res.render("introduction.ejs",{display:"none"});}
//     else{res.render("introduction.ejs",{display:"block"})
//     }
// // =======
//     console.log(labour);
//     console.log(demographic);
//     console.log(education);
//     console.log(health);
//     console.log(social);
//     res.redirect("../storytelling_map/index.html");

    // if(labour){
    //     labourTake = true;
    //     exports.labourTake = labourTake;
    //     res.redirect("../storytelling_map/index.html");
    // }else{
    //     labourTake = false;
    //     exports.labourTake = labourTake;
    //     res.redirect("../storytelling_map/index.html");
    // }
    // console.log("this is the test of "+labourTake);
// >>>>>>> 8eadff07a196eabe3251d04398ca1a8f2b965b4f
// });
//
// app.get("/test", function(req,res){
//     console.log(req.session.priorKnowledge);
//     res.send(req.session.priorKnowledge);
//
// });

// app.get("/testCookie", function(req,res) {
// // res.redirect(/testCookie.html)
//     res.redirect("/update");
//  console.log(req.session.priorKnowledge);
//
// });

// app.get('/setcookie', function (req, res) {
//     res.cookie('Token', "exampletoken", {
//         maxAge: 1000 * 60 * 60 * 24 * 30 * 12 * 3000,
//         httpOnly: false
//     }).send('Success!');
// })



//this is temporary code
app.get("/logout", function(req,res) {

    req.session.destroy();
    res.redirect("/");
});

/* Start the server */
// var port=8081;
var port = 3000;
app.listen(port);
console.log("Sergitver running on http://localhost:"+port);