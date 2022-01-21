
const express = require("express");
const myitem = require("./Itemschema.js")
const stockrouter = express.Router()

//insert update 
// empty stock ?itemid=1111 //debugged
stockrouter.get('/itemtoempty/',async (req,res)=>{
    console.log(req.query.itemid)  
    const informnostock = await myitem.findByIdAndUpdate(req.query.itemid,{$set:{"Stockavailable":0}})
    console.log(informnostock)    
    res.status(203).json(informnostock)
})

//insert item name  (debugged)
stockrouter.post('/item',async (req,res) =>{ 
const createditem = new myitem({
    Item:req.body.item,
    ITEMusage:req.body.usage,
    Stockavailable:req.body.stock
})
try{
    res.json(await myitem(createditem).save())
}
catch(err){console.log(err)}
})

// update item stock with detail (not debugged)
stockrouter.put('/item',async (req,res) =>{ 
    const toupdateitem = {
        Item:req.body.name,
        ITEMusage:req.body.usage,
        Stockavailable:req.body.stock
    }
    console.log(req.body)
    updateditem = await myitem.findByIdAndUpdate(req.body.itemid,{"$set":toupdateitem});
    console.log(updateditem);
    res.json(updateditem)
    })

//delete by remove item
stockrouter.delete('/item/:id',async (req,res)=>{
    const informnostock = await myitem.deleteOne({"_id":req.params.id})
        // console.log(informnostock)
        res.status(200).json(informnostock)
    })

//toshow one item on a list 
stockrouter.get('/item/:id',async (req,res)=>{
    const informnostock = await myitem.find({"id":req.params.id},{Stockavailable:1,ITEMusage:1,Item:1,_id:0})
        res.status(200).json(informnostock)
    })

    //
stockrouter.get('/item',async (req,res)=>{
    const informnostock = await myitem.find({})
        console.log(informnostock)
        res.status(200).json(informnostock)
    })
    
module.exports = stockrouter;