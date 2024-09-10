const express = require('express');
const port = 4000;
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const mongoURI = 'mongodb+srv://venukaransindusiriwardena:7eWAmTQGZ3FQaGHr@cluster0.vfii3.mongodb.net/ecommerce';

const connectToMongo = async () => {
    try {
        const connectToMongo = await mongoose.connect(mongoURI);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

connectToMongo();

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Express app is running");
});

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

app.use('/images', express.static('./upload/images'));

app.post('/upload', upload.single('product'), (req, res) => {
    if (req.file) {
        res.json({
            success: 1,
            image_url: `http://localhost:${port}/images/${req.file.filename}`
        });
    } else {
        res.status(400).json({
            success: 0,
            message: 'No file uploaded'
        });
    }
});

const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    new_price:{
        type:Number,
        required:true
    },
    old_price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    availability:{
        type:Boolean,
        required:true
    }
})

app.post('/addproduct', upload.single('image'), async (req, res) => {
    try {
        let products = await Product.find({});
        let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        // Construct the full URL for the image
        const imageUrl = req.file ? `http://localhost:4000/images/${req.file.filename}` : null;

        const product = new Product({
            id: id,
            name: req.body.name,
            image: imageUrl,  // Use the full URL
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
            availability: req.body.availability === 'true'
        });

        await product.save();
        console.log("Product Added Successfully");
        res.json({
            success: true,
            message: 'Product added successfully',
            name: req.body.name
        });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add product'
        });
    }
});

app.get('/products/men', async (req, res) => {
    try {
        const menProducts = await Product.find({ category: 'Men' });
        res.send(menProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

app.get('/products/women', async (req, res) => {
    try {
        const menProducts = await Product.find({ category: 'Women' });
        res.send(menProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

app.get('/products/kids', async (req, res) => {
    try {
        const menProducts = await Product.find({ category: 'Kids' });
        res.send(menProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed Successfully");
    res.json({
        success:true,
        name:req.body.name
    })
});

app.get('/allproducts',async (req,res)=>{
    let products = await Product.find({});
    res.send(products);
    console.log("All Products Retrieved Successfully");
});

app.get('/product/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id, 10);
        
        // Check if productId is a valid number
        if (isNaN(productId)) {
            return res.status(400).json({ success: false, message: 'Invalid product ID' });
        }

        const product = await Product.findOne({ id: productId });

        // Handle case where no product is found
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.send(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

const User = mongoose.model("User",{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object
    },
    date:{
        type:Date,
        default:Date.now
    }
});

app.post('/signup',async (req,res)=>{
    let check = await User.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"User Already Exists"});
    }
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i]=0;
        }
        const user = new User({
            name:req.body.username,
            email:req.body.email,
            password:req.body.password,
            cartData:cart
        });
        await user.save();

        const data= {
            user:{
                id:user.id
            }
        }

        const token = jwt.sign(data, 'secret_ecom');
        res.json({success:true,token})

});

app.post('/login',async (req,res)=>{
    let user = await User.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data= {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success:true,token});
        }else{
            return res.status(400).json({success:false,errors:"Wrong Password"});
        }
    }else{
        return res.status(400).json({success:false,errors:"Email Not Found"});
    }
});

// server.js

// Fetch cart items for a user
app.get('/user/cart', async (req, res) => {
    // Assuming user ID is stored in JWT token or session
    // Fetch user cart data from database
    const userId = req.user.id; // Extract from JWT or session
    try {
        const user = await User.findById(userId);
        res.json(user.cartData);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Update cart item quantity
app.post('/cart/update', async (req, res) => {
    const { itemId, quantity } = req.body;
    const userId = req.user.id; // Extract from JWT or session
    try {
        const user = await User.findById(userId);
        if (user) {
            user.cartData[itemId] = quantity;
            await user.save();
            res.json({ success: true });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Remove item from cart
app.post('/cart/remove', async (req, res) => {
    const { itemId } = req.body;
    const userId = req.user.id; // Extract from JWT or session
    try {
        const user = await User.findById(userId);
        if (user) {
            delete user.cartData[itemId];
            await user.save();
            res.json({ success: true });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.listen(port,(error)=>{
    if(error){
        console.log(error);
    }else{
        console.log(`Server is running at port ${port}`);
    }
});