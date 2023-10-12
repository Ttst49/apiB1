const express = require("express")
const app = express()
const port = 3000
const spiceRoutes = require("./routes/spices")
const mongoose = require("mongoose")


mongoose
    .connect("mongodb://localhost:27017/spiceTruck")
    .then(()=>{
        console.log("C'est tout bon pour la connexion")
    })
    .catch((err)=>{console.log(err)})


app.use(express.json())
app.use('/api/spices', spiceRoutes)


app.listen(port,()=>{
    console.log("")
})
