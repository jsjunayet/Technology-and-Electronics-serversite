const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middlewire
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.l4anbhy.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
const usercollection = client.db('ProductDB').collection('Product')
    const firbaseCOllection = client.db('firbaseDB').collection('firebase')
    app.post('/',async(req,res)=>{
        const Myproduct = req.body;
        const result = await usercollection.insertOne(Myproduct)
        res.send(result)
    })
    app.post('/user',async(req,res)=>{
      const firebase = req.body;
      console.log(firebase)
      const result = await firbaseCOllection.insertOne(firebase)
      res.send(result)
    })
    app.get('/user',async(req,res)=>{
      const curse = firbaseCOllection.find();
      const result = await curse.toArray();
      res.send(result)
    })

    // app.get('/card',async(req,res)=>{
    //   const curse = usercollection.find();
    //   const result = await curse.toArray();
    //   res.send(result);
      
    // })
    app.get('/card/:brand',async(req,res)=>{
      const brand = req.params.brand
      const query = {brand :brand}
      const curse = usercollection.find(query)
      const result = await curse.toArray()
      res.send(result)
    })
    // app.get('/users',async(req,res)=>{
    //   const curse = firbaseCOllection.find();
    //   const result = await curse.toArray();
    //   res.send(result)
    // })

    // app.delete('/card/:id',async(req,res)=>{
    //   const id = req.params.id
    //   const query = {_id : new ObjectId(id)}
    //   const result = await usercollection.deleteOne(query)
    //   res.send(result)
    // })
    // app.delete('/users/:id',async(req,res)=>{
    //   const id = req.params.id;
    //   const query = {_id : new ObjectId(id)}
    //   const result = await firbaseCOllection.deleteOne(query)
    //   res.send(result)
    // })


    app.get('/update/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id :new ObjectId(id)}
      const result = await usercollection.findOne(query)
      res.send(result)
    })
    app.get('/detail/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id :new ObjectId(id)}
      const result = await usercollection.findOne(query)
      res.send(result)
    })
    app.put('/update/:id',async(req,res)=>{
      const {id} = req.params ;
      console.log(id)
      const mainupdate = req.body;
      const filter = {_id:new ObjectId(id)}
      const options = { upsert: true };
      const update = {
        $set:{
          img:mainupdate.img,
           name:mainupdate.name,
           brand:mainupdate.brand,
           type:mainupdate.type,
           price:mainupdate.price,
           description:mainupdate.description,
           rating:mainupdate.rating,
        }
      }
      const result = await usercollection.updateOne(filter,update,options)
      res.send(result)


    })



app.get('/',(req,res)=>{
    res.send('hello world')
})
app.listen(port,()=>{
    console.log(`coffee port is ${port}`)
})
