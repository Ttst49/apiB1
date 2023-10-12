const Spice = require("../models/Spice");

const index = async function index(req,res){
    let spices = await Spice.find()
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Les épices n'ont pas été trouvées, OUPS"});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Erreur pendant la récupération des épices"});
        });
}

const createSpice = async function create(req, res){

    let { ...spiceParams} = req.body

    let newSpice = await Spice.create({...spiceParams})
        res.send(newSpice)
}

const showSpice = async function show(req, res){
    let { name} = req.params
    let spice = await Spice.find({name: name})

        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Pizza with name " + name });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Pizza with name=" + name });
        });

}

const editSpice = async function edit(req,res){

    const { price,name,description } = req.body
    let thisSpice = await Spice.findOneAndUpdate({name: name,price: price, description: description})
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Pizza with name " + name });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Pizza with name=" + name });
        });

}

const removeSpice = async function remove(req,res){

    const { name } = req.params
    let thisSpice = await Spice.deleteOne({name: name})
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Pizza with name " + name });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Pizza with name=" + name });
        });

}

module.exports = { createSpice, removeSpice, showSpice, editSpice, index }
