const {Router} = require ("express")
const router = Router()
const spiceController = require("../controllers/SpiceController")




router.post('/add', spiceController.createSpice)


router.delete('/remove/:name', spiceController.removeSpice)

router.get("/show/:name",spiceController.showSpice)

router.put("/edit/:name",spiceController.editSpice)

router.get("/index",spiceController.index)


module.exports = router