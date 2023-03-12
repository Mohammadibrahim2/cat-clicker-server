const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 5000;


const { MongoClient, ServerApiVersion } = require('mongodb');


const uri = "mongodb+srv://MERN-project:dqTl5HX0EDftCacN@cluster0.6b4e0gi.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri,(err)=>{
    if(!err){
        console.log("db connected successfully")
    }
    console.log(err)
}, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{

      
        const alldataCollection=client.db("allCatCollection").collection("allCatInfo")


        app.get("/alldata",async(req,res)=>{
            console.log("alldata")
            const query={}
            const result=await alldataCollection.find(query).toArray()
            const count=await alldataCollection.estimatedDocumentCount()
            res.send(result)
        })

        app.get("/category/:name",async(req,res)=>{
              const name=req.params.name
            const query={name:name}
          

           
            const result=await alldataCollection.find(query).toArray()
           
            res.send(result)
        })

        
        app.put("/addcat",async(req,res)=>{
            const name=req.body.name
            console.log(name)
            const filter = { name: name };
            const options = { upsert: true };
            const updateCat = {
                $set: {
                    name:req.body.age,
                    age:req.body.age,
                    ageCategory:req.body.ageCategory,
                    img:req.body.img

                }
            }
            const result = await alldataCollection.updateOne(filter, updateCat, options);
        

         
       
         
          res.send(result)
      })


    }
    finally{

    }
 }
 run().catch(console.dir)


app.listen(port, () => {
    console.log("hi server ", port)
})

//mernstorage
//4WgxJmjcPPefPfvp

//MERN-project
//dqTl5HX0EDftCacN