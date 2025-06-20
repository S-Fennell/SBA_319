import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import Item from "./models/items.js";

const app = express();

const PORT = process.env.PORT;

app.use(express.json());


app.get('/', (req, res) =>{
    res.send(`Excuse me miss`);
});

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



app.listen(3000, ()=>{
    console.log(`listening on port: ${PORT}`)

});
await mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log(`Connected to database!`);
    app.listen(PORT, ()=>{
        console.log(`Server is rinning on port: ${PORT}`);
    });
}).catch(()=>{
    console.log(`Connection Failed!`);
});
