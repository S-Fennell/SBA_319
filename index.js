import express, { Router } from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import Item from "./models/items.js";
import User from "./models/users.js";
import Review from "./models/reviews.js";

const app = express();

const PORT = process.env.PORT;

app.use(express.json());


app.get('/', (req, res) =>{
    res.send(`Excuse me miss`);
});
//=============items=================
//C# Now I want to creat code that will let me see the added items like I can see them in my database
//this is for viewing listings
app.get('/items', async(req,res)=>{
    try{
        const item = await Item.find({});//this will find everything in the database
        res.status(200).json(item)// if successful we will send this response with the item information. when the item are found it will stored in the item variable. The empty bracet indicates all/everything in the database and turning it to json form
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

//D# as a follow up to part C# I want to get just one item instead of all the products and get it by id.
app.get('/items/:id', async(req, res)=>{
    try{
        const{id} = req.params;
        const item = await Item.findById(id);
        res.status(200).json({item});

    }catch (error){
        res.status(500).json({message: error.message});
    }
});



//A# We are going to start here after creating our item model schema/blue print
app.post('/items', async(req, res)=>{//B# we added an async to add the item create
    try{//B# now we want to add multiple things and save the data in our blue print model through here. We'll use try and catch to do this to catch any errors that do not match our schema
        const item = await Item.create(req.body)//B# saving out item with this "item.create". the eq.body hold the added product or  new user if it was a user instead of a product. this is the request inside the body being sent
        res.status(200).json(item)// the status will say if the addition was a success. json will be the item. with post products are added to my mongodb database with it's own id number.
    }catch(error){
        res.status(500).json({message: error.message});//This message will show in the browser
    }
    // console.log(req.body)//A# 1# When making a req from Thunder Client, the request is undefined.I need to convert to json in order to define it and get the data by using middleware which will be in line 6 and 7. but this not change what we get in the browser. 
    // res.send(req.body);
})

app.put('/items/:id', async(req, res)=>{// here were still using th id path to update item using it's ID so we need to use the path to the ID.
    try{
        const {id} =req.params;
        const item = await Item.findByIdAndUpdate(id, req.body)// the req.body is the information the user gave to update that comes from the req parameter of the function.
        
        if(!item){// this check if item exist before updating. If item to update does not exist we will send an error message.
            return res.status(404).json({message: "Item not found"});
        }else{
            const updatedItem = await Item.findById(id);// this is the updated item stored in the variable "updatedItem"
            res.status(200).json(updatedItem);
        }  
    }
catch(error){
    res.status(500).json({message: error.message});
}
});

app.delete('/items/:id', async(req, rea) =>{
    try{
        const {id} = req.params;
        const item = await Item.findByIdAndDelete(id);
        if(!item){
            return res.status(404).json({message: `Item Not Found!`});
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
});
//==============.  users. ==========================================
app.get('/users', async(req,res)=>{
    try{
        const user = await User.find({});
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

app.get('/users/:id', async(req, res)=>{
    try{
        const{id} = req.params;
        const user = await User.findById(id);
        res.status(200).json({user});

    }catch (error){
        res.status(500).json({message: error.message});
    }
});



app.post('/users', async(req, res)=>{
    try{
        const user = await User.create(req.body)
        res.status(200).json(user)
    }catch(error){
        res.status(500).json({message: error.message});
    }

})

app.put('/users/:id', async(req, res)=>{
    try{
        const {id} =req.params;
        const user = await User.findByIdAndUpdate(id, req.body)
        
        if(!user){
            return res.status(404).json({message: "User not found"});
        }else{
            const updatedItem = await User.findById(id);
            res.status(200).json(updatedItem);
        }  
    }
catch(error){
    res.status(500).json({message: error.message});
}
});

app.delete('/users/:id', async(req, rea) =>{
    try{
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message: `User ${id} Not Found!`});
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
});
//====== reviews ===============
app.get('/reviews', async(req,res)=>{
    try{
        const review = await Review.find({});
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

app.get('/reviews/:id', async(req, res)=>{
    try{
        const{id} = req.params;
        const review = await Review.findById(id);
        res.status(200).json({review});

    }catch (error){
        res.status(500).json({message: error.message});
    }
});



app.post('/reviews', async(req, res)=>{
    try{
        console.log("review")
        const review = await Review.create(req.body)
        res.status(200).json(review)
    }catch(error){
        res.status(500).json({message: error.message});
    }
})



app.put('/reviews/:id', async(req, res)=>{
    try{
        const {id} =req.params;
        const review = await Review.findByIdAndUpdate(id, req.body)
        
        if(!review){
            return res.status(404).json({message: "Review not found"});
        }else{
            const updatedItem = await User.findById(id);
            res.status(200).json(updatedItem);
        }  
    }
catch(error){
    res.status(500).json({message: error.message});
}
});

app.delete('/reviews/:id', async(req, rea) =>{
    try{
        const {id} = req.params;
        const review = await Review.findByIdAndDelete(id);
        if(!review){
            return res.status(404).json({message: `Review id Not Found!`});
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
});



app.listen(3000, ()=>{
    console.log(`listening on port: ${PORT}`)

});
await mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log(`Connected to database!`);
    app.listen(PORT, ()=>{
        console.log(`Server is running on port: ${PORT}`);
    });
}).catch(()=>{
    console.log(`Connection Failed!`);
});
