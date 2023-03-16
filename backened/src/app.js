const express =require("express");
require('dotenv').config()
var cors = require('cors')
require("./db/conn")
const Match = require("./modules/match");
const app=express()
const port = process.env.PORT || 2000;
app.use(cors())
app.use(express.json())
app.post("/match",(req,res)=>{
    console.log(req.body)
    const user = new Match(req.body);
    user.save().then(()=>{
        res.status(201).send(user);
    }).catch((e)=>{
        console.log(e)
        res.status(400).send(e)
    })
})
app.get("/match",async(req,res)=>{
    try{let queryFinal=req.query.category
        let queryFinal2=`#${req.query.colorFinal}`

        // const matchData=await Match.find({ $or:[{input:queryFinal },{ output:queryFinal }]});
        const matchData=await Match.find({ $and: [ {  $or:[{input:queryFinal },{ output:queryFinal }] }, { $or:[{inputCode:queryFinal2 },{ outputCode:queryFinal2 }] } ] })
        res.send(matchData);
        
    }catch(e){
        res.send(e)
        console.log(e,"error in get of /match")
    }
})
app.get("/color",async(req,res)=>{
    try{
        let queryValue=req.query.input
        console.log(queryValue)
        const colorData=await Match.find({ $or: [ { input:queryValue }, { output:queryValue } ] })
        // console.log({queryValue,colorData})
        let colorOutput=colorData.map((data)=>{
           return queryValue==data.input?{colorName:data.inputColor,colorCode:data.inputCode}:{colorName:data.outputColor,colorCode:data.outputCode}
        })
        // .distinct('inputColor');
        let result=[];
        colorOutput.forEach((elt)=>{
            let exist=result.find(a=>a.colorCode==elt.colorCode)
            if(!exist)result.push(elt)
            
            // console.log(result);
        })
        res.send(result);
        // console.log(query);
    }catch(e){
        res.send(e)
        console.log(e,"error in get of /color")
    }
})


app.listen(port,()=>{
    console.log(`connection is at ${port}`)
})