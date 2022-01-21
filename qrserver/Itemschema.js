const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Item = mongoose.Schema({
    Item:String,
    ITEMusage:String,
    Stockavailable:Number
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  });

const myitem = mongoose.model("Stockitem",Item)

const server = '127.0.0.1:27017';
const database =  'Stockitem';


mongoose.connect(`mongodb://${server}/${database}`, { useNewUrlParser: true});

// const createditemlist = [{
//     Item:"Pen",
//     ITEMusage:"String",
//     Stockavailable:15
// },
// {
//     Item:"Clip",
//     ITEMusage:"To clip paper",
//     Stockavailable:2
// },
// {
//     Item:"Plasticbag",
//     ITEMusage:"To cover dust",
//     Stockavailable:15
// }
// ]

// const Tocreateitem = async () =>{
//     try{
//         servercb =await myitem.insertMany(createditemlist)
//         console.log(servercb);
//     }
//     catch(err){
//         console.log(err);
//     }
// }

module.exports = myitem;
