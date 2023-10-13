const express = require("express")
const app = express()
const port = 3000
const spiceRoutes = require("./routes/spices")
const userRoutes = require("./routes/users")
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser');
const session = require("express-session")
const mongoDBSession = require("connect-mongodb-session")(session)
const mongoDbUrl = "mongodb://localhost:27017/spiceTruck"
const userModal = require("./models/User")
const isAuth = (req,res, next)=>{
    if (req.session.isAuth){
        next()
    }else{
        res.send("Tu n'es pas connecté")
    }
}

mongoose
    .connect(mongoDbUrl,{
        useNewUrlParser: true,
//        useCreateIndex: true,
        useUnifiedTopology: true
    })

    .then(()=>{
        console.log("C'est tout bon pour la connexion")
    })
    .catch((err)=>{console.log(err)})

const store = new mongoDBSession({
    url:mongoDbUrl,
    collection: "mesSessions"
})


app.use(session({
    secret: "key that will sign cookie",
    resave: false,
    saveUninitialized: false,
    store: store
}))

app.use(express.json())
app.use('/api/spices', isAuth, spiceRoutes)
app.use("/api/user", userRoutes)
app.use(cookieParser())





app.get("/",(req, res)=>{
    req.session.isAuth = true
    console.log(req.session)
    res.send("Hello Sessions Tut")
})


app.listen(port,()=>{
    console.log("")
})
