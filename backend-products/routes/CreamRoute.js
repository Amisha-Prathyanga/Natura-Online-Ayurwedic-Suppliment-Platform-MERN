const router = require("express").Router();
const Cream = require("../models/Cream");

//Add new cream
router.route("/addCream").post(async(req, res) => {
    //Desctucture the request body and get cream details
    const {name, description, price, quantity, type, mfd, exp, weight} = req.body;
    try{
        //Create a cream details object and initilize above variables
        let cream = new Cream({name, description, price, quantity, type, mfd, exp, weight});
        const result = await cream.save();
        if(result)
            res.status(200).send("Data added successfully !");
        else
            res.status(500).send("Server Error !");
    }
    catch(error){
        console.log(error);
        res.status(500).send("Server Error !");
    }
});

//Get all creams
router.route('/get').get((req, res) =>{
    Cream.find().then((creams)=>{
        res.status(200).json(creams);
    }).catch((err)=>{
        console.log(err);
    })
});

//Get one cream
router.route('/getOne/:id').get((req, res) => {
    const id = req.params.id;
    console.log(id);
    Cream.findById(id).then((cream) => {
        res.status(200).json(cream);
    }).catch((err) => {
        console.log(err);
    })
})

//Update cream
router.route("/updateCream/:id").put(async (req, res) => {
    const id = req.params.id;
    const {name, description, price, quantity, type, mfd, exp, weight} = req.body;
    let updatedCream = {name, description, price, quantity, type, mfd, exp, weight};
    await Cream.findByIdAndUpdate(id, updatedCream) 
    .then(() => {
        res.status(200).send("Cream Updated");
    }).catch((err) => {
        console.log(err);
        res.send(500).send("Update Failed")
    })
})

//Delete cream
router.route("/deleteCream/:id").delete(async (req, res) => {
    const id = req.params.id;
    await Cream.findByIdAndDelete(id)
    .then(() => {
        res.status(200).send("Cream Deleted");
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Delete Failed")
    })
})

//Serach Cream


module.exports = router;