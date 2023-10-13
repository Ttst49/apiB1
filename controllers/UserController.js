const User = require('../models/User')
const bcrypt = require("bcryptjs")


const register = async function register(req,res){

    let { ...userParams } = req.body

    let hashedPassword = await bcrypt.hash(userParams.password, 12)

    let user = await User.findOne({email: userParams.email})
    if (!user){
        let newUser = await User.create({
            username: userParams.username,
            email: userParams.email,
            password: hashedPassword
        })
        res.send(newUser)

    }else {
        res.sendStatus(400).send("cet email est deja utilisé")
    }

}


const login = async function login(req,res){

    if (req.session.isAuth){
        res.send("Tu es déjà connecté")
    }

    let { ...userParams } = req.body

    let user = await User.findOne({ email: userParams.email })

    if (!user){
        res.sendStatus(404).send("Cet utilisateur n'a pas été trouvé")
    }

    const match = await bcrypt.compare(userParams.password, user.password)

    if (!match){
        res.sendStatus(200).send("Mot de passe incorrect")
    }

    req.session.isAuth = true
    res.send("c'est tout bon tu es connecté " + user.username)

}


const logout = async function logout(req,res){

    if (req.session.isAuth){
        req.session.destroy()
        res.send("Déconnecté")
    }else {
        res.send("tu n'es pas connecté")
    }


}


module.exports = { register, login, logout }