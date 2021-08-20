var express = require('express');
var router = express.Router();

const ownerModel=require('../models/Owner').ownerModel;
const productModel = require('../models/Product').productModel;
const orderModel = require('../models/Order').orderModel;

//add account
router.post('/add',async (req,res)=>{

    try {
        // Get user input
        const { name,email } = req.body;

        // Validate user input
        if (!(name && email)) {
          res.status(400).send("Both name and email is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await ownerModel.findOne({ email });

        if (oldUser) {
          return res.status(409).send("User Already Exist");
        }

        //create new owner in database
        const owner= await ownerModel.create({name, email});

        //return the owner details
        res.status(201).json(owner);


    }
    catch(e){
        console.log(e);
        res.status(400).send("Something went wrong");
    }

})


//owner/add-product
router.post('/add-product',async (req, res) => {
    // add product to database ; expected inputs are as defined in productschema {name,cost,category,owner:owner_id}
    try{

       // Get user input
       const { name,cost,category,owner } = req.body;

       // Validate user input
       if (!(name && cost && category && owner)) {
          res.status(400).send("All fields are required");
       }

       //create new productschema
       const product=await productModel.create(req.body);


       //return the created product whose owner field is populated with owner information
       const newProduct=await product.populate('owner').execPopulate();
       //return the product details
       res.status(201).json(newProduct);


    }
    catch(err){
      console.log(err);
      res.status(400).send("Something went wrong");
    }
})

//owner/view-orders 

router.get('/view-orders', async (req, res)=>{

  try{

    //find all orders and populate fields with product and customer data
    const orders= await orderModel.find({}).populate('orderedby').populate('product').exec();

    if(orders.length === 0){
      return res.status(200).json({"message":"No Orders Found"});
    }

    return res.status(200).json(orders);

  }catch(err){
    console.log(err);
    res.status(400).send("Something went wrong");
  }

})

module.exports = router; 