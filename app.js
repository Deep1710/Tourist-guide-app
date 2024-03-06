const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./db/conn");
const Register = require("./models/register");
const exp = require("constants");

const port = process.env.PORT || 3000;

const staticpath = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "../templates/views");
const partialspath = path.join(__dirname, "../templates/partials");
app.use(express.static(staticpath));
//app.use(express.static('public'));
//app.use('/image', express.static('image'));
console.log(templatepath);

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine', "hbs");
app.set('views', templatepath);
hbs.registerPartials(partialspath);

app.get("/", (req, res)=>{
    res.render('index');
});

app.get("/registration", (req, res)=>{
    res.render('registration');
});

app.get("/mainpage", (req, res)=>{
    res.render('mainpage');
});

app.get("/quiz", (req, res)=>{
    res.render('quiz');
});

app.get("/state", (req, res)=>{
    res.render('state');
});

app.get("/about", (req, res)=>{
    res.render('about');
});

app.get("/identity", (req, res)=>{
    res.render('identity');
});

app.post("/registration", async (req, res)=>{
    try{ 
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){
            const registerTourist = new Register({
                fname : req.body.fname ,
                email : req.body.email ,
                password : req.body.password ,
                confirmpassword : req.body.confirmpassword
            })

            const registered = await registerTourist.save();
            res.status(201).render("index");

        }else{
            res.send("Password are not matching.");
        }


       // console.log(req.body.fname);
        //res.send(req.body.fname);

    } catch (error) {
        res.status(400).send(error);
    }
});


app.get("/", (req, res)=>{
    res.send("hello from the mern express. ");
});

app.listen(port, ()=>{
    console.log(`Server is running at port no ${port}`);
});