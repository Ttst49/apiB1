const {Router} = require ("express")
const router = Router()
const userController = require("../controllers/UserController")

router.post("/register",userController.register)

router.post("/login",userController.login)

router.get("/logout", userController.logout)

module.exports = router