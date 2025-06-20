import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import Inventory from "./models/inventory.js";

const app = express();

const PORT = process.env.PORT;

app.use(express.json());


app.get('/', (req, res) =>{
    res.send(`Excuse me miss`);
});




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
